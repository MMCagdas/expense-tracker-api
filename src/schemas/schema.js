import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email({ message: "Email must be valid!" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 character!" })
        .max(20, { message: "Password cannot be longer than 20 characters!" })
});

export const expenseSchema = z.object({
    amount: z.number().positive(),
    category: z.enum([
        "GROCERIES",
        "LEISURE",
        "ELECTRONICS",
        "UTILITIES",
        "CLOTHING",
        "HEALTH",
        "OTHERS"
    ]),
    date: z.coerce.date(),
    note: z.string().optional()
});

export const updateExpenseSchema = expenseSchema.partial();