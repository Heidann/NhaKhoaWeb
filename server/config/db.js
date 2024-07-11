// c:\Users\phhai\Documents\GitHub\NhaKhoaWeb\server\config\db.js
import mysql from "mysql2";

// Replace with your actual database credentials

// Function to connect to MySQL database
const connectDB = async () => {
  // Declare connectDB first
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
    console.log("Connected to MySQL database ... ");
    return connection;
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default connectDB; // Export after declaration
