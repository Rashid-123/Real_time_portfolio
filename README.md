# Portfolio Tracker

A  full-stack project that fetches and displays portfolio data using a **Node.js + Express + TypeScript** backend and a **Next.js (TypeScript)** frontend.

### Live (vercel) : https://portfolio-theta-inky-tbm0md45x0.vercel.app/

### 📊 Data Source

All real-time financial data used in this project is fetched using the **[`yahoo-finance2`](https://www.npmjs.com/package/yahoo-finance2)** npm package.
It provides up-to-date market information for various stocks and indices.

The following data points are retrieved in real time:

* **CMP (Current Market Price)**
* **P/E Ratio (Price-to-Earnings Ratio)**
* **L/E (Latest Earnings)**

### NOTE : User data is seeded from the backend. The example JSON file is stored in the backend’s `data` folder as `stocks.json`.

## --------------- Backend -------------------

### Tech Stack

* Node.js
* Express
* TypeScript
* MongoDB (Mongoose)

### Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. (Optional) Seed initial data:

   ```bash
   npm run seed
   ```

### API Endpoint

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| GET    | `/api/portfolio` | Returns portfolio data |

---



## -------------------- Frontend ------------------

### Tech Stack

* Next.js (TypeScript)
* React
* Tailwind CSS
* SWR (for data fetching)

### Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. The app should now be running at:

   ```
   http://localhost:3000
   ```

---

## ------------ Build & Run (Production) -------------

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm start
```

---

