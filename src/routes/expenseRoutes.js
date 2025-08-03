import { addExpenses, deleteExpenses, getExpenses, updateExpenses } from "../controllers/expenseController.js";


export default async function (fastify, options) {
    fastify.get("/expenses", { preHandler: [fastify.authenticate] }, getExpenses);
    fastify.post("/expenses", { preHandler: [fastify.authenticate] }, addExpenses);
    fastify.put("/expenses/:id", { preHandler: [fastify.authenticate] }, updateExpenses);
    fastify.delete("/expenses/:id", { preHandler: [fastify.authenticate] }, deleteExpenses);
}