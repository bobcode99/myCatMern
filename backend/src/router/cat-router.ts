import { FastifyInstance, RouteShorthandOptions } from "fastify";
import * as repo from "./../repo/cat";

export const CatRouter = (
    server: FastifyInstance,
    opts: RouteShorthandOptions,
    done: (error?: Error) => void
) => {
    server.get("/cats", async (request, reply) => {
        try {
            const cats = await repo.getCats();
            // console.log("cats: ", cats);
            return reply.status(200).send({ cats });
        } catch (e) {
            server.log.error(`GET /cats Error: ${e}`);
            return reply.status(500).send(`[Server Error]: ${e}`);
        }
    });

    done();
};
