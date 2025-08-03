import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import authRoutes from "./routes/authRoutes.js";
import authPlugin from "./plugins/auth.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = Fastify({ logger: { level: "warn" } });

await app.register(cors);
await app.register(jwt, {
    secret: process.env.JWT_SECRET
});
await app.register(authPlugin);
await app.register(authRoutes);
await app.register(expenseRoutes);

export default app;