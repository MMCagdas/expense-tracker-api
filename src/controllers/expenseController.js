import { expenseSchema, updateExpenseSchema } from "../schemas/schema.js";
import { addExpensesService, deleteExpensesService, getExpensesService, updateExpensesService } from "../services/expenseService.js";

export async function getExpenses(request, reply) {
    try {
        const userId = request.user.id;

        const { range, customStart, customEnd } = request.query;
        const tempData = {
            range,
            customStart,
            customEnd
        }
        console.info(`[EXPENSES][CONTROLLER][GET]: SENDING DATA TO SERVICE!`);
        const expenses = await getExpensesService(userId, tempData);
        console.info(`[EXPENSES][CONTROLLER][GET]: DATA ARRIVED FROM SERVICE!`);
        reply.code(200).send(expenses);
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
}

export async function addExpenses(request, reply) {
    try {
        console.info(`[EXPENSE][CONTROLLER][POST]: DATA VALIDATION!`);
        expenseSchema.parse(request.body);
        console.info(`[EXPENSE][CONTROLLER][POST]: DATA VALIDATED!`);
        const { amount, category, date, note } = request.body;
        const tempData = {
            amount,
            category,
            date,
            note
        }
        const userId = request.user.id;
        console.info(`[EXPENSE][CONTROLLER][POST]: SENDING DATA TO SERVICE!`);
        const data = await addExpensesService(userId, tempData);
        console.info(`[EXPENSE][CONTROLLER][POST]: DATA ARRIVED FROM SERVICE!`);
        reply.code(201).send(data);
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
}

export async function updateExpenses(request, reply) {
    try {
        console.info(`[EXPENSE][CONTROLLER][PUT]: DATA VALIDATION!`);
        updateExpenseSchema.parse(request.body);
        console.info(`[EXPENSE][CONTROLLER][PUT]: DATA VALIDATED!`);

        const { id } = request.params;
        const userId = request.user.id;

        const { amount, category, date, note } = request.body;
        const tempData = {};
        if (amount !== undefined) tempData.amount = amount;
        if (category !== undefined) tempData.category = category;
        if (date !== undefined) tempData.date = date;
        if (note !== undefined) tempData.note = note;

        console.info(`[EXPENSE][CONTROLLER][PUT]: SENDING DATA TO SERVICE!`);
        const data = await updateExpensesService(userId, id, tempData);
        console.info(`[EXPENSE][CONTROLLER][PUT]: DATA ARRIVED FROM SERVICE!`);

        reply.code(200).send(data);

    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
}

export async function deleteExpenses(request, reply) {
    try {
        const { id } = request.params;
        const userId = request.user.id;

        console.info(`[EXPENSE][CONTROLLER][DELETE]: SENDING DATA TO SERVICE!`);
        await deleteExpensesService(userId, id);
        console.info(`[EXPENSE][CONTROLLER][DELETE]: DATA DELETED SUCCESSFULLY!`);

        reply.code(204).send();
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
}