import { register, login } from "../controllers/authControllers.js";

export default async function (fastify, options) {
    fastify.post("/register", register);
    fastify.post("/login", login);
}