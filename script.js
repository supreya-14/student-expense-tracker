let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
    let name = document.getElementById("name").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (name === "" || amount === "") {
        alert("Please enter all details");
        return;
    }

    if (amount > 1000) {
        alert("Warning: High expense!");
    }

    let expense = {
        name: name,
        amount: Number(amount),
        category: category,
        date: new Date().toLocaleDateString()
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";

    displayExpenses();
}

function displayExpenses() {
    let list = document.getElementById("expenseList");
    let categoryList = document.getElementById("categoryTotal");

    list.innerHTML = "";
    categoryList.innerHTML = "";

    let total = 0;
    let categorySum = {};

    expenses.forEach((exp, index) => {
        total += exp.amount;
        categorySum[exp.category] = (categorySum[exp.category] || 0) + exp.amount;

        let li = document.createElement("li");
        li.innerHTML = `
            <strong>${exp.name}</strong> (${exp.category})<br>
            Date: ${exp.date}<br>
            Amount: ₹${exp.amount}
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;

    for (let cat in categorySum) {
        let li = document.createElement("li");
        li.innerText = `${cat}: ₹${categorySum[cat]}`;
        categoryList.appendChild(li);
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

function clearAll() {
    localStorage.removeItem("expenses");
    expenses = [];
    displayExpenses();
}

displayExpenses();
