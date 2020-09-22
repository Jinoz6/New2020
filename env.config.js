import path from 'path'

export const key = process.env.KEY || 'aa_ctmt_db'

export const database = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PWD || "",
    database: process.env.MATER_DB_NAME || "aa_ctmt_db",
}