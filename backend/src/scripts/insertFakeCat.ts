import { CatModel } from "../models/cat";
import { TCat } from "../types/catTypes";
import { faker } from "@faker-js/faker";
import { closeMongoose, establishConnection } from "../plugins/mongodb";
import { env } from "../config";
import { AppConfig } from "../types/appConfig";
import * as repo from "./../repo/cat";

const appConfig: AppConfig = {
    FASTIFY_PORT: env.FASTIFY_PORT,
    FASTIFY_HOST: env.FASTIFY_HOST,
    MONGO_CONNECTION_STRING: env.MONGO_CONNECTION_STRING,
};

export const fakeCatsGenByFaker: Array<TCat> = Array.from(
    { length: 10 },
    () => ({
        name: faker.animal.cat(),
        weight: faker.number.int(100),
    })
);

export const createFakeCats = async (cats: Array<TCat>) => {
    const catPromises = cats.map(async (cat) => {
        console.log("create cat: ", cat);
        return repo.addCats(cat);
    });
    return await Promise.all(catPromises);
};

// export const insertFakeData = async () => {
//     try {
//         await establishConnection(appConfig.MONGO_CONNECTION_STRING);
//         await createFakeCats(fakeCatsGenByFaker);
//     } catch (error) {
//         throw new Error(`${error}`);
//     }
// };

// insertFakeData().then(() => {
//     console.log("done");
//     closeMongoose();
// });
