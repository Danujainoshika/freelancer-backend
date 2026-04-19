import app from "./app.js";
import dotenv from 'dotenv';
import pool from "./config/db.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        connection.release();

        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);

        })
    } catch (error) {
        console.error("error",error.message);
        process.exit(1);
    }
}

startServer();