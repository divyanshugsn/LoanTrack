const pool = require("../config/database");

// Retrieve all loans
async function getAllLoans() {
  const result = await pool.query(
    "SELECT * FROM loans ORDER BY created_at DESC, id DESC"
  );

  return result.rows;
}

// Create a new loan
async function createLoan(loanData) {
  const { borrower_name, loan_amount, property_city } = loanData;

  const result = await pool.query(
    `INSERT INTO loans (borrower_name, loan_amount, property_city)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [borrower_name, loan_amount, property_city || null]
  );

  return result.rows[0];
}

module.exports = {
  getAllLoans,
  createLoan,
};
