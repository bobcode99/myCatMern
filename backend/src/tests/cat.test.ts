import {
    afterAll,
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
    beforeEach,
} from "vitest";
import {
    startedMongoTestContainerOf,
    StartedMongoTestContainer,
} from "testcontainers-mongoose";
import { serverOf, serverStart } from "../server";
import { AppConfig } from "../types/appConfig";
import { createFakeCats, fakeCatsGenByFaker } from "../scripts/insertFakeCat";
import { TCat } from "../types/catTypes";
describe("mongo test container test", () => {
    const fakeCats = fakeCatsGenByFaker;
    let mongoTestContainer: StartedMongoTestContainer;
    const server = serverOf();
    beforeAll(async () => {
        mongoTestContainer = await startedMongoTestContainerOf("mongo");

        const appConfigForTest: AppConfig = {
            FASTIFY_HOST: "localhost",
            FASTIFY_PORT: 8889,
            MONGO_CONNECTION_STRING: mongoTestContainer.getUri(),
        };

        await serverStart(server)(appConfigForTest);
    });

    beforeEach(async () => {
        await createFakeCats(fakeCats);
    });

    afterAll(async () => {
        await mongoTestContainer.closeDatabase();
    });

    afterEach(async () => {
        await mongoTestContainer.clearDatabase();
    });

    it("Should be 200 status code by ping", async () => {
        const response = await server.inject({
            method: "GET",
            url: "ping",
        });
        expect(response.statusCode).toBe(200);
    });

    it("Should get all cats", async () => {
        const response = await server.inject({
            method: "GET",
            url: "/api/cats",
        });

        const responseBody: { cats: Array<TCat> } = JSON.parse(response.body);
        const catArr = responseBody["cats"];
        console.log("catArr:", catArr);

        expect(catArr).toHaveLength(10);
    });
});
