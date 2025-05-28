# 💰 Finance Journal - Simple Spending Tracker

**Finance Journal** is a clean, no-frills web app that helps you record daily financial transactions like a digital money diary. It provides basic **Create, Read, and Delete (CRD)** operations for managing financial records, powered by **PostgreSQL** and **pgAdmin**.

While the current version offers essential functionality, it lacks an **Update (U)** feature and user authentication. Additionally, it does not yet include advanced features like data visualization.

Future updates will address these gaps to improve user experience and security.

---

![Dashboard Screenshot](https://github.com/user-attachments/assets/6b13c3b3-2760-4f27-8b4f-d3b7e8157465)

## ✨ Key Features

- 📊 Interactive financial dashboard
- ➕ Create new financial records
- 👀 View transaction history
- ❌ Delete unwanted entries
- 🗃️ PostgreSQL database integration
- 🔄 Real-time data updates

## 🚀 Upcoming Features

- 🔄 Update functionality (completing CRUD)
- 🔐 User authentication system
- 📈 Advanced data visualization
- 📱 Mobile-responsive design

## 🛠️ Tech Stack

### Frontend

- React.js

### Backend

- Node.js
- Express.js
- PostgreSQL
- pgAdmin

## 🏗️ Project Structure

```text
📦 project-root
├── 📂 backend
│   ├── 📄 package-lock.json
│   ├── 📄 package.json
│   └── 📄 server.js
│
├── 📂 frontend
│   ├── 📂 public
│   │   ├── 📄 index.html
│   │   ├── 📄 manifest.json
│   │   └── 📄 robots.txt
│   │
│   ├── 📂 src
│   │   ├── 📄 App.css
│   │   ├── 📄 App.js
│   │   ├── 📄 App.test.js
│   │   ├── 📄 Login.js
│   │   ├── 📄 Signup.js
│   │   ├── 📄 index.css
│   │   ├── 📄 index.js
│   │   ├── 📄 reportWebVitals.js
│   │   └── 📄 setupTests.js
│   │
│   ├── 📄 package-lock.json
│   ├── 📄 package.json
│   └── 📄 README.md
│
└── 📄 README.md
```

## 👥 Team Members

- [**Prabhmeet Singh**](https://github.com/prabhmeet-kira)
- [**Aryan Jain**](https://github.com/08-Aryan)

---

## ⚙️ Setup and Installation

### Prerequisites

- **Node.js** installed on your machine
- **PostgreSQL** installed and configured
- **pgAdmin** set up for managing the PostgreSQL database

### Steps

1. **Clone the repository**:
   ```bash
   https://github.com/prabhmeet-kira/Finance-Tracker.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd personal-finance-tracking-system
   ```
3. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```
4. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   ```
5. **Set up environment variables**:
   Create a .env file in the backend directory with the following content:
   ```bash
   DATABASE_URL=your-postgresql-connection-url
   ```
6. **Start the backend server**:
   ```bash
   cd backend
   node server.js
   ```
7. **Start the frontend development server**:
   ```bash
   cd frontend
   npm start
   ```

## 🌐 Accessing the Application

Open your browser and navigate to:

```bash
http://localhost:3000
```

## 🚀 Future Plans

```bash
Add update (U) functionality to complete CRUD operations.
Include user authentication for personalized dashboards.
Add data visualization features for better financial insights.
```
