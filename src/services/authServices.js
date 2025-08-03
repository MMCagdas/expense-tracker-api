import bcrypt from "bcrypt";
import { authSchema } from "../schemas/schema.js";
import prisma from "../plugins/prisma.js";

export async function registerService(email, password) {
    console.info(`[AUTH][SERVICE][REGISTER]: DATA VALIDATION!`);
    authSchema.parse({ email, password });
    console.info(`[AUTH][SERVICE][REGISTER]: DATA VALIDATED!`);


    const isUserExist = await prisma.user.findUnique({ where: { email } });
    if (isUserExist) { throw new Error("Email already exist!"); }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.info(`[AUTH][SERVICE][REGISTER]: NEW USER GETTING CREATED!`);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });
    console.info(`[AUTH][SERVICE][REGISTER]: NEW USER CREATED!`);

    return {
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt
    };
}

export async function loginService(email, password) {
    console.info(`[AUTH][SERVICE][LOGIN]: DATA VALIDATION!`);
    authSchema.parse({ email, password });
    console.info(`[AUTH][SERVICE][LOGIN]: DATA VALIDATED!`);

    console.info(`[AUTH][SERVICE][LOGIN]: CHECKING IF EMAIL EXIST!`);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) { throw new Error("Email does not exist!"); }
    console.info(`[AUTH][SERVICE][LOGIN]: EMAIL VERIFIED!`);

    console.info(`[AUTH][SERVICE][LOGIN]: CHECKING IF PASSWORD CORRECT!`);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) { throw new Error("Password is wrong!"); }
    console.info(`[AUTH][SERVICE][LOGIN]: VERIFIED PASSWORD CORRECT!`);

    return {
        id: user.id,
        email: user.email
    };
}