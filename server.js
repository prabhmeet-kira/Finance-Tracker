import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = 5000;

// Set up PostgreSQL connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory users list (Replace with your actual DB for real-world apps)
const users = []; // Temporarily using an array for users. Replace with DB logic in production.

// Signup route
app.post(
    '/signup',
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Check if user already exists in the DB
            const existingUser = users.find((user) => user.email === email); // Replace with DB query
            if (existingUser) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            // Hash password
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Store user (In DB, you should insert the user into the database)
            users.push({ email, password: hashedPassword });

            res.status(201).json({ msg: 'User created successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Internal server error' });
        }
    }
);

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user in DB (Replace with actual DB query)
        const user = users.find((user) => user.email === email); // Replace with DB query
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Endpoint to get filtered transactions
app.get("/transactions", async (req, res) => {
    const { type, category, startDate, endDate, sortBy = "date", sortOrder = "asc" } = req.query;

    let query = "SELECT * FROM transactions WHERE 1=1";
    const queryParams = [];

    if (type) {
        queryParams.push(type);
        query += ` AND type = $${queryParams.length}`;
    }
    if (category) {
        queryParams.push(category);
        query += ` AND category = $${queryParams.length}`;
    }
    if (startDate && endDate) {
        queryParams.push(startDate, endDate);
        query += ` AND date BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
    }

    query += ` ORDER BY ${sortBy} ${sortOrder.toUpperCase()}`;

    try {
        const result = await pool.query(query, queryParams);
        console.log('Transactions fetched:', result.rows);  // Log the fetched data
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).send(err.message);
    }
});

// Endpoint to add a new transaction
app.post("/transactions", async (req, res) => {
    const { description, amount, type, category } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO transactions (description, amount, type, category) VALUES ($1, $2, $3, $4) RETURNING *",
            [description, amount, type, category]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Endpoint to delete a transaction by ID
app.delete("/transactions/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM transactions WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Transaction not found");
        }
        res.json({ message: "Transaction deleted successfully", deletedTransaction: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
