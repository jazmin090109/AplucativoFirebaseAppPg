
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // Usar true para Azure SQL
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' // Cambiar a true para desarrollo local
    }
};

let pool: sql.ConnectionPool;

export const connectDB = async () => {
    try {
        if (!pool) {
            pool = await new sql.ConnectionPool(dbConfig).connect();
            console.log('Conectado a SQL Server');
        }
        return pool;
    } catch (err) {
        console.error('Error en la conexión con la base de datos:', err);
        // Si la conexión falla, es un error crítico. Terminamos el proceso.
        process.exit(1);
    }
};

export const getPool = () => {
    if (!pool) {
        throw new Error("La conexión con la base de datos no ha sido establecida.");
    }
    return pool;
}
