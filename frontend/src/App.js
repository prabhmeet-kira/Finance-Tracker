import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");

    const fetchFilteredTransactions = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:5000/transactions", {
                params: { type: typeFilter, category, startDate, endDate, sortBy, sortOrder },
            });
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [typeFilter, category, startDate, endDate, sortBy, sortOrder]);

    useEffect(() => {
        fetchFilteredTransactions();
    }, [fetchFilteredTransactions]);

    console.log(transactions);

    const addTransaction = async (e) => {
        e.preventDefault();
        try {
            const newTransaction = { description, amount, type, category };
            await axios.post("http://localhost:5000/transactions", newTransaction);
            fetchFilteredTransactions();
            setDescription("");
            setAmount("");
            setCategory("");
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/transactions/${id}`);
            fetchFilteredTransactions();
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Personal Finance Tracker</h1>

            <div className="transaction-form">
                <h2>Add New Transaction</h2>
                <form onSubmit={addTransaction}>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="salary">Salary</option>
                        <option value="groceries">Groceries</option>
                        <option value="utilities">Utilities</option>
                    </select>
                    <button type="submit" className="btn">Add Transaction</button>
                </form>
            </div>

            <div className="filter-section">
                <h2>Filters</h2>
                <div className="filters">
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All</option>
                        <option value="salary">Salary</option>
                        <option value="groceries">Groceries</option>
                        <option value="utilities">Utilities</option>
                    </select>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <button onClick={fetchFilteredTransactions} className="btn">Apply Filters</button>
                </div>
            </div>

            <div className="transaction-history">
                <h2>Transaction History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
    {transactions.length > 0 ? (
        transactions.map((transaction) => (
            <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>
                    <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr><td colSpan="5">No transactions found</td></tr>
    )}
</tbody>

                </table>
            </div>

            <div className="current-balance">
                <h3>Current Balance</h3>
                <p>
                    $
                    {transactions.reduce((acc, transaction) => {
                        return transaction.type === "income"
                            ? acc + parseFloat(transaction.amount)
                            : acc - parseFloat(transaction.amount);
                    }, 0).toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default App;
