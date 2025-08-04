import Fastify, { fastify } from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import authRoutes from "./routes/authRoutes.js";
import authPlugin from "./plugins/auth.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import path from "path";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";

dotenv.config();

const app = Fastify({ logger: { level: "warn" } });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await app.register(fastifyStatic, {
    root: path.join(__dirname, "..", "public"),
    prefix: "/"
});

await app.register(cors, {
    origin: "*"
});
await app.register(jwt, {
    secret: process.env.JWT_SECRET
});
await app.register(authPlugin);
await app.register(authRoutes);
await app.register(expenseRoutes);

export default app;