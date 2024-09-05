import pool from "../Config/database.js";

const GetWarrantyCountMonth = async () => {
  const result = await pool.execute(
    "SELECT GetWarrantyCountToday() AS count_today"
  );
  executeQuery(query, res);
};

export { GetWarrantyCountMonth };
