
const loanService = require("../services/loan.service");

// GET /loans
async function getLoans(req, res) {
  try {
    const loans = await loanService.getAllLoans();

    return res.status(200).json({
      success: true,
      count: loans.length,
      data: loans,
    });
  } catch (error) {
    console.error("Error retrieving loans:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve loans",
    });
  }
}

// POST /loans
async function addLoan(req, res) {
  try {
    const { borrower_name, loan_amount, property_city } = req.body;

    // Validate borrower name
    if (
      typeof borrower_name !== "string" ||
      borrower_name.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "borrower_name is required",
      });
    }

    // Validate loan amount
    const amount = Number(loan_amount);

    if (
      loan_amount === undefined ||
      loan_amount === null ||
      loan_amount === "" ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "loan_amount must be a positive number",
      });
    }

    // Validate optional property city
    if (
      property_city !== undefined &&
      property_city !== null &&
      typeof property_city !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "property_city must be a string",
      });
    }

    const loan = await loanService.createLoan({
      borrower_name: borrower_name.trim(),
      loan_amount: amount,
      property_city: property_city?.trim() || null,
    });

    return res.status(201).json({
      success: true,
      message: "Loan created successfully",
      data: loan,
    });
  } catch (error) {
    console.error("Error creating loan:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create loan",
    });
  }
}

module.exports = {
  getLoans,
  addLoan,
};
