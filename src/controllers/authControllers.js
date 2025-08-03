import { loginService, registerService } from "../services/authServices.js";

export async function register(request, reply) {
    try {
        const { email, password } = request.body;
        console.info(`[AUTH][CONTROLLER][REGISTER]: SENDING DATA TO SERVICE!`);
        const userWithoutPassword = await registerService(email, password);
        console.info(`[AUTH][CONTROLLER][REGISTER] DATA ARRIVED FROM SERVICE!`);
        reply.code(201).send(userWithoutPassword);
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
}

export async function login(request, reply) {
    try {
        const { email, password } = request.body;
        console.info(`[AUTH][CONTROLLER][LOGIN]: SENDING DATA TO SERVICE!`);
        const data = await loginService(email, password);
        console.info(`[AUTH][CONTROLLER][LOGIN]: Data ARRIVED FROM SERVICE!`);
        console.info(`[AUTH][CONTROLLER][LOGIN]: CREATING TOKEN WITH DATA!`);
        const token = await reply.jwtSign({
            id: data.id,
            email: data.email
        });
        console.info(`[AUTH][CONTROLLER][LOGIN]: TOKEN CREATED!`);
        reply.code(200).send(token);
    } catch (err) {
        reply.code(400).send({ error: err.message });
    }
}