import prisma from "../plugins/prisma.js";

export async function getExpensesService(userId, dateData) {
    const { range, customStart, customEnd } = dateData;

    console.info(`[EXPENSE][SERVICE][GET]: CHECKING START AND END DATE!`);
    let startDate;
    let endDate = new Date();

    if (range === "past_week") {
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
    } else if (range === "last_month") {
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 1);
    } else if (range === "last_3_months") {
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 3);
    } else if (customStart && customEnd) {
        startDate = new Date(customStart);
        endDate = new Date(customEnd);
    } else {
        startDate = new Date(0);
    }
    console.info(`[EXPENSE][SERVICE][GET]: START AND END DATE ARRANGED!`);

    console.info(`[EXPENSE][SERVICE][GET]: GETTING DATA BETWEEN DATES!`);
    const expenses = await prisma.expense.findMany({
        where: {
            userid: userId,
            date: {
                gte: startDate,
                lte: endDate
            }
        },
        orderBy: {
            date: "desc"
        }
    });
    console.info(`[EXPENSE][SERVICE][GET]: DATA BETWEEN DATES ARE TAKEN!`);

    return expenses;
}

export async function addExpensesService(userId, expenseData) {
    console.info(`[EXPENSE][SERVICE][POST]: DATA WILL BE CREATED!`);
    const newExpense = await prisma.expense.create({
        data: {
            amount: expenseData.amount,
            category: expenseData.category,
            date: expenseData.date,
            note: expenseData.note || null,
            userid: userId
        }
    });
    console.info(`[EXPENSE][SERVICE][POST]: DATA CREATED!`);
    return newExpense;
}

export async function updateExpensesService(userId, expenseId, updateData) {
    console.info(`[EXPENSE][SERVICE][PUT]: CHECKING IF EXPENSE EXISTS!`);
    const expense = await prisma.expense.findUnique({
        where: {
            id: parseInt(expenseId),
            userid: userId
        }
    });

    if (!expense) { throw new Error("Expense Not Found!"); }
    console.info(`[EXPENSE][SERVICE][PUT]: EXPENSE FOUND!`);

    console.info(`[EXPENSE][SERVICE][PUT]: EXPENSE WILL BE UPDATED!`);
    const updatedExpense = await prisma.expense.update({
        where: {
            id: parseInt(expenseId),
            userid: userId
        },
        data: {
            ...(updateData.amount !== undefined && { amount: updateData.amount }),
            ...(updateData.category !== undefined && { category: updateData.category }),
            ...(updateData.date !== undefined && { date: updateData.date }),
            ...(updateData.note !== undefined && { note: updateData.note })
        }

    });
    console.info(`[EXPENSE][SERVICE][PUT]: EXPENSE UPDATED!`);

    return updatedExpense;
}

export async function deleteExpensesService(userId, expenseId) {
    console.info(`[EXPENSE][SERVICE][DELETE]: CHECKING IF EXPENSE EXISTS!`);
    const expense = await prisma.expense.findUnique({
        where: {
            id: parseInt(expenseId),
            userid: userId
        }
    });

    if (!expense) { throw new Error("Expense Not Found!"); }
    console.info(`[EXPENSE][SERVICE][DELETE]: EXPENSE FOUND!`);

    console.info(`[EXPENSE][SERVICE][DELETE]: EXPENSE WILL BE DELETED!`);
    await prisma.expense.delete({
        where: {
            id: parseInt(expenseId),
            userid: userId
        },
    });
    console.info(`[EXPENSE][SERVICE][DELETE]: EXPENSE DELETED!`);
}