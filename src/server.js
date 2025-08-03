import app from "./app.js";

const start = async () => {
    try {
        await app.listen({ port: process.env.PORT || 5000 });
        console.log(`Server is running on port ${app.server.address().port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();