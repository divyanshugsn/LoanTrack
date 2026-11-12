const API_URL = "http://localhost:5000/api/loans";

const loanForm = document.getElementById("loanForm");
const loanTableBody = document.getElementById("loanTableBody");
const totalLoans = document.getElementById("totalLoans");

const formMessage = document.getElementById("formMessage");
const loadingMessage = document.getElementById("loadingMessage");
const emptyMessage = document.getElementById("emptyMessage");
const errorMessage = document.getElementById("errorMessage");

const submitButton = document.getElementById("submitButton");
const refreshButton = document.getElementById("refreshButton");

// Fetch all loans from backend
async function fetchLoans() {
    loadingMessage.hidden = false;
    errorMessage.textContent = "";
    emptyMessage.hidden = true;

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch loans");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
            throw new Error("Invalid loan API response");
        }
        
        const loans = result.data;

        renderLoans(loans);

    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        loadingMessage.hidden = true;
    }
}

// Display loans in the HTML table
function renderLoans(loans) {
    loanTableBody.replaceChildren();

    totalLoans.textContent = loans.length;

    emptyMessage.hidden = loans.length !== 0;

    loans.forEach((loan) => {
        const row = document.createElement("tr");

        const values = [
            loan.id,
            loan.borrower_name,
            `₹${Number(loan.loan_amount).toLocaleString("en-IN")}`,
            loan.property_city || "-",
            loan.status,
            new Date(loan.created_at).toLocaleDateString()
        ];

        values.forEach((value, index) => {
            const cell = document.createElement("td");

            cell.textContent = value;

            if (index === 4) {
                cell.classList.add("status", `status-${loan.status}`);
            }

            row.appendChild(cell);
        });

        loanTableBody.appendChild(row);
    });
}

// Submit a new loan
loanForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formMessage.textContent = "";
    formMessage.className = "";

    const borrowerName =
        document.getElementById("borrowerName").value.trim();

    const loanAmount =
        Number(document.getElementById("loanAmount").value);

    const propertyCity =
        document.getElementById("propertyCity").value.trim();

    if (!borrowerName || !Number.isFinite(loanAmount) || loanAmount <= 0) {
        formMessage.textContent = "Please enter valid loan details.";
        return;
    }

    const loanData = {
        borrower_name: borrowerName,
        loan_amount: loanAmount,
        property_city: propertyCity
    };

    submitButton.disabled = true;
    submitButton.textContent = "Adding...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loanData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to add loan");
        }

        formMessage.textContent = "Loan added successfully!";
        formMessage.className = "success";

        loanForm.reset();

        await fetchLoans();

    } catch (error) {
        formMessage.textContent = error.message;
        formMessage.className = "error";
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Add Loan";
    }
});

// Refresh button
refreshButton.addEventListener("click", fetchLoans);

// Load loans when the page opens
fetchLoans();