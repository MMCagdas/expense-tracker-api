import fp from "fastify-plugin";

export default fp(
    async function (fastify, options) {
        fastify.decorate("authenticate", async (request, reply) => {
            try {
                await request.jwtVerify();
            } catch (err) {
                reply.code(401).send({ error: "Unauthorized!" });
            }
        });
    }
);