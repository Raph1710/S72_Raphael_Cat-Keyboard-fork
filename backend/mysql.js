import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

export async function getAllUsers(){
    const [result] = await pool.query("SELECT * FROM users;")
    return result
}

export async function getUserbyId(id){
    const [result] = await pool.query("SELECT * FROM users WHERE id = ?", [id])
    return result[0]
}

export async function createUser(name, email, password){
    const [result] = await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password])
    const id = result.insertId;
    return getUser(id)
}

export async function deleteUser(id){
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id])
    if(result.affectedRows === 0) return "Failed to delete user";
    return "User deleted successfully";
}