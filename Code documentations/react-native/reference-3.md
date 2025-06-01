# 💼 Full Stack Wallet App– Implementation Guide - (React Native + Node.js + Clerk + PostgreSQL)

## 📦 Tech Stack Overview

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Mobile App   | React Native + Expo                 |
| Backend API  | Node.js + Express                   |
| Database     | PostgreSQL (via Neon)               |
| Auth         | Clerk                               |
| Styling      | NativeWind (Tailwind for RN)        |
| State Mgmt   | React Hooks                         |
| Offline Mode | Expo SQLite                         |
| Deployment   | EAS, Render, Fly.io                 |

---

# ✅ Phase 1 – Backend API with Express & Neon (PostgreSQL)

## 1. Setup
... (PHASE 1 CONTENT HERE) ...

## 🧰 Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Mobile App   | React Native + Expo                 |
| Backend API  | Node.js + Express                   |
| Database     | PostgreSQL (via Neon)               |
| Auth         | Clerk (email/password + verification) |
| Rate Limiting| Redis (cloud hosted)                |

---

## 📦 1. Project Structure

```

wallet-app/
├── backend/             # Express server with Postgres DB
└── mobile/              # React Native app with Expo

````

---

## 🚀 2. Backend Setup – Express + Neon PostgreSQL

### A. Init Node Project
```bash
cd backend
npm init -y
````

### B. Install Core Packages

```bash
npm install express@4.21.0 dotenv@16.5.0 cors@2.8.5
```

### C. Install Dev Tools

```bash
npm install -D nodemon
```

### D. Add Script to `package.json`

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

---

## 🧱 3. Create Express Server

### A. `server.js`

```js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.get('/', (req, res) => res.send('API running'));

app.listen(port, () => console.log(`Server running on port ${port}`));
```

### B. Run the Server

```bash
npm run dev
```

---

## 🌐 4. Connect PostgreSQL (via Neon)

### A. Sign up at [https://neon.tech](https://neon.tech)

* Create project: e.g. `rn-wallet`
* Copy the connection string

### B. Add `.env`

```env
PORT=5001
DATABASE_URL=your_neon_connection_string
```

### C. Create `config/db.js`

```js
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

export const sql = neon(process.env.DATABASE_URL);
```

---

## 🗃️ 5. Initialize Database

### A. `initDB()` function in `server.js`

```js
import { sql } from './config/db.js';

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
      )
    `;
    console.log('✅ Database initialized');
  } catch (err) {
    console.error('❌ Error initializing DB', err);
    process.exit(1);
  }
}

initDB().then(() => app.listen(port));
```

---

## ➕ 6. Create Transaction Endpoint

```js
app.post('/api/transactions', async (req, res) => {
  const { user_id, title, amount, category } = req.body;

  if (!user_id || !title || !category || amount === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const transaction = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *;
    `;
    res.status(201).json(transaction[0]);
  } catch (err) {
    res.status(500).json({ message: 'Internal error' });
  }
});
```

---

## 📥 7. Fetch Transactions by User

```js
app.get('/api/transactions/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const transactions = await sql`
      SELECT * FROM transactions
      WHERE user_id = ${user_id}
      ORDER BY created_at DESC
    `;
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Internal error' });
  }
});
```

---

## 🔐 8. Setup Authentication with Clerk

### A. Sign up at [https://clerk.dev](https://clerk.dev)

* Create app: `wallet`
* Enable email + password
* Copy Clerk frontend/backend environment variables

### B. Add to `.env`

```env
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

*(Mobile auth integration handled in Phase 2)*

---

## 🧪 9. Test with Postman

* **POST /api/transactions**

  * Body: `{ "user_id": "...", "title": "...", "amount": 200, "category": "income" }`
* **GET /api/transactions/\:user\_id**

---

## 🔄 10. Middleware & Error Handling

### A. JSON Parser

```js
app.use(express.json());
```

### B. Rate Limiting (Next Phase)

* Use Redis for IP or user-based rate limit.

---

## 📌 Next Steps (Phase 2)

| Feature                 | Notes                                   |
| ----------------------- | --------------------------------------- |
| Mobile App Scaffold     | Expo project with Tailwind (NativeWind) |
| Auth Integration        | `@clerk/clerk-expo` with session hooks  |
| API Integration         | Connect to backend via `fetch()`        |
| Add/Delete Transactions | Button & form in mobile app             |
| Balance Calculation     | Local or backend-sourced                |
| Refresh Control         | Add pull-to-refresh on list             |

---

## 📎 Resources

* [Neon Docs](https://neon.tech/docs)
* [Clerk Docs](https://clerk.dev/docs)
* [Express Docs](https://expressjs.com/)
* [Expo Docs](https://docs.expo.dev/)
* [PostgreSQL Decimal Types](https://www.postgresql.org/docs/current/datatype-numeric.html)

---

# 📱 Phase 2 – Mobile App with Expo, Clerk Auth, and Backend API Integration
... (PHASE 2 CONTENT HERE) ...

## 📦 Tech Stack (Frontend)

| Layer           | Tool/Library                         |
|------------------|--------------------------------------|
| App Framework    | Expo (React Native)                  |
| Navigation       | Expo Router                          |
| UI Styling       | NativeWind (Tailwind for RN)         |
| Auth             | @clerk/clerk-expo                    |
| HTTP Requests    | Fetch API or Axios                   |

---

## 🚀 1. Initialize Expo App

```bash
npx create-expo-app@latest mobile -t with-router
cd mobile
````

Choose **TypeScript + Router** template.

---

## 🎨 2. Install NativeWind for Styling

```bash
npm install nativewind tailwindcss
npx tailwindcss init
```

### Update `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Update `babel.config.js`:

```js
plugins: ["nativewind/babel"],
```

---

## 🔐 3. Install & Configure Clerk

```bash
npm install @clerk/clerk-expo
```

### Add `.env`

```
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Wrap App in `ClerkProvider` – `app/_layout.tsx`:

```tsx
import { ClerkProvider } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-expo';
import Constants from 'expo-constants';

const CLERK_PUBLISHABLE_KEY = Constants.expoConfig.extra.clerkKey;

export default function Layout() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <Slot />
    </ClerkProvider>
  );
}
```

---

## 🧑‍💻 4. Add Auth Screens

### Sign In – `app/sign-in.tsx`

```tsx
import { SignIn } from '@clerk/clerk-expo';

export default function SignInScreen() {
  return <SignIn />;
}
```

### Sign Up – `app/sign-up.tsx`

```tsx
import { SignUp } from '@clerk/clerk-expo';

export default function SignUpScreen() {
  return <SignUp />;
}
```

### Redirect based on session (inside layout or screens):

```tsx
const { isSignedIn } = useAuth();

if (!isSignedIn) {
  router.push('/sign-in');
}
```

---

## 🧠 5. Fetch Clerk JWT for Backend

To secure backend requests:

```tsx
import { useAuth } from '@clerk/clerk-expo';

const { getToken } = useAuth();

const token = await getToken();
fetch('https://your-api.com/api/transactions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: userId,
    title: 'Coffee',
    amount: 3.5,
    category: 'food'
  })
});
```

---

## 🧾 6. Add Transaction Form UI

### `app/index.tsx`:

```tsx
import { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';

export default function HomeScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const submit = async () => {
    await fetch(`http://<your-server>/api/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, amount, category, user_id: '<clerk_id>' })
    });
  };

  return (
    <View>
      <TextInput placeholder="Title" onChangeText={setTitle} />
      <TextInput placeholder="Amount" onChangeText={setAmount} keyboardType="numeric" />
      <TextInput placeholder="Category" onChangeText={setCategory} />
      <Button title="Add Transaction" onPress={submit} />
    </View>
  );
}
```

---

## 🔁 7. View Transactions List

Use `FlatList` to show user transactions:

```tsx
import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

export default function Feed() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`http://<your-server>/api/transactions/<user_id>`)
      .then(res => res.json())
      .then(setTransactions);
  }, []);

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text>{item.title}: ₹{item.amount}</Text>
      )}
    />
  );
}
```

---

## ✅ 8. Key Mobile Features To Add Next

| Feature                 | Status      | Notes                            |
| ----------------------- | ----------- | -------------------------------- |
| Clerk Auth              | ✅ Completed | Sign in / sign up + JWT for API  |
| Transaction Form        | ✅ Completed | Captures title, amount, category |
| Transaction List        | ✅ Completed | Fetched using Clerk user\_id     |
| Balance Calculation     | ⏳ Next Step | Sum via backend or useEffect     |
| Delete/Edit Transaction | ⏳ Next Step | Add mutation endpoints + UI      |
| Charts & Insights       | ⏳ Future    | Use Victory Native or Recharts   |

---

## 📦 Suggested Folder Structure

```plaintext
/mobile
├── app/
│   ├── index.tsx
│   ├── sign-in.tsx
│   ├── sign-up.tsx
│   └── transactions.tsx
├── components/
├── utils/
├── constants/
└── tailwind.config.js
```

---

## 📎 References

* [Clerk React Native Docs](https://clerk.dev/docs/quickstarts/expo)
* [NativeWind Docs](https://github.com/marklawlor/nativewind)
* [Expo Router Docs](https://expo.github.io/router/docs)

---

Here is **Phase 3** of your wallet app build, focusing on:

* 🔁 **Transaction Deletion & Editing**
* 💰 **Balance Summary**
* 📊 **Chart Insights**
* 🧠 Structured code using React Native best practices

---

# 📊 Phase 3 – Edit/Delete Transactions, Balance Summary & Chart Insights

## 📁 1. Backend API Enhancements
... (PHASE 3 CONTENT HERE) ...

### A. Add DELETE `/api/transactions/:id`
```js
app.delete('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await sql`DELETE FROM transactions WHERE id = ${id}`;
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete' });
  }
});
````

---

### B. Add PUT `/api/transactions/:id` (Edit)

```js
app.put('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { title, amount, category } = req.body;

  try {
    const updated = await sql`
      UPDATE transactions
      SET title = ${title}, amount = ${amount}, category = ${category}
      WHERE id = ${id}
      RETURNING *;
    `;
    res.status(200).json(updated[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update' });
  }
});
```

---

### C. Add Balance Endpoint

```js
app.get('/api/balance/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const balance = await sql`
      SELECT SUM(CASE WHEN category = 'income' THEN amount ELSE -amount END) AS total
      FROM transactions
      WHERE user_id = ${user_id}
    `;
    res.json({ balance: balance[0].total });
  } catch (err) {
    res.status(500).json({ message: 'Balance fetch failed' });
  }
});
```

---

## 📱 2. Frontend – Mobile UI Features

---

### A. Add Delete Transaction Button

```tsx
const deleteTransaction = async (id: number) => {
  await fetch(`http://<your-server>/api/transactions/${id}`, {
    method: 'DELETE',
  });
  refreshTransactions(); // Re-fetch list
};
```

```tsx
<Button title="Delete" onPress={() => deleteTransaction(item.id)} />
```

---

### B. Add Edit Transaction Modal

```tsx
const [editing, setEditing] = useState(false);
const [editData, setEditData] = useState({...item});

const updateTransaction = async () => {
  await fetch(`http://<your-server>/api/transactions/${item.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editData),
  });
  setEditing(false);
  refreshTransactions();
};
```

```tsx
<Modal visible={editing}>
  <TextInput value={editData.title} onChangeText={t => setEditData({...editData, title: t})} />
  <TextInput value={editData.amount.toString()} onChangeText={a => setEditData({...editData, amount: parseFloat(a)})} />
  <Button title="Save" onPress={updateTransaction} />
</Modal>
```

---

### C. Display Total Balance

```tsx
const [balance, setBalance] = useState(0);

useEffect(() => {
  fetch(`http://<your-server>/api/balance/${userId}`)
    .then(res => res.json())
    .then(data => setBalance(data.balance));
}, []);
```

```tsx
<Text className="text-xl font-bold">Total Balance: ₹{balance}</Text>
```

---

### D. Add Expense vs Income Pie Chart

#### Install Chart Library

```bash
npm install react-native-chart-kit react-native-svg
```

#### Component

```tsx
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const chartData = [
  { name: 'Income', amount: totalIncome, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Expenses', amount: totalExpense, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 }
];

<PieChart
  data={chartData}
  width={screenWidth}
  height={220}
  chartConfig={{
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  }}
  accessor={"amount"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
  absolute
/>
```

---

## 💡 3. Suggested State Hooks

```tsx
const [transactions, setTransactions] = useState([]);
const [balance, setBalance] = useState(0);
const [editModal, setEditModal] = useState(false);
```

---

## ✅ 4. Feature Checklist

| Feature                 | Status |
| ----------------------- | ------ |
| Create Transaction      | ✅      |
| List Transactions       | ✅      |
| Delete Transaction      | ✅      |
| Edit Transaction        | ✅      |
| Fetch & Show Balance    | ✅      |
| Pie Chart Visualization | ✅      |

---

## 🔜 5. Optional Improvements

* Add category filtering
* Implement budgets per category
* Export to CSV / PDF
* Add dark/light theme toggle
* Offline mode (use SQLite)

---

## 📎 References

* [React Native Modal](https://reactnative.dev/docs/modal)
* [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)
* [Clerk Auth Docs](https://clerk.dev/docs)
* [Postgres SUM queries](https://www.postgresql.org/docs/current/functions-aggregate.html)


---

# 🚀 Phase 4 – Advanced Features, Offline Mode, Notifications, and Deployment

## 1. Category Filtering (Client-Side)
... (PHASE 4 CONTENT HERE) ...

### A. UI Dropdown or Filter Chips
```tsx
const [categoryFilter, setCategoryFilter] = useState('all');

const filteredData = categoryFilter === 'all'
  ? transactions
  : transactions.filter(item => item.category === categoryFilter);
````

```tsx
<Button title="Food" onPress={() => setCategoryFilter('food')} />
<Button title="Travel" onPress={() => setCategoryFilter('travel')} />
```

---

## 📊 2. Budget Limits per Category

### A. Backend Table Extension (Optional)

```sql
CREATE TABLE IF NOT EXISTS budgets (
  user_id VARCHAR(255),
  category VARCHAR(255),
  limit DECIMAL
);
```

### B. API Endpoint

```js
GET /api/budgets/:user_id
POST /api/budgets (user_id, category, limit)
```

### C. Client Usage Example

```tsx
if (totalSpent > limit) {
  alert('Budget exceeded for ' + category);
}
```

---

## 📤 3. Export to CSV or PDF

### A. Install CSV & PDF Packages

```bash
npm install react-native-csv react-native-html-to-pdf
```

### B. Generate CSV

```tsx
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const csvData = transactions.map(tx => `${tx.title},${tx.amount},${tx.category}`);
const fileUri = FileSystem.documentDirectory + 'export.csv';
await FileSystem.writeAsStringAsync(fileUri, csvData.join('\n'));
await Sharing.shareAsync(fileUri);
```

### C. Generate PDF

Use `react-native-html-to-pdf` with transaction data in a template.

---

## 🌙 4. Dark / Light Theme Toggle

### A. Install NativeWind Plugin

Already handled with NativeWind. Add this logic:

```tsx
import { useColorScheme } from 'react-native';

const isDark = useColorScheme() === 'dark';
const theme = isDark ? darkTheme : lightTheme;
```

### B. Dynamic Tailwind Themes

Use conditional `className`:

```tsx
<Text className={isDark ? 'text-white' : 'text-black'}>Total</Text>
```

---

## 📴 5. Offline Mode with SQLite

### A. Install Expo SQLite

```bash
expo install expo-sqlite
```

### B. Setup Local Cache

```tsx
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('wallet.db');

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, amount REAL, category TEXT);'
  );
});
```

### C. Sync with Backend

* On connection restore, sync local-to-server.
* Pull remote updates on app focus if online.

---

## 🔔 6. Notifications

### A. Install Expo Notifications

```bash
expo install expo-notifications
```

### B. Register and Handle Notification

```tsx
import * as Notifications from 'expo-notifications';

await Notifications.scheduleNotificationAsync({
  content: { title: "Budget Alert", body: "You’ve hit your monthly food limit." },
  trigger: { seconds: 2 },
});
```

* Request permissions on first run
* Set up listeners in layout `_layout.tsx`

---

## 🧭 7. User Onboarding Flow

### A. Create Route Group: `app/(onboarding)/`

```plaintext
/onboarding/
├── welcome.tsx
├── tutorial.tsx
└── preferences.tsx
```

### B. Conditional Routing

In root layout:

```tsx
if (!userOnboarded) {
  router.replace('/onboarding/welcome');
}
```

Store onboarding completion in SecureStore or Clerk metadata.

---

## 🚀 8. Deployment Guide

### A. Mobile App (Expo EAS)

#### 1. Install EAS

```bash
npm install -g eas-cli
eas login
eas build:configure
```

#### 2. Build

```bash
eas build -p android --profile preview
eas submit -p android
```

#### 3. OTA Updates

```bash
eas update --branch production
```

---

### B. Backend (Render or Fly.io)

#### Render (simpler)

* Create new **Web Service**
* Connect Git repo
* Set build command: `npm install`
* Start command: `npm run dev`
* Add environment variables:

  * `DATABASE_URL`
  * `PORT=10000`
  * `CLERK_SECRET_KEY`

#### Fly.io (advanced)

```bash
fly launch
fly deploy
```

---

## ✅ Phase 4 Summary Checklist

| Feature                         | Status |
| ------------------------------- | ------ |
| Category Filtering              | ✅      |
| Budgets per Category            | ✅      |
| Export to CSV / PDF             | ✅      |
| Dark / Light Mode               | ✅      |
| Offline Mode with SQLite        | ✅      |
| Push Notifications              | ✅      |
| User Onboarding Flow            | ✅      |
| Mobile Deployment (EAS)         | ✅      |
| Backend Hosting (Render/Fly.io) | ✅      |

---

## 📎 Resources

* [Expo Notifications](https://docs.expo.dev/push-notifications/overview/)
* [SQLite with React Native](https://docs.expo.dev/versions/latest/sdk/sqlite/)
* [react-native-html-to-pdf](https://github.com/christopherdro/react-native-html-to-pdf)
* [Render Node.js Hosting](https://render.com/docs/deploy-node-express-app)
* [EAS Build Docs](https://docs.expo.dev/build/introduction/)

---

- 📱 Cross-Platform App: Built with React Native & Expo
- 🔐 Authentication: Signup & login with Clerk
- 📩 Email Verification: Secure 6-digit code flow before accessing the app
- 🏠 5 Screens: Signup, Login, Verify Email, Home, and Create Transaction
- 💸 Expense Tracker: Add income or expenses and manage financial entries
- 📊 Balance Updates: Live calculation of current balance based on transactions
- 🗑️ Delete Transactions: Remove old entries with a single tap
- 🔄 Pull to Refresh: Classic refresh gesture implemented from scratch
- 🚪 Logout Functionality: Easily switch accounts or sign out
- 🧰 Backend with Express: RESTful API connected to Neon-hosted Postgres
- 🌐 Cloud Deployment: Host your backend online for mobile access
- ⏱️ Rate Limiting: Protect your API using Redis-based limiter
- 🧠 Beginner Friendly: No prior React Native experience needed—only basic React knowledge
- 💸 100% Free Tools: No need to pay for anything
- 🧪 Real Device Testing: Run the app on your own phone without a Mac


Timestamps:
- 00:00:00 - 0- Project Preview
- 00:03:22 - 1- Backend Setup
- 00:15:35 - 2- Database Setup
- 00:28:42 - 3- Create Transaction Route
- 00:41:35 - 4- GET & DELETE Route
- 00:52:45 - 5- GET Summary Route
- 01:00:26 - 6- Rate Limiting
- 01:14:08 - 7- Organizing Our Codebase 
- 01:27:59 - 8- React Native Setup & Basics
- 01:54:16 - 9- Setting Up Styles & Images
- 02:06:33 - 10- Authentication
- 02:18:01 - 11- Designing Auth Pages
- 02:44:39 - 12- useTransactions Hook
- 02:56:51 - 13- Deploying Our API
- 03:09:56 - 14- Home Screen
- 03:32:21 - 15- Create Screen & Completing Our Project

---

# tactiq.io free youtube transcript
# Build a Full Stack Mobile Application with React Native & Expo - Beginner Friendly
# https://www.youtube.com/watch/vk13GJi4Vd0

00:00:00.080 In this video, we're going to build a
00:00:02.080 full stack mobile application that works
00:00:04.560 on your actual physical device that is
00:00:07.200 either Android or iOS. It even works in
00:00:10.240 the simulator on your laptop. This is
00:00:12.719 possible thanks to React Native and
00:00:15.120 Expo, which is something that we'll get
00:00:17.119 into the details a bit later in the
00:00:19.199 video. I cannot wait to start coding
00:00:21.199 this project with you. But first, let me
00:00:23.279 give you a quick walkthrough of the end
00:00:25.199 result so that you know what we are
00:00:26.880 building in this tutorial. So this is an
00:00:29.039 expense tracker app that I called as
00:00:31.439 wallet and in total we have five
00:00:34.000 different screens which are sign up,
00:00:36.239 login, verify email, home and create
00:00:39.200 screen. The first thing you need is to
00:00:41.200 sign up to be able to see the home
00:00:43.120 screen. Now for the sign up we have an
00:00:45.440 email verification step where you will
00:00:47.600 get a six-digit code in your inbox and
00:00:50.239 once you fill that correctly then you
00:00:52.000 will be redirected to the homepage and
00:00:54.079 initially you will not have any past
00:00:56.079 transactions. So you can visit the
00:00:58.239 create screen where you can add some
00:01:00.239 transactions that are either expenses or
00:01:02.960 income and we have couple of different
00:01:04.959 categories and depending on your
00:01:06.799 transactions your current balance will
00:01:09.040 be updated and you can delete these
00:01:11.040 transactions as well. I will also show
00:01:13.119 you how to add this classic refresh
00:01:15.360 functionality from scratch and finally
00:01:17.759 we can log out which will navigate us to
00:01:20.000 the login screen. So this is the entire
00:01:22.159 application. I'll explain every single
00:01:24.400 step so that you can easily follow along
00:01:26.560 with me from start until the end. Now,
00:01:29.040 you don't have to own a MacBook to be
00:01:31.119 able to follow along with this tutorial
00:01:33.200 because I'll show you how to run this
00:01:35.360 app on your physical device. First, we
00:01:37.759 are going to build our back end where we
00:01:39.840 have an express API that is connected to
00:01:42.640 a Postgress database on the cloud that
00:01:45.200 is provided by Neon. And once we build
00:01:47.680 our API, we're going to deploy it and
00:01:50.000 then we will start building our mobile
00:01:52.079 application with React Native and Expo.
00:01:54.640 For the authentication, we'll be using
00:01:56.399 Clerk with the email and password
00:01:58.640 combination. And in this tutorial, we
00:02:00.719 will talk about something called rate
00:02:02.560 limiting, which is a concept that you
00:02:04.719 should definitely know. And we will
00:02:06.399 implement that using Reddus as our
00:02:08.639 secondary database, which is also hosted
00:02:10.959 on the cloud. So overall, this is the
00:02:13.200 entire tutorial. I'll assume you have
00:02:15.360 never used React Native before so that
00:02:17.599 you can follow along with me from start
00:02:19.840 until the end without getting confused.
00:02:22.239 But of course, I'll assume you know the
00:02:24.080 basics of React like what is a
00:02:26.160 component, state, use effect, and JSX.
00:02:29.599 That's it. Everything we use in this
00:02:31.520 tutorial is completely free to get
00:02:33.599 started with. So, you don't have to pay
00:02:35.519 for anything that we use. So, with all
00:02:37.519 that being said, if you're ready, let's
00:02:39.200 get into it. This course doesn't cost
00:02:41.440 you anything. So, if you would like to
00:02:43.120 support my work, you can subscribe,
00:02:45.200 leave a like, and add a random comment
00:02:47.120 for the algorithms. I would really
00:02:48.879 appreciate it. And one last quick
00:02:50.560 announcement. If you're interested in
00:02:52.560 web development, I have a Udemy course
00:02:54.959 with over 100 hours of content that
00:02:57.519 includes 25 real world projects like
00:03:00.480 building a LinkedIn clone, Spotify,
00:03:03.040 Netflix, Tinder, Amazon, and even mobile
00:03:06.480 applications that work on both iOS and
00:03:09.360 Android devices. This is the cheapest
00:03:11.440 course that you can ever get and the
00:03:13.440 best part is I am updating this course
00:03:15.519 every single month with new projects.
00:03:18.080 The discount link will be in the
00:03:19.760 description. Thanks for watching and
00:03:21.519 let's get
00:03:22.519 started. So to get started with I have
00:03:25.599 created an empty folder on my desktop
00:03:28.239 called React Native wallet. You can call
00:03:30.640 this anything that you wish. Just go
00:03:32.400 ahead and open this up in VS Code. Now
00:03:35.120 we are going to need two different
00:03:36.480 folders. one for the back end and the
00:03:38.959 other one for the mobile application
00:03:41.599 right so the front end but I'd like to
00:03:44.239 call this as mobile so here we will
00:03:46.720 build the react native application but
00:03:49.120 that's going to be a bit later in the
00:03:50.879 video first we would like to build the
00:03:52.959 back end so here we'll build an API if
00:03:55.920 you don't want to watch the backend part
00:03:58.000 maybe you already know how to build it
00:04:00.159 you can just copy this entire folder
00:04:02.480 from the source code and skip to the
00:04:04.799 mobile section but I would say Please
00:04:07.360 stick around so that you can see the
00:04:09.280 entire process. Okay. Now we would like
00:04:12.000 to initialize a NodeJS application under
00:04:14.480 the back end. I will open up my terminal
00:04:16.720 and the shortcut is command J or control
00:04:19.918 J. Okay. I'll say cd into the back end.
00:04:23.040 If you type some part of it and press
00:04:24.960 tab, it'll be completed. Now let's say
00:04:27.360 mpm in it-y which is going to give us a
00:04:30.720 package json file where we can install
00:04:33.199 our packages. So I'll say mpm install
00:04:36.320 express which is the web framework that
00:04:38.479 we'll use. And if you don't know what
00:04:40.240 that means I'll explain in a second. But
00:04:43.040 by default this this is going to install
00:04:45.360 the version 5. So let's actually see
00:04:48.160 this in action. I will install it. Now
00:04:50.880 here you can see express version 5 has
00:04:53.919 been installed. But this version just
00:04:56.000 came out and I think it is not really
00:04:58.560 stable completely. So, what I'd like to
00:05:01.600 what I'd like to do is to use the
00:05:03.919 version 4, which is a lot more stable.
00:05:06.560 Now, don't ever feel like uh this
00:05:09.199 tutorial is outdated. Not at all. The
00:05:11.520 entire world still using Express version
00:05:14.400 4. Uh there isn't any much changes, but
00:05:17.280 I think we should be a little bit more
00:05:20.000 stable, right? We should use the stable
00:05:22.000 version so that this tutorial is working
00:05:25.120 completely as expected for a very very
00:05:28.080 long time. Okay? So I will clear up my
00:05:31.560 terminal and I'll say install express
00:05:34.400 but with the version
00:05:37.960 4.21.0.
00:05:39.560 Okay. So once again this tutorial is not
00:05:42.479 outdated. Don't ever feel like that. Uh
00:05:44.800 this is just a lot more stable version
00:05:47.360 that we'll be using. Okay. Just go ahead
00:05:49.600 and do this. Once you are done with it,
00:05:51.919 we can install other packages. So I will
00:05:54.880 get let's say mpm install.env env to be
00:05:58.000 able to access our environment
00:05:59.600 variables. If you don't know what that
00:06:01.360 means, we'll see this in action as well.
00:06:03.840 And then let's get the course to be able
00:06:06.000 to get rid of the course errors. And
00:06:08.560 then to be able to connect to our
00:06:10.240 database, we'll use neon
00:06:14.039 database. So just make sure to put uh
00:06:17.120 put at the beginning. So neon database
00:06:20.080 slash let's say serverless. And if you
00:06:23.680 wanted to add specific versions, just go
00:06:26.319 ahead say something like uh
00:06:29.960 1.0.0 and do the same thing for course.
00:06:33.360 Here I'll say um I think 8 sorry
00:06:39.240 2.8.5 and for the env we'll say
00:06:45.880 16.5.0. So this is the entire line.
00:06:49.039 Okay, just go ahead and run this. Now
00:06:51.199 you would like to install the same
00:06:52.800 versions as I do. So that if you're
00:06:55.039 watching this video in a future date,
00:06:57.360 your code should still work uh as I
00:07:00.840 have. Okay. So once you once you have
00:07:04.160 done this, we can get started with it.
00:07:06.880 First let's create a simple server.js
00:07:09.759 file. And here let's try to import
00:07:12.360 express. I'll say
00:07:16.039 const if I can type. Let's say express.
00:07:19.520 We'll say require the express package.
00:07:22.639 Now this is the old way of doing it. Uh
00:07:25.360 this is an old syntax. It's completely
00:07:27.840 fine. But instead of this, I'd like to
00:07:30.400 use this syntax. I'd like to say import
00:07:33.199 express from express. And to be able to
00:07:36.000 make this work, we need to visit package
00:07:38.000 JSON. And here at some point, you would
00:07:40.720 like to add the type to be module. By
00:07:43.440 default, it is common.js as you can
00:07:45.520 tell. But once you uh once you say it'll
00:07:48.720 be module, you can use import export
00:07:50.880 syntax. Now we don't really need to use
00:07:53.039 this one. Okay. Now let's say create an
00:07:55.919 express
00:07:57.479 app. And we can listen on a port. I'll
00:08:00.479 say app.listen. In my case, it'll be
00:08:04.039 5,01. And once we start listening, we
00:08:07.280 can say put a console log. Say server is
00:08:10.800 up and running on port. and let's put
00:08:14.879 the port next to it which is
00:08:17.879 501. Okay, let's try to run this file
00:08:20.720 under the back end. Just say run the
00:08:23.879 server.js with the node. Okay, so as you
00:08:27.840 can tell it is working correctly. Now
00:08:29.680 let's add a route. I'll say app.get. If
00:08:33.120 you visit localhost
00:08:35.479 501, we would like to run this function
00:08:39.519 where by default we get the request and
00:08:41.880 response and we can say raza send
00:08:45.360 something like it's
00:08:48.839 working. Now kill this withtrl c and
00:08:52.080 then run this
00:08:53.560 again and just test this out under
00:08:56.240 localhost
00:08:57.720 501. Okay, so it is working as expected.
00:09:01.040 Now we just said that Express is the web
00:09:03.200 framework. But what does that mean? So I
00:09:05.839 have some diagrams. Let's try to go over
00:09:07.760 them. Now a web framework is a readyto
00:09:11.040 use toolbox for building web
00:09:13.080 applications a lot faster and a lot more
00:09:16.000 easily. So basically at the end of the
00:09:18.560 day you don't really want to reinvent
00:09:20.480 the wheel, right? uh you would like to
00:09:22.560 use a web framework because it saves
00:09:25.360 time and it makes your code a lot more
00:09:27.920 cleaner and more organized and it
00:09:30.240 handles all the common tasks that you
00:09:32.399 can imagine like routing, error
00:09:34.640 handling, middleware, so on and so
00:09:36.959 forth. So someone already built a web
00:09:40.080 framework for you such as the Express
00:09:42.160 team. So we can just use it instead of
00:09:44.800 building our entire new web framework.
00:09:47.760 Okay, so I hope that makes sense. This
00:09:49.600 is exactly what we are trying to do. So
00:09:52.000 now that we know what a web framework
00:09:54.000 is, let's talk about the API pretty
00:09:56.399 quickly and then we'll get started by
00:09:58.640 building it. Right now you will probably
00:10:00.800 already know this but let's try to
00:10:02.560 remember it pretty quickly. So API
00:10:05.120 stands for application programming
00:10:07.200 interface which sounds a little bit
00:10:09.040 complicated but in simple terms it
00:10:11.600 allows two different applications talk
00:10:14.160 to each other right and APIs are all
00:10:17.200 around us. So when you send a mobile
00:10:19.519 payment, basically you are using an API
00:10:22.240 behind the scenes without even
00:10:24.519 realizing. So let's see. Okay. So we
00:10:26.959 have a client, we have a front-end
00:10:29.279 application that could be either your
00:10:31.519 mobile app or your desktop app, your web
00:10:34.800 application, whatever that is, right? So
00:10:37.600 you simply have a front- end app that
00:10:40.320 would like to talk with a back end. So
00:10:42.720 let's say you would like to fetch some
00:10:44.560 data. You would like to get some data
00:10:46.720 and you have the API in middle which is
00:10:49.519 going to talk with the database. So at
00:10:52.240 the end of the day you you have two
00:10:54.320 different apps, right? One front end and
00:10:56.800 one back end and API allows both of them
00:11:00.800 to talk to each other, right? So I hope
00:11:03.440 that makes sense. Probably this is
00:11:05.440 something that you already know but it's
00:11:07.839 it's nice to go over it. And we have
00:11:10.240 bunch of different requests. So we will
00:11:12.880 be building a rest API. So we have get,
00:11:16.079 we have post which is something that you
00:11:19.440 would use when you need to create
00:11:21.279 something. In this case we will create
00:11:23.360 some transactions. Then we have delete
00:11:25.920 method where you would like to delete
00:11:28.000 some data as the name suggests. And then
00:11:30.640 we have the put method. You could use it
00:11:33.519 when you want to update some data in the
00:11:36.160 database.
00:11:37.560 Okay. So I hope all that makes sense.
00:11:40.240 Now let's get started with it under the
00:11:43.160 server.js file. Now if you have realized
00:11:46.480 every single time we change something we
00:11:48.880 need to kill the server and rerun this
00:11:51.200 again. This is really annoying. Instead
00:11:53.440 we could install a package. I'll say npm
00:11:57.079 install-d nodeman. So this is going to
00:12:00.000 be like dashd means development sorry uh
00:12:04.320 yeah development dependency right dev
00:12:06.800 dependency. So we installed nodebun. So
00:12:09.440 here now we can add a script. Let's say
00:12:12.160 dev delete this part. We will say you
00:12:15.680 are going to run the server.js
00:12:18.680 file but this time with nodemon. Now
00:12:22.880 let's see what that means. You can open
00:12:24.880 up your terminal. Let's clear this up.
00:12:27.839 I'll say mpm rundev. So this is going to
00:12:31.120 run it with nodeband which means it is
00:12:33.360 watching for changes whenever you change
00:12:36.000 something. So I'll say 1 2 3 save this
00:12:38.560 file. It is going to restart all over
00:12:41.079 again. So you don't really need to kill
00:12:43.360 this and restart again. I hope that
00:12:45.600 makes
00:12:47.240 sense. Now what I'd like to do is to
00:12:50.639 create myv file so that I can put my
00:12:54.079 port and my environment variables. So
00:12:56.720 here I'll say
00:12:58.360 501. Um to be able to use it we can say
00:13:02.760 process.env. Let's first console lock
00:13:04.880 it. I'll say
00:13:07.160 process.env.port. But now this will be
00:13:09.120 undefined. So I'll just say my
00:13:13.639 port. If you take a look at the
00:13:15.760 terminal, it'll be undefined by default.
00:13:18.240 To be able to get the value, you need to
00:13:20.560 use this package that we have installed
00:13:22.880 which is called env. So you would say
00:13:27.959 importv from the env package and then
00:13:31.680 you would call the config method. So
00:13:34.399 once you have done this, you can
00:13:35.920 actually get that value from the file.
00:13:38.800 Right now this is not really undefined.
00:13:41.120 If you change it and save this file,
00:13:43.680 it'll be
00:13:45.160 updated. Okay. Now let's go and put the
00:13:48.079 previous value. And here instead of
00:13:50.440 50,0001, I'd like to use my port here.
00:13:53.600 I'll say const
00:13:55.800 port, let's say process.v.port.
00:14:00.860 [Music]
00:14:02.399 In here, I'll just put the port
00:14:04.240 environment
00:14:05.639 variable. And let's say this is going to
00:14:08.160 be
00:14:11.260 [Music]
00:14:12.360 dynamic. Okay. And just in case if this
00:14:15.519 is undefined, we can fold this back with
00:14:19.399 50,01 just like this. But as you might
00:14:22.160 know already, the main usage of the env
00:14:24.800 file is for secrets, right? Let's say
00:14:27.680 you have your database connection URL,
00:14:30.079 which is something that we will have. So
00:14:32.160 you would like to put it right here.
00:14:34.000 Let's say database URL and then whatever
00:14:37.199 the value is. You don't really want to
00:14:39.440 put this database connection string to
00:14:42.160 your codebase. So you don't really want
00:14:44.480 to say something like connect database
00:14:47.600 and then put your connection string. So
00:14:49.839 whatever that is, you don't really want
00:14:51.760 to put it as a string. Instead, you
00:14:53.920 would like to get it from the
00:14:55.760 environment variables so that when you
00:14:58.000 push your code to GitHub, nobody can see
00:15:00.880 it. it is under yourv file and you don't
00:15:03.839 really push this code to GitHub, right?
00:15:06.399 This is only like this is locally placed
00:15:09.360 in your machine in your back backend
00:15:12.000 folder. Um, we'll just see this in
00:15:14.240 action. But for now, this is going to be
00:15:16.399 it for this section. Let's try to delete
00:15:19.120 this one from here. In the next section,
00:15:21.680 we are going to connect to our database.
00:15:24.320 And by the way, it's 700 a.m. in the
00:15:27.279 morning. I just got my coffee recording
00:15:29.600 this video. So you have no reason to be
00:15:32.440 unmotivated. With that, I'll see you in
00:15:34.639 the next
00:15:35.560 section. Okay. So this is where we left
00:15:38.399 in the previous section. We built the
00:15:40.560 server.js file and now we would like to
00:15:43.199 connect to our database which is going
00:15:45.519 to be a Postgress database that is
00:15:47.920 provided by Neon. You can find the link
00:15:50.320 in the description. We'll go ahead and
00:15:52.320 sign up. They have a free plan. So this
00:15:55.120 is exactly what we'll be doing. They are
00:15:57.519 the Postgress provider. they will give
00:15:59.759 us a free Postgress database that we can
00:16:03.360 use and it is already hosted on the
00:16:06.000 cloud. So we'll just get a connection
00:16:08.399 string that we can connect to it. And as
00:16:11.279 I said they have a really generous free
00:16:13.600 plan. We can get up to 10 projects
00:16:16.639 without paying anything. And if you
00:16:19.360 would like to scale your projects you
00:16:21.600 can obviously go with the paid plan.
00:16:25.199 Now, what I'll be doing is to go ahead
00:16:27.839 and log in. I already have an account.
00:16:30.880 So, I'll log in with my GitHub account
00:16:33.759 and let's create a new project. Now, I
00:16:36.480 am on the paid plan, but it's completely
00:16:38.639 fine if you're on the free plan. You
00:16:40.639 don't need to upgrade at all for this
00:16:43.120 project at least. Okay. So, I'll say
00:16:45.519 create a new project. We can call this
00:16:47.920 anything. I'll just say wallet or let's
00:16:50.720 say React Native wallet. I'll leave
00:16:53.600 everything as it is. I'll say
00:16:56.040 create and we can say connect to our
00:16:59.160 database. So we got the connection
00:17:01.440 string that I'd like to copy. Please
00:17:03.759 don't try to use mine because I'll
00:17:05.520 delete it once I publish this video. Um
00:17:08.559 I'll go ahead under the env file and
00:17:11.280 I'll say
00:17:12.760 database URL and paste this
00:17:15.959 in. Okay, just save this. Uh this should
00:17:19.199 be good to go. Now I will create a
00:17:21.880 config folder and under this we'll have
00:17:24.799 the db.js file. So this is the file
00:17:28.160 where we can connect to our database. Um
00:17:31.600 here I'll go ahead first import the neon
00:17:34.799 from the package that we have installed
00:17:36.799 in the first section. So it is this
00:17:39.840 package and we would like to get the env
00:17:43.200 as well. So I'll say
00:17:47.400 importv/config. So this is another way
00:17:49.520 of using it in the previous file. We
00:17:52.640 just imported that and then called the
00:17:54.480 config method. So this is the exact same
00:17:57.200 thing. Now they both have different
00:17:59.360 usages but in this case this this will
00:18:02.000 work as expected. And then we can create
00:18:04.559 a SQL connection using our environment
00:18:08.000 variable. So I'll say export const SQL.
00:18:11.679 And this is something that we'll be
00:18:13.200 using a lot. For now, just say call the
00:18:15.520 neon function with the
00:18:19.559 process.v
00:18:21.559 database URL. Okay, that should be it.
00:18:25.120 We'll be using this. And let me just add
00:18:27.440 a comment. So I'll say this will create
00:18:31.440 let's say creates. So this creates a SQL
00:18:34.400 connection using our database URL. And
00:18:36.960 this is a function that we'll be using
00:18:38.799 to be able to write some SQL queries
00:18:41.559 safely. Okay. So let's save. we'll go
00:18:44.160 into the server.js file and we can
00:18:46.640 import it. So before we start our app,
00:18:49.440 we can create a function. So I'll just
00:18:52.000 go right here. Maybe we can delete this
00:18:54.400 or maybe above that I'll say create an
00:18:58.240 async
00:18:59.480 function. Uh the name could be something
00:19:02.000 like init database, right? Initialize
00:19:04.640 the database. We don't really need to
00:19:06.480 get any parameters. So we'll just delete
00:19:08.640 that. And now let's have a try and catch
00:19:11.280 block. under the try we would like to
00:19:14.160 create a transactions table right we
00:19:17.120 will store things like the amount
00:19:19.520 category title so on and so forth so I
00:19:22.640 will say a wait because this will take a
00:19:25.039 little bit of time and let's import the
00:19:27.039 SQL just make sure to put JS at the end
00:19:30.559 now it is worth mentioning that in this
00:19:32.799 tutorial we'll not be using any RMS we
00:19:36.000 will just write some row SQL code so we
00:19:38.799 are not going to be using something like
00:19:40.400 Prisma or Drisel We'll just you we'll
00:19:43.039 just write some row SQL code and the
00:19:45.280 reason for this is that most of the
00:19:47.280 tutorials would use something like ORM
00:19:49.600 and I want this to be a little bit
00:19:51.120 different where we can use some row SQL
00:19:54.400 and just see how that work. Now it
00:19:56.960 doesn't really mean that ORMs are bad.
00:19:59.440 They're actually really convenient. In
00:20:01.520 my previous tutorials I have used Prisma
00:20:04.160 a lot u so you can check them out if you
00:20:06.640 are really interested. So this tutorial
00:20:09.039 will be a little bit more simple where
00:20:10.799 we can write some row SQL code as your
00:20:14.400 projects get larger. I wouldn't really
00:20:16.880 recommend this. So it it could be really
00:20:19.280 really hard but in this case it's going
00:20:21.840 to be really convenient for us and we
00:20:24.559 don't really need to you know go into
00:20:26.559 the steps to set up an RM like Drizzle
00:20:29.919 or Prisma. So I hope that makes sense
00:20:32.480 and it is worth mentioning that. So if
00:20:34.799 you have used something like MongoDB in
00:20:37.520 the past, it is a NoSQL database which
00:20:40.320 means you store the data under the
00:20:42.400 collections but in this case we'll be
00:20:45.120 using Postgress which is a SQL database
00:20:47.760 and instead of collections we have
00:20:49.679 tables. So basically we store the data
00:20:52.720 under the tables where we have rows and
00:20:56.159 columns right. So this is an example
00:20:58.799 screenshot that that I took. So this is
00:21:01.200 the products table and we have some
00:21:04.159 columns such as ID, name, price, so on
00:21:07.600 and so forth and then we have some rows
00:21:11.039 and every single row is a different
00:21:13.520 document, right? So this is a product,
00:21:16.559 this is another one, another one so on
00:21:18.880 and so forth. Okay, so I hope that makes
00:21:21.200 sense. I just wanted to mention this
00:21:23.280 before we get
00:21:25.320 started. Okay, so let's go into the
00:21:28.159 server.js JS file and get started with
00:21:30.480 our very first SQL code. So you would
00:21:33.600 like to open up these back takes. So
00:21:35.600 this is not quote. Okay. So they are
00:21:38.000 back takes and let's say something like
00:21:41.960 create all uppercase. We'll say create
00:21:45.440 table which is going to be
00:21:48.520 transactions. Now we'll take to create
00:21:50.799 this only if if it not exists already.
00:21:54.000 Right? So I'll say if not exists only
00:21:57.760 then create it. We don't really want to
00:21:59.840 create this again and again. Now here
00:22:02.240 I'll say every single transaction will
00:22:04.720 have an ID and this could be in the
00:22:07.520 serial as well as the primary key. I'll
00:22:10.640 say primary key. So that means uh we can
00:22:14.880 identify a transaction with their ids.
00:22:17.840 Okay. And then we can have a user ID.
00:22:20.640 That means every transaction will be
00:22:23.360 will be associated with a user right so
00:22:26.000 if you create a transaction I don't
00:22:28.240 really want to see it I only want to see
00:22:30.720 the transactions that are created by me
00:22:34.480 right so that's why we'll say user ID
00:22:37.280 and this is going to be type of string
00:22:39.360 we can say v char and we can put this
00:22:42.720 value and we'll say this cannot be null
00:22:45.919 and then we will have the title for
00:22:48.159 every single transaction it'll be
00:22:50.320 basically the same thing. So I would
00:22:52.000 like to copy it and paste it. We can
00:22:54.640 duplicate this. Now we'll have the
00:22:58.440 amount. So let's say this will be
00:23:00.880 amount. Instead of string, this could be
00:23:03.720 decimal and we'll say 10. Uh and then
00:23:07.760 we'll just put two next to it. Then we
00:23:10.159 can get the category. Uh I'll go ahead
00:23:12.880 and say every transaction will have a
00:23:15.520 category. This is going to be bar chart
00:23:18.240 as well, right? It'll be a string and we
00:23:21.039 can put this value. So at maximum it can
00:23:23.679 get this amount of characters and then
00:23:26.240 finally we can add a created at field
00:23:30.000 and let's say this will be type of date.
00:23:32.480 It cannot be null and then we'll say by
00:23:35.280 default it'll just take the current
00:23:37.760 date. So whenever you create a
00:23:39.919 transaction this field will be
00:23:42.080 automatically created and it'll be
00:23:44.640 whatever the current date is. Okay. And
00:23:48.000 then we can say something like console
00:23:50.320 log uh
00:23:52.039 database
00:23:53.720 initialized
00:23:56.840 successfully. And then in the catch of
00:23:59.200 course we can just say error
00:24:02.360 initializing
00:24:04.280 initializing database and we can put the
00:24:07.200 error message. So whatever that is and
00:24:09.919 then we can exit the process with
00:24:12.480 failure. So say exit the status code one
00:24:16.159 means failure right. So say status code
00:24:19.600 one
00:24:21.159 means failure and zero means success
00:24:25.360 since we are in the catch block it'll be
00:24:27.600 one which means failure right and then
00:24:30.400 we can now call this function because
00:24:32.880 this by itself doesn't do anything we
00:24:35.440 just created it but we need to call it
00:24:37.760 and I'll say first just cut this for a
00:24:40.480 split second and I'll say initialize the
00:24:42.720 database once it is done successfully
00:24:45.840 then just go ahead run this function
00:24:49.279 where we have like where we are
00:24:52.000 listening for the uh this application
00:24:54.880 right we are starting it only if the
00:24:57.440 database initialized okay let's save
00:25:00.240 open up the terminal looks like database
00:25:03.039 initialized successfully and let's see
00:25:05.679 this under the tables so just go ahead
00:25:08.880 click to the
00:25:10.600 tables and let's see if we are going to
00:25:13.120 get any tables looks like we got this is
00:25:15.760 called this is called as transaction
00:25:17.440 actions and we have all these fields. So
00:25:20.159 we have ID, user ID, title, everything
00:25:23.679 up until the created ad and we are able
00:25:26.880 to see the type for all of them. So uh
00:25:30.559 the serial for ID means is that it's
00:25:33.440 going to be incremented one by one. So
00:25:35.760 the very first document is going to be
00:25:38.480 ID of one and then two three so on.
00:25:42.080 Okay. Now let's try to create an error.
00:25:44.720 I'll go ahead under the env for my
00:25:47.760 password. So this is your password. This
00:25:49.840 is your username here. I'll just put a
00:25:52.559 character so that my password is wrong.
00:25:55.120 And let's save this. We're going to hit
00:25:57.200 the error case. And let's scroll to the
00:25:59.600 top. It says error initializing the
00:26:02.080 database, right? And the error is the
00:26:05.200 authentication failed basically. Okay.
00:26:08.159 So this is something I wanted to
00:26:09.760 mention. If you don't really put the
00:26:11.679 correct database URL, it's going to
00:26:13.840 fail. But if you put the correct one and
00:26:16.400 save your file, it should be good to go.
00:26:18.720 And just one more thing. So here I just
00:26:21.279 said decimal 10 and comma 2. Now what
00:26:24.640 does that mean? Let me just add a
00:26:26.159 comment and read it out loud. Let me
00:26:28.960 format this. Okay. So this basically
00:26:31.200 means a fixed point number with 10
00:26:34.400 digits in total and two digits after the
00:26:37.760 decimal point. So basically this means
00:26:40.240 that the maximum value it can store will
00:26:42.799 be this value. So we have eight at
00:26:45.679 maximum in the like before the decimal
00:26:48.559 and in total it is going to be 10 uh
00:26:51.840 digits right here we have 10 digits the
00:26:55.600 decimal point could be up to two and
00:26:58.640 then in total it is 10. So I hope that
00:27:01.360 makes sense. This is something that you
00:27:03.679 just you can keep in mind and just
00:27:06.159 before we end this section. So now that
00:27:08.320 we got our environment variables, let's
00:27:10.720 set up the clerk as well, which is the
00:27:13.279 authentication
00:27:14.880 uh the authentication service, the
00:27:16.720 authentication provider that we'll be
00:27:18.640 using. So I'll go ahead and visit. You
00:27:20.880 can find the link in the description. So
00:27:23.200 clerk will be our user management
00:27:25.440 platform and they have really cool
00:27:27.679 components that we can use without
00:27:29.840 really doing that much. So we can
00:27:32.480 basically add all kinds of
00:27:34.120 authentication options to our
00:27:36.400 application. And in our case, we'll be
00:27:38.720 using email and password. So just go
00:27:41.679 ahead create an account. I think I
00:27:43.919 already have. So I'd like to log in. Let
00:27:46.880 me just loging in with the Google
00:27:48.640 account that I have. And we can create
00:27:51.600 an application. So I'll say create the
00:27:53.919 app. Name could be something like React
00:27:58.039 Native Wallet or just wallet. It's not
00:28:01.520 really that important. And for the
00:28:03.760 options, you can add anything that you
00:28:05.679 wish. I'll just go with the email
00:28:07.840 password combination. Okay, let's say
00:28:10.559 create the app. And they have all kinds
00:28:13.919 of SDKs. We'll be using the Expo. But
00:28:17.279 for now, just go ahead get the
00:28:19.520 environment variable. In the incoming
00:28:21.840 sections, we'll go through these steps
00:28:24.960 under the mobile application, right
00:28:27.600 under the mobile folder. But for now,
00:28:30.159 I'd like to put the environment variable
00:28:32.720 right here. And this is something that
00:28:35.679 we'll use later in the video. Okay, so
00:28:38.720 with that, I think that's going to be it
00:28:40.320 for this section. I'll see you in the
00:28:42.000 next one. All right, so this is where we
00:28:44.640 left. Now, we would like to go ahead and
00:28:46.640 get started with the API. Right, so we
00:28:49.679 have this function where we initialize
00:28:51.440 the database and connect to it. But now
00:28:53.919 it is time to add our endpoints. So I'd
00:28:56.880 like to delete this one. Instead of get
00:28:59.039 request, let's say we'll have a post
00:29:01.600 method, right? a post request where we
00:29:04.159 can create a transaction. So the
00:29:07.360 endpoint is going to be /
00:29:09.720 API/
00:29:12.200 transactions where we'll get the request
00:29:14.880 and
00:29:15.880 response and we'll do something right
00:29:18.480 and that something will be creating
00:29:20.640 something in the database and
00:29:22.640 specifically creating a transaction in
00:29:24.960 the database. Now I will mark this as
00:29:27.520 async. And one more thing to mention
00:29:30.080 first we will do this in the most
00:29:32.240 beginnerfriendly way. Okay. So we'll put
00:29:34.799 everything under the server.js file.
00:29:37.279 Once you are done with it we'll go ahead
00:29:39.360 and optimize our codebase where we can
00:29:42.240 have a better file and folder structure.
00:29:45.360 For now I'll just keep it simple and
00:29:47.279 just put everything on this file and
00:29:49.360 then we will optimize it. Okay. So first
00:29:52.159 let's create the try and catch block. In
00:29:54.720 the try we can try to get the uh get the
00:29:58.960 fields that user wants to send. So if
00:30:02.000 user wants to create a transaction they
00:30:04.480 would like to send the title right they
00:30:07.039 would like to send the amount the
00:30:09.640 category as well as the user ID. So we
00:30:13.440 would like to get all these values and
00:30:16.320 we can get this from
00:30:18.200 request.body and we'll say basically
00:30:20.720 dstructure all these values. Let's say
00:30:23.440 title, amount,
00:30:26.679 category, as well as the user ID. Now,
00:30:30.640 we would like to get these values, but
00:30:33.600 we can only do so if we use this
00:30:35.840 middleware. So, let's say app do use and
00:30:39.360 just go ahead call the
00:30:42.679 express.json. So, this is what we call a
00:30:45.200 middleware. This is a built-in
00:30:47.120 middleware actually. Now, you might be
00:30:49.279 asking, what does that mean? This sounds
00:30:51.279 really complicated. I have never heard
00:30:53.200 of it. So let's try to see it pretty
00:30:55.480 quickly. I have some diagrams right
00:30:58.399 here. So middleware is just a function.
00:31:01.760 So nothing else. It is just a function
00:31:04.320 but it runs in the middle between the
00:31:06.720 request and response. So let's say you
00:31:09.279 send a request from the client from your
00:31:11.840 mobile application, web application,
00:31:14.320 whatever that is. You send a request,
00:31:17.840 right? And just before you get a
00:31:19.840 response back, they can do something in
00:31:22.159 middle. This could be an authentication
00:31:24.399 check. It could be some console log. It
00:31:27.120 can be anything. And let's try to
00:31:29.600 actually build our own simple
00:31:31.919 middleware, right? So uh like first I
00:31:36.159 will delete this, right? Comment this
00:31:38.080 out and I'll get the app.get. So you
00:31:41.519 don't have to follow along. I'm just
00:31:43.039 trying to show you this. So I'll say
00:31:45.760 we'll get the request and response and
00:31:48.000 just say something like
00:31:50.360 res.end it's
00:31:53.320 working. Just before we get this
00:31:55.600 response, we can put something on the
00:31:58.000 terminal. So I'll say use this
00:32:00.080 middleware. This is our custom simple
00:32:02.880 middleware. Okay. So we'll get the
00:32:04.880 request and response as well as what we
00:32:07.120 call the next function. So here I'll say
00:32:10.480 just console log. Hey, we hit an we hit
00:32:15.519 a request and here is the method. So say
00:32:20.000 the method is and we can put request
00:32:23.679 method next to it. Once we console log
00:32:26.640 this, we can call the next function. So
00:32:29.760 let me pretty quickly
00:32:31.559 explain. When we send a get request,
00:32:34.720 let's do it. I'll
00:32:36.360 save. So this will make sense just in a
00:32:38.880 second. Let's say localhost
00:32:41.720 501 when we send a get request just
00:32:44.799 before we get the response back we would
00:32:47.600 like to put a console log right once we
00:32:50.080 have the console log we are going to
00:32:51.679 call the next function which is this one
00:32:54.640 that is going to send the response right
00:32:57.679 so just before you send the response you
00:33:00.080 would like to do something which is this
00:33:02.240 console log here we can see so I'll just
00:33:04.720 refresh again we sent the request just
00:33:07.440 before we get the response Once we are
00:33:09.440 going to hit this console log which is
00:33:11.919 coming from our middleware. I'd like to
00:33:14.480 put this as a comment. Let's say our
00:33:17.039 custom simple middleware. And this is
00:33:20.480 exactly what is happening in this case
00:33:23.120 just before uh just before you send the
00:33:26.159 response you are basically accessing the
00:33:29.159 request.body. If you don't add this
00:33:31.840 middle layer these are going to be
00:33:35.240 undefined. So I hope all that makes
00:33:37.519 sense. This is something that you should
00:33:39.760 keep in mind. And once again, middleware
00:33:42.399 is really important when you want to
00:33:44.480 have an authentication check. So let's
00:33:46.640 say user sent a request, they would like
00:33:49.279 to create something, right? Let's say
00:33:51.360 you are on Instagram, they would like to
00:33:53.360 create a post. First you need to check
00:33:55.840 if they are authenticated or not. So you
00:33:58.159 would have your oath check right here
00:34:00.399 under under the middleware function. If
00:34:02.880 they are not authenticated, you'll say,
00:34:04.399 "Hey, sorry, you cannot create the
00:34:06.080 post." But if they're authenticated,
00:34:08.079 then they can create the post. So I hope
00:34:11.359 that makes sense. This is something that
00:34:13.040 you can keep in mind. And I'll delete
00:34:16.520 these
00:34:18.679 drawings. Okay. Now uh now that we got
00:34:22.239 all these values, we can just check if
00:34:24.320 they are provided or not. So we'll say
00:34:26.399 if there is no title or if there is no
00:34:30.159 user ID. And let's do the same thing for
00:34:32.239 the rest. Let's say no
00:34:34.359 category or let's say if there is no
00:34:37.280 amount but now this could be equal to
00:34:39.520 zero right maybe amount is zero so
00:34:42.000 instead of saying not we'll say if it is
00:34:44.320 equal to
00:34:45.879 undefined in this case we'll just say
00:34:48.960 throw an error right I'll say return out
00:34:51.520 of this function send a response back
00:34:54.719 with the status code of 400 which means
00:34:58.160 there is an error and I'll say JSON the
00:35:01.599 message could be something like all
00:35:04.839 fields are
00:35:08.200 required. Okay, now let's save and we
00:35:11.760 can get like move on with it. And under
00:35:14.320 the catch, I'd like to
00:35:17.079 say, you know, error in the let's say uh
00:35:22.960 I don't know, let's just say error
00:35:25.200 creating the
00:35:27.560 transaction and we can put the error
00:35:30.000 into the terminal and since we hit the
00:35:32.400 catch block probably it means that there
00:35:35.040 is an error on the server side. plus a
00:35:37.200 res status the status code will be 500
00:35:41.200 and let's say JSON we can say something
00:35:43.880 like internal
00:35:46.460 [Music]
00:35:51.720 error okay so we just got the message
00:35:54.480 itself and let's move on in the case
00:35:56.960 that we created successfully so here
00:35:59.520 I'll say await get the SQL function and
00:36:02.880 again some back tick we'll basically say
00:36:05.760 insert inert into let's say insert into
00:36:09.440 the transactions
00:36:11.560 table and we would like to add these
00:36:14.560 values right we would like to update the
00:36:16.640 user ID column we would like to update
00:36:19.040 the title let's say amount as well as
00:36:21.760 the category now we don't need to put
00:36:24.240 the created at it'll be added
00:36:26.200 automatically because here we said by
00:36:28.560 default just get the current
00:36:31.880 date okay so these are the fields But
00:36:35.760 let's say the values will be whatever
00:36:38.400 user passes right. So here I'll say just
00:36:41.680 get the user ID and just make sure that
00:36:45.599 it is in the same order that you have
00:36:47.520 here. So user ID, title, amount and
00:36:52.280 category. So I'll say title put a comma
00:36:55.520 and then let's say get the
00:36:58.359 amount and then the category
00:37:02.680 itself. Okay. So once we insert it, we
00:37:05.920 would like to assign this into a
00:37:07.680 variable called
00:37:09.480 transaction. And to be able to get this,
00:37:12.079 you need to say
00:37:13.350 [Music]
00:37:14.599 returning just return every single
00:37:17.040 field,
00:37:18.280 right? Every single column. And then we
00:37:21.040 can say res
00:37:23.340 [Music]
00:37:24.760 status 201 which means something
00:37:27.839 created. And then we'll say as the
00:37:30.560 response we'll say JSON transaction.
00:37:33.520 This will be an array. So we would like
00:37:35.119 to get the first value which is the
00:37:37.200 created transaction. So if you don't
00:37:39.359 know what I mean, let's put the
00:37:40.800 transaction into the terminal and now
00:37:43.599 test this out. So to be able to test
00:37:45.760 this out, I'll be using a desktop
00:37:48.000 application called Postman. So you can
00:37:50.640 install it or use something
00:37:53.560 else. This is the one that I'll be
00:37:55.680 using. You don't need to sign up. Just
00:37:57.920 go ahead click to this button where you
00:38:00.400 will create a new request. It'll be get
00:38:03.280 request to let's say
00:38:05.880 HTTP
00:38:07.720 localhost
00:38:09.320 50,01 and /
00:38:13.320 API/transactions and I think I just said
00:38:15.599 get request but it should be a post
00:38:17.920 request because we are trying to create
00:38:20.440 something. Um here I'll go ahead say
00:38:22.880 post request under the body just choose
00:38:26.960 row and JSON where you would like to add
00:38:29.599 all these fields. So for now for the
00:38:32.160 user ID I'll put something random. Later
00:38:34.800 in the video this is going to be coming
00:38:36.400 from clerk. So let's say user ID. Let's
00:38:39.280 add a
00:38:40.359 title. Uh let's say something like maybe
00:38:45.079 salary and the category could be
00:38:51.400 income. And what else do we have? I
00:38:54.240 think it is description. No, it's
00:38:57.400 amount. Okay. So let's say we'll have
00:38:59.839 the amount could be something like
00:39:02.200 2,000. I think it it's going to be a
00:39:05.440 number, right? So let's not wrap it with
00:39:07.680 the quotes. Okay, I'll just send the
00:39:10.680 request. Looks like it has been created.
00:39:13.119 We got 201. Let's take a look at the
00:39:16.760 database. So here under the dashboard,
00:39:19.920 I'll say refresh. We should have our
00:39:22.320 very first document. Okay, that means it
00:39:25.040 is working correctly. Now if we try to
00:39:27.680 create something else without passing
00:39:29.920 the amount. So I'll say send the request
00:39:32.880 it says all fields are required and this
00:39:35.680 this would be the case if we don't add
00:39:37.760 any of these fields. Okay. Now let's
00:39:40.560 bring this back and once again let's
00:39:42.800 just try to pro this. If I don't add
00:39:45.280 this middleware these values will be
00:39:47.920 equal to undefined. Okay. So let's test
00:39:50.800 this
00:39:51.720 out. Okay. So it says internal error.
00:39:55.200 Let's see why this is the case because
00:39:57.440 it says we cannot read these values,
00:40:00.079 right? It says that title from the
00:40:02.480 request body is undefined. This is the
00:40:05.119 first thing that we have. So it cannot
00:40:06.960 destructure that. So let's say Ctrl Z
00:40:09.920 bring this back. Save. Now it should be
00:40:12.320 working out as expected. And when we
00:40:14.960 create something, so we put the console
00:40:17.359 log which is this one. Let me scroll to
00:40:21.040 the bottom. Okay. So it is this
00:40:23.119 transaction that we have. I said that
00:40:25.280 this will be an array. We would like to
00:40:27.040 get the first value. So this is exactly
00:40:29.920 the case. We have the array. The first
00:40:32.400 object is the created transaction. Okay.
00:40:37.119 So this was the income. Now we can
00:40:39.280 create an expense. So let's say category
00:40:42.560 could be something like expenses
00:40:46.079 uh or expense maybe. For the title let's
00:40:48.800 say
00:40:51.400 groceries. User ID could be the same.
00:40:54.160 amount let's say will be
00:40:57.079 200. Um sorry if it is an expense it's
00:40:59.920 going to be negative right? So just put
00:41:02.000 minus at the beginning. Uh just send the
00:41:04.440 request. Let's take a look at the
00:41:06.480 database. I'd like to refresh
00:41:16.200 this. Okay. So we got that as well. Same
00:41:19.119 user different amount and it is expense.
00:41:22.720 Okay. So that's it for this section
00:41:24.480 where we can create a transaction. In
00:41:26.880 the next section, maybe we can add the
00:41:29.040 get request where we can fetch a
00:41:31.119 transaction by the user ID. So I'll see
00:41:34.079 you in the next section. All right. So
00:41:36.400 this is where we left. Now I'd like to
00:41:38.400 add a get request where we can fetch the
00:41:40.960 transactions by a user ID. Just before
00:41:43.920 we do so, I will create one more
00:41:45.839 transaction. So here I'll say user ID
00:41:48.400 will be something else, right? and
00:41:51.520 category could be expense. Let's say
00:41:53.440 this will be minus 500 and let's say
00:41:56.240 something like AirPods. Okay, I'll just
00:41:59.520 say send. Um I just change the user ID
00:42:02.480 because I'll show you something in this
00:42:04.400 section. Okay, now let's get started
00:42:06.560 with the get request. I'll say app.get
00:42:09.680 and maybe I'll just put it before the
00:42:11.520 post request like absolutely not
00:42:14.240 important but this is what I'd like to
00:42:16.079 do so that I have my get request at the
00:42:18.480 very top again. absolutely not really
00:42:21.200 needed. Let's say API
00:42:25.640 transactions transactions we will fetch
00:42:28.720 the transactions by the user ID. Right?
00:42:31.440 So here I'll say whatever the user ID
00:42:34.319 we'll say uh colon this will be dynamic
00:42:36.960 that's why we put colon and then we can
00:42:39.280 put user
00:42:41.560 ID. Now what does that mean? So we will
00:42:44.720 say create a new request that will be
00:42:47.920 get let's say localhost API transactions
00:42:51.280 but only fetch the transactions of this
00:42:54.000 user let's say which has the ID of 45
00:42:57.359 right so this value will be dynamic it
00:43:00.079 could be 1 2 3 or whatever the user ID
00:43:02.960 is so that's why we say you know colon
00:43:06.960 user ID and again we'll have the async
00:43:09.920 function get the request and response
00:43:13.040 and then Right here we'll have the try
00:43:15.280 and catch block. So let me kill the left
00:43:17.680 hand side and handle the catch.
00:43:19.560 Initially I will copy this basically and
00:43:23.520 paste this in. I'll say error uh getting
00:43:27.680 the
00:43:29.240 transactions and then internal error.
00:43:32.160 Now under the try first we would like to
00:43:34.720 get the user ID from the URL right? So
00:43:38.720 you can say request.ps pram and then you
00:43:41.599 can dstructure this value. So I'll say
00:43:44.160 user ID. If you call this as something
00:43:47.040 like you know X or hello that would be X
00:43:50.240 as well right? So whatever you have here
00:43:52.800 it should be the exact same thing. And
00:43:54.880 let's try to console log it. I'll say
00:43:57.440 user ID. Save and try to send a
00:44:02.119 request. Now it'll just pend right. It
00:44:05.359 is pending because we don't really send
00:44:07.200 a response back. That's fine. Let's just
00:44:09.440 scroll to the top. This is the URL.
00:44:11.839 Sorry. This is the user ID that we got
00:44:13.680 from the pars. So if you put something
00:44:16.599 different let's say cancel send it
00:44:19.720 again. This is going to be that
00:44:22.359 value. Okay. But now let's try to
00:44:25.280 actually do something instead of console
00:44:27.520 logging it. I would like to say await
00:44:30.560 SQL and add the back tick. So I will say
00:44:35.319 select everything right every column
00:44:38.400 from the transactions
00:44:41.480 table where the user ID is matching with
00:44:46.200 the with the URL right whatever user
00:44:49.280 sends so I'll say user ID is equal to
00:44:51.920 this
00:44:54.440 value and we can say order this I'll say
00:44:58.160 order by the create that field right
00:45:02.319 create that date and we can say in the
00:45:05.200 descending order. This is something
00:45:07.280 optional. You don't have to put it but
00:45:09.040 I'll have it. And then let's say
00:45:11.359 whatever you return we can uh assign
00:45:14.240 this into a variable called transactions
00:45:17.280 that is going to be an array as you can
00:45:19.520 tell type of array and we can say res
00:45:24.760 status of
00:45:27.400 200 and then JSON is going to be what
00:45:30.800 whatever the transactions are right okay
00:45:33.599 let's save and give it a go. So I'll put
00:45:36.560 1 2 3 or let's put an ID that doesn't
00:45:39.680 exist in the database. So I'll say send.
00:45:42.240 This should be an empty array. But we
00:45:44.400 have two different transactions with
00:45:46.480 this ID. So we're going to get both of
00:45:49.440 them, right? And we have one transaction
00:45:53.119 with this user ID. So we're going to get
00:45:56.240 that. Okay. So I hope that makes sense.
00:45:58.640 Depending on the ID, you are going to
00:46:00.480 get the transactions. And if we don't
00:46:02.560 have that kind of ID, so we don't have
00:46:05.280 this ID in the database. So we'll get an
00:46:07.599 empty array. So let's put the correct
00:46:10.680 ID. Okay. So it is working as expected.
00:46:13.599 Now I'd like to add one more route. So
00:46:16.720 this section was really short. Let's try
00:46:18.880 to add one more endpoint. I'll say
00:46:21.560 app.de where we'd like to basically
00:46:23.839 delete a transaction by the transaction
00:46:26.640 ID. Right? So I'll say it'll be SL
00:46:31.079 API/transactions and to be able to check
00:46:33.920 which transaction that we would like to
00:46:35.680 delete we can get the ID and again we'll
00:46:38.640 say request and response let's say it'll
00:46:40.800 be
00:46:42.260 [Music]
00:46:43.800 async and then here we'll have the try
00:46:46.560 and catch block just like previously
00:46:49.200 I'll get the
00:46:51.400 catch and then paste this in let's say
00:46:54.319 error deleting the transaction
00:46:57.359 And then in the try we can first get the
00:46:59.839 ID. I'll say grab the ID from the
00:47:05.079 URL. So from the pmps and then we'll say
00:47:08.720 await SQL here we would like to delete
00:47:12.560 something. So I'll say delete from the
00:47:15.040 transactions table where the ID is
00:47:19.440 matching with the ID we have in the URL.
00:47:22.640 And we would like to get the all the
00:47:25.119 fields. So I'll say returning asterisk
00:47:27.760 basically everything so that we can
00:47:30.000 assign this to a variable. So I'll say
00:47:32.720 transaction or I'll just say result and
00:47:35.680 here I'll say if
00:47:38.760 resultlength is equal to zero that means
00:47:41.760 we couldn't delete anything we couldn't
00:47:43.760 find it. So here I'll say return the res
00:47:47.599 status of 404 which means not found. And
00:47:50.960 let's say JSON this is going to be
00:47:54.319 message of something like transaction
00:47:57.440 not
00:47:58.150 [Music]
00:48:00.440 found but in the else case that means we
00:48:03.200 could delete it successfully. So I'll
00:48:04.960 say resa status of 200 which means
00:48:08.720 success. um we'll say JSON and our
00:48:12.240 message could be something
00:48:13.960 like deleted successfully right I'll say
00:48:18.350 [Music]
00:48:19.480 transaction deleted successfully so
00:48:23.040 first let's try to create an error here
00:48:26.480 I'd like to delete that I'll say add one
00:48:29.200 more request and we can close these by
00:48:31.760 the way let's say delete method to API
00:48:35.240 transactions let's put an ID that
00:48:37.520 doesn't really exist I'll say send a
00:48:39.760 request
00:48:42.200 uh why did we got an error let's
00:48:45.559 see it is delete method to API
00:48:49.200 transactions it should be so here error
00:48:53.200 message basically said we cannot find it
00:48:55.760 that's why I thought do we have a typo
00:48:58.400 right that was my thought process I just
00:49:00.960 wanted to mention that now let's send
00:49:02.960 the request so here it says internal
00:49:06.319 error do we have any typos
00:49:09.880 or so invalid input syntax. Okay, so
00:49:14.240 since ID should be uh type of number,
00:49:18.000 this is going to crash. Let's put a
00:49:20.640 number that we don't really have like
00:49:22.359 999. We don't have this in the database.
00:49:25.839 So here it says transaction not found.
00:49:28.319 But if we try to delete a transaction
00:49:30.400 that we already have such as ID of two,
00:49:34.000 which is the groceries. So let's try to
00:49:36.480 delete that one.
00:49:39.359 Okay, it has been deleted successfully.
00:49:41.440 Let's double
00:49:43.640 check. Okay. And of course, we had we
00:49:46.800 had the AirPods. So, I forgot to
00:49:48.880 refresh. But looks like it has been
00:49:50.640 deleted. Let's try to delete this one as
00:49:52.720 well, which is the ID of
00:49:56.440 three. And let's
00:49:58.520 refresh. Okay, it's gone. That means it
00:50:01.280 is working correctly. Now, what's up
00:50:04.079 with this error? when you have the
00:50:06.160 string, right? When you don't have the
00:50:08.960 number on the URL, our server crashes.
00:50:12.480 Let's try to fix
00:50:14.119 it. So, what we can do is basically
00:50:17.920 first let's just say console log and I'd
00:50:20.000 like to walk you through it like my
00:50:21.839 thought process. So, first I'll say type
00:50:24.800 of ID and just put this in the terminal.
00:50:29.760 So, here I'll just send a request. Oops.
00:50:32.720 Let's open this up. center
00:50:35.960 request type should be string, right?
00:50:39.280 And if we put number, I think it should
00:50:41.680 still be string because whatever you put
00:50:44.559 in the URL, it'll be string. So, I'll
00:50:46.480 put five, maybe
00:50:48.920 55. Now, it says transaction not
00:50:52.119 found, but it doesn't fail, right? And
00:50:56.319 by the way, if you have realized, even
00:50:58.400 though we put like 55, type is still
00:51:02.160 string. This is not the case like this
00:51:04.319 is not the problem. The problem is
00:51:06.400 happening here. When you put the DSA
00:51:09.200 which is coming from the URL, this is
00:51:11.280 going to crash. So what we would like to
00:51:13.280 do before we call this before we call
00:51:16.160 this query, we can just add an if check.
00:51:19.599 So just before the result, I'll go ahead
00:51:21.760 to delete the console log and I'll say
00:51:23.960 if let's say if it is not a number,
00:51:26.880 right? So I'll say if id is not a
00:51:29.040 number, but this is string. So let's try
00:51:31.599 to convert it to uh convert it to the
00:51:35.280 number right to the integer. So I'll say
00:51:37.520 parse int. So once it is not a number we
00:51:41.359 would like to say
00:51:43.480 return rest dot status and do I have a
00:51:46.800 typo by the way. Um maybe we should have
00:51:50.800 one more parenthesis. Okay. So I'll say
00:51:53.200 res status of 400 and I'll say JSON. We
00:51:58.079 could say something like invalid
00:51:59.920 transaction ID, right? Or maybe not
00:52:02.800 found. In this case, I'll just say
00:52:04.800 invalid
00:52:10.119 ID. Okay, let's try to give it a go.
00:52:13.200 I'll put a string in the URL. Okay, it
00:52:16.880 says invalid transaction ID. This time
00:52:19.520 our server did not crash because we
00:52:22.079 didn't really hit this query, right? So,
00:52:24.640 this did not crash the server. First we
00:52:27.599 hit the if check where it is not a
00:52:29.680 number. We got this message with the
00:52:32.160 status. Okay. So I hope that makes
00:52:34.240 sense. That's going to be for the delete
00:52:36.400 method. In the next section we are going
00:52:38.480 to build one more uh one more endpoint
00:52:41.599 and then I think it should be good to
00:52:43.280 go. So I'll see you in the next section.
00:52:46.000 Okay. So this is where we left. So far
00:52:48.400 we have built three different endpoints
00:52:50.559 where we can get the transactions,
00:52:53.119 create one and delete one. So these are
00:52:55.839 the things that will be calling from the
00:52:58.480 homepage as well as the create page. So
00:53:00.880 we can create an expense or income. We
00:53:03.760 can fetch them and we can delete them.
00:53:06.400 But now we are missing one thing that is
00:53:08.880 to get the summary. Right? So we would
00:53:11.680 like to get the total balance, the
00:53:13.920 income as well as the expenses that we
00:53:16.160 have. So let's try to build that
00:53:18.280 endpoint here. I'll go under the
00:53:20.640 server.js JS file and I'll add a get
00:53:23.119 request at the very bottom. So I'll say
00:53:26.599 app.get and it'll be
00:53:32.359 /appi/transactions. Let's say it'll be
00:53:34.400 slash summary and then the user ID so
00:53:38.160 that we know which user summary that we
00:53:40.559 get right here. I'll say it'll be an
00:53:43.599 async
00:53:45.079 function. Get the request and response.
00:53:48.000 And let me shrink the left hand side.
00:53:50.160 Okay. Okay, so we're going to call this
00:53:52.720 uh controller function. Let's have the
00:53:54.880 try and catch. I'd like to get our catch
00:53:57.920 as
00:54:01.079 always. Let's say error getting the
00:54:05.590 [Music]
00:54:06.839 summary and then the internal error. So
00:54:09.839 whatever that is first, I'd like to get
00:54:12.319 the user ID from the
00:54:15.559 request.prams and then we'll get three
00:54:18.000 different results. So as I said the
00:54:20.319 balance the income as well as the
00:54:22.200 expenses. So first uh let's get started
00:54:24.960 with the balance. I'll say balance
00:54:26.960 result and we'll say a rate call the SQL
00:54:30.240 function with this query. Oops. Let's
00:54:32.880 say double back and then within this
00:54:35.440 I'll say select. Now we'll use something
00:54:37.920 different called class. Uh let's
00:54:41.400 say I think this is how we type it. Um
00:54:44.880 all right. So here we'll put two
00:54:46.960 different values. The first one will be
00:54:49.359 the sum the total of amount and let's
00:54:52.480 make this to be all uppercase. We're
00:54:54.960 going to sum the amount. But now if this
00:54:57.280 is undefined, we would like to get the
00:54:59.680 zero value, right? So just think about
00:55:02.720 it. You just signed up. You don't have
00:55:04.800 any transactions in the database. This
00:55:07.520 is going to be equal to undefined,
00:55:09.440 right? In this case, you would like to
00:55:11.200 get the zero as the fallback value. So
00:55:14.640 this is exactly what we are doing. And
00:55:16.800 then we'll say call this as balance. You
00:55:19.599 can call this anything like like hello
00:55:21.760 as well. But of course it should be
00:55:23.680 something makes sense such as balance.
00:55:26.079 We'll say select those from the
00:55:28.079 transactions table
00:55:30.680 where the user ID is equal to this value
00:55:34.559 that we have. So if you think about it,
00:55:36.800 this feels like an English sentence,
00:55:39.040 right? So we have either the total
00:55:41.200 amount if it is undefined, we'll get the
00:55:43.680 zero. Let's call this as balance and
00:55:46.640 select everything from the transactions
00:55:49.359 where the user ID is matching with this
00:55:52.480 one. Okay. So this is the total balance
00:55:55.520 and then I'd like to do the same thing
00:55:57.359 for the income. I'll say income result
00:56:01.359 and then let's
00:56:02.599 say
00:56:05.000 SQL and call the function. Okay. So one
00:56:09.040 thing I'd like to mention now income is
00:56:11.680 plus right it is positive and
00:56:14.599 expenses are negative. So we will say if
00:56:18.160 amount is greater than zero it means it
00:56:21.040 is an income and if it is an expense
00:56:23.599 amount is less than zero right. So just
00:56:26.559 keep this in mind because we'll be using
00:56:28.319 it here. I'll say select once again I'll
00:56:32.240 get the exact same thing because it
00:56:34.559 could be undefined. We would like to get
00:56:36.400 the zero value in that case. And you can
00:56:39.119 format this if you really wanted to.
00:56:41.200 Then we'll say call this as income and
00:56:43.920 let's say from transactions put the
00:56:46.960 table name. You can go to the next line
00:56:49.200 and then we'll say where the user ID is
00:56:52.400 equal to this value. Again I'm too lazy
00:56:55.440 to type this out. So I'll go ahead copy
00:56:57.440 and paste. But one more thing we'll say
00:56:59.920 and the amount is greater than zero.
00:57:03.599 Okay, that means this is our income
00:57:05.440 result. I'd like to duplicate
00:57:08.680 this. I
00:57:10.760 think I'll just give a space and I'll
00:57:13.440 say
00:57:15.710 [Music]
00:57:17.240 expenses. Okay. So, I'll say amount
00:57:19.599 zero. Let's call this as expenses from
00:57:22.960 the transactions. Everything will be the
00:57:25.200 same but amount will be less than zero.
00:57:28.240 If this is the case, these are going to
00:57:30.240 be our expenses. And now we can
00:57:32.559 basically say res
00:57:35.319 status of 200 and then put the
00:57:39.319 JSON here. I'll put three different
00:57:41.760 values. The
00:57:43.559 balance, let's say it'll be balance
00:57:46.000 result. This is going to be an array.
00:57:47.920 Let's get the first value and then
00:57:49.960 balance. So here if you said balance 1 2
00:57:53.200 3 here you need to say 1 2 3 as well.
00:57:56.640 Okay. So this is whatever you put right
00:57:58.559 here in all these fields. Let's
00:58:01.760 duplicate this. This is going to be
00:58:03.760 income and we'll say income result do
00:58:08.119 income. Duplicate that. This is going to
00:58:10.640 be
00:58:12.520 expense or even expenses. This is how I
00:58:15.839 called it. Let's say expenses result.
00:58:19.440 And then here we could say
00:58:23.960 expenses. Okay. Let's save and give it a
00:58:26.640 go. We have Let's take a look at the
00:58:29.680 database. I think we only have one
00:58:31.920 transaction. So, let's try to create
00:58:34.400 another one. I'll go find the post
00:58:37.160 method. Get the body. So, these are all
00:58:40.559 the fields. I would like to add
00:58:42.079 something like I don't know, let's say
00:58:44.920 freelance work. It is also an income.
00:58:47.680 Let's say it is 1,000.
00:58:50.400 So for the same user and let's add an
00:58:54.440 expense here I'd like to call this as I
00:58:57.839 don't know let's say minus 1,500 uh
00:59:01.520 let's say
00:59:04.200 rent okay send the request now we would
00:59:06.960 like to get the summary here I will
00:59:10.079 create one more
00:59:12.119 request API transactions it was summary
00:59:16.480 and then the user ID so that it'll be 1
00:59:18.880 2
00:59:20.040 three sent the request. Okay, so this is
00:59:22.880 the total balance, the income and the
00:59:25.680 expenses, right? So in total we have
00:59:28.720 3,000 income. Let's double
00:59:31.480 check. So 2,00 1,000 it is three in
00:59:35.520 total and then minus 1,500 which makes
00:59:39.359 our balance to be 1,500 as well. So
00:59:42.880 again how that work is completely
00:59:45.599 depending on the amount field. So if it
00:59:48.160 is greater than zero, it's going to get
00:59:50.400 it as an income and if it is less than
00:59:52.400 zero, it'll get it as an expense and
00:59:54.799 then depending on that we will get this
00:59:56.799 output. Okay, so I hope that makes
00:59:58.960 sense. Now that's going to be it for the
01:00:00.799 section where we build the transaction
01:00:03.359 summary endpoint depending on the user
01:00:05.760 ID and these are all the endpoints that
01:00:08.400 we're going to have. We are not going to
01:00:10.079 add anything else but there is one
01:00:12.240 concept that I'd like to talk about
01:00:14.480 which is called rate limiting. It is
01:00:16.880 something that you should definitely
01:00:18.319 know as a beginner. I think it'll just
01:00:20.319 make a huge difference and I'd like to
01:00:22.640 talk about it in the next section. So
01:00:24.880 I'll see you there. So we are going to
01:00:27.520 talk about something called rate
01:00:29.200 limiting. But before we do so, let's try
01:00:31.440 to see the problem that we have in the
01:00:33.359 first place. So why do we need rate
01:00:35.599 limiting? So imagine this. You have a
01:00:38.240 really toxic user, right? So all he
01:00:40.880 wants to do just break your application.
01:00:43.680 They visit homepage and non-stop they
01:00:46.000 refresh this page. So they are sending
01:00:48.319 constantly requests, right? Or they go
01:00:51.119 into the create page constantly they are
01:00:53.599 just creating something. So it is as if
01:00:56.559 they are like spamming nonstop, right?
01:00:59.440 At some point your server might crash
01:01:02.400 and imagine bunch of different users
01:01:04.960 doing this. So your server is definitely
01:01:07.839 will be overloaded, right? it'll be
01:01:10.280 overwhelmed. And this is where rate
01:01:12.400 limiting comes into play. Let's read it
01:01:14.640 out loud and we'll see the example. So
01:01:17.040 rate limiting is a way to control how
01:01:19.280 often someone can do something on a
01:01:21.359 website or on the application like how
01:01:24.000 many times they can refresh a page, make
01:01:26.559 a request to an API or try to login. And
01:01:30.880 like we can put some limits like only
01:01:34.000 100 requests per user every 15 minutes,
01:01:37.680 right? So they can send only 100
01:01:40.280 requests per user and every 15 minutes.
01:01:44.799 If you wanted to, you can increment it,
01:01:46.640 decrement it depending on your use case.
01:01:49.440 And here is how it'll work. Just before
01:01:52.000 our API right in front of it, we will
01:01:54.799 put the rate limiter so that we can uh
01:01:58.680 basically control the amount of requests
01:02:01.520 that we process. So here let's say we're
01:02:04.640 going to get first 100 requests. So they
01:02:08.079 all will be responded successfully. But
01:02:10.720 then for the 101 right 101st request
01:02:15.680 it's going to be cancelled. We'll say
01:02:17.839 something like you send too many
01:02:19.839 requests please try again later. And the
01:02:23.200 status code for this is 429 which means
01:02:26.799 too many requests. And here also I have
01:02:29.440 some notes where the rate limiting helps
01:02:32.000 with preventing the abuse and you know
01:02:35.119 protecting your servers from getting
01:02:37.839 overwhelmed right
01:02:40.359 overloaded. Okay. So these this is
01:02:42.880 basically what rate limiting is and can
01:02:45.839 you can you tell where can we implement
01:02:48.079 it? So just in front of your API right
01:02:51.119 just before you send a response back
01:02:53.760 which is going to be as a middleware
01:02:57.040 right. So we are going to get their
01:02:58.720 request. We will check if they should be
01:03:01.119 rate limited or not. So this is a
01:03:03.280 perfect use case for a middleware as
01:03:05.440 well. Right? So we'll put the middleware
01:03:07.920 as our rate limiter and then we will
01:03:10.640 send a response back depending on
01:03:13.040 depending on the status. Right? Either
01:03:15.599 success or it'll be failed. And we can
01:03:18.799 implement this by using a radius
01:03:21.119 database as well as a rate limiting
01:03:23.599 package. And these are going to be
01:03:25.839 provided by Upstash. So you can find the
01:03:28.640 link in the description. Again, they
01:03:30.640 have a free plan that we can use. I'll
01:03:32.880 go ahead and visit. So here we can see
01:03:35.280 there are a bunch of different products.
01:03:37.440 We'll be using the Reddus with the rate
01:03:39.559 limiting. So I already have an account.
01:03:42.480 I'll just go ahead and log in. And I'd
01:03:45.119 like to create a Reddis
01:03:47.400 database. Um let's give it a name like
01:03:50.319 wallet or let's say React Native wallet.
01:03:54.160 the region. I'll select the one that is
01:03:56.400 closest to me. You can choose any of
01:03:58.799 these. And I'll leave everything as it
01:04:00.880 is. I am on the free plan just like you.
01:04:03.280 I didn't pay anything. Let's say next.
01:04:06.319 Create it. And we'll get some
01:04:08.480 environment variables. Let's scroll down
01:04:11.039 a little bit. It's going to be the
01:04:12.880 up-ash radius. Let me zoom in. So, it'll
01:04:16.240 be up stradd URL. Let's copy it. Visit
01:04:20.079 the env file. paste this in and then
01:04:25.119 we'll get the actual value. So, copy
01:04:28.520 this. Paste this in and then do the same
01:04:31.839 thing for the pressed
01:04:41.319 token. Let's say equal to to this value.
01:04:45.039 Now, we'll be using them and maybe we
01:04:47.520 can optimize our codebase a little bit.
01:04:50.720 uh we will absolutely optimize this
01:04:53.119 entire file. So we will actually extract
01:04:56.160 these you know functions to these routes
01:04:58.720 to different folders maybe in the next
01:05:00.880 section. Okay. So I'll just dedicate an
01:05:02.880 entire section for the code
01:05:05.720 organization. But for now let's say
01:05:08.799 create the middleware folder and we will
01:05:11.680 add the
01:05:13.559 rate
01:05:15.319 limiter.js file. So this is the
01:05:18.480 middleware we'll go in and then config
01:05:21.839 here. Let's try to configure the upst.
01:05:24.559 So I'll say upstach.js. So here we'll
01:05:27.280 just create an instance and it'll be
01:05:30.240 looking like this. So it'll be coming
01:05:31.920 from the database. Actually I'd like to
01:05:34.160 copy this and paste this in. So here
01:05:37.920 instead of putting the URL and token as
01:05:40.640 these values we can grab them from the
01:05:43.119 env file. So I will actually delete
01:05:45.520 those and I'll say the radius instance
01:05:49.039 will be created depending on our env
01:05:52.480 file. So I'll say radius from
01:05:55.960 env method and then we can put the
01:05:58.880 limiter itself. So I'll say call the
01:06:01.839 rate limit and I think we haven't
01:06:04.640 installed this package as well as the
01:06:06.880 rate limit. So let's type this out and
01:06:09.039 we'll install it. I'll say import the
01:06:11.280 rate
01:06:12.760 limit from let's say at upstach. So
01:06:17.440 upstach / rate limit. Go ahead save this
01:06:20.960 file and we can delete those because we
01:06:23.200 don't really want to like this is for
01:06:25.039 testing purposes. They have in the
01:06:26.880 documentation like we can give it a go
01:06:28.960 but for now let's try to install these
01:06:31.440 packages. I'll kill the back end. Clear
01:06:34.079 the terminal and in windows you can say
01:06:36.400 cls to clear the terminal. in wind in
01:06:39.440 Mac it is either clear or command K.
01:06:42.960 Okay, so that was something that I
01:06:44.720 wanted to mention. Now let's say npm
01:06:46.720 install at stash / Reddus and let's do
01:06:51.280 the same thing for the rate limit also I
01:06:53.520 would like to put some specific
01:06:54.960 versions. So I'll say
01:06:59.160 1.34.9 and then for the rate limit. So
01:07:02.960 for the rate limit first let me kill the
01:07:05.200 left hand side so that we can see it
01:07:06.880 clearly. It'll be
01:07:10.039 2.0.5. Okay, just go ahead and install
01:07:15.160 them. So, it's been installed. Now, we
01:07:17.839 can kill the
01:07:20.480 uh actually let's start it. Not kill
01:07:23.039 let's say mcam rundev. It is started. We
01:07:26.000 can delete those. We don't really need
01:07:28.720 it. This is just for testing purposes
01:07:30.880 just to check if it is working or not.
01:07:33.119 But instead of doing this, we would like
01:07:35.039 to uh configure the rate limit. So here
01:07:38.559 we can use the sliding window. So this
01:07:42.160 is a algorithm that we can use. And then
01:07:45.280 we'll say something like 100 requests
01:07:48.559 per minute, right? We can say 60
01:07:51.039 seconds. This is how many requests that
01:07:53.599 we can handle. And you could definitely
01:07:55.760 update these if you really wanted to. So
01:07:57.920 you can go a little bit more extreme
01:08:00.160 like only one request per 10 seconds but
01:08:03.760 in this case your application would be
01:08:05.760 unusable right you can go with like 100
01:08:09.280 per 30 seconds 60 seconds however you
01:08:12.640 wanted to right so you can even check uh
01:08:15.760 a quick research what are the best
01:08:17.839 values all right so I think we have some
01:08:20.880 uh typos in our code this should be rate
01:08:23.679 limit all lowercased after the r um I'll
01:08:27.198 go ahead head update this one as well.
01:08:29.040 So I think that's why we couldn't get
01:08:30.719 the auto completions right now. We can
01:08:33.439 get that and then this is not going to
01:08:35.198 be right. So let's say it'll be new rate
01:08:38.158 limit instance just like
01:08:41.319 this rate limit and let's say rate
01:08:45.080 limiter and I'd like to basically delete
01:08:48.000 those. I'll say export default this rate
01:08:51.759 limiter instance. We'll be using it in a
01:08:54.479 in a second. Now to be able to get the
01:08:57.600 environment variables, we need to import
01:09:00.238 the
01:09:01.950 [Music]
01:09:03.080 env. Let's call the config module. So
01:09:06.560 that's the entire configuration. I just
01:09:08.479 went pretty slowly, but in total it's
01:09:11.359 only eight lines of code. That's all you
01:09:13.839 need with the spaces. It is 11 lines of
01:09:16.640 code. Okay. So that's it for the
01:09:18.880 upstigation.
01:09:20.560 We'll be using this rate limiter to
01:09:22.479 check if user can successfully send
01:09:25.040 their request or should like should they
01:09:27.679 be rate limited and this is where this
01:09:30.158 file comes into play. I'll say import
01:09:32.319 the rate limiter that we have and just
01:09:34.719 make sure to put the extension at the
01:09:36.719 end since we are using type of module
01:09:40.080 right you have to put the extension at
01:09:43.120 the end for the local imports okay I'll
01:09:46.880 create a function let's say con rate
01:09:50.080 limit or rate limiter however you would
01:09:52.880 like to call it maybe we can call this
01:09:54.880 as rate limit so this will be the
01:09:58.000 instance for rate limit the name is not
01:10:00.400 really important But I think this looks
01:10:02.320 a little bit more cleaner so that we can
01:10:04.560 have the right limiter as our
01:10:06.400 middleware. Right? So I'll say this is
01:10:08.239 the async function where we would like
01:10:10.239 to get the request response as well as
01:10:13.280 the next function. Since this is a
01:10:15.760 middleware once we are done with it,
01:10:17.440 we'll call the next function. So here
01:10:20.159 I'll say maybe first try and catch. In
01:10:23.600 the catch we can just say console log
01:10:26.320 rate limit error and put the error and
01:10:31.199 then we can call the next function with
01:10:33.199 the error itself. Now in the try we can
01:10:36.320 get the success case. So we'll just
01:10:38.560 check if it is success or not. We can
01:10:41.199 say await write limit dot limit and you
01:10:46.159 would like to put an identifier. So this
01:10:49.199 could be something like user ID or it
01:10:51.760 could be IP address depending on this
01:10:54.159 value user will be identified and they
01:10:57.040 would be rate limited. Now in our case
01:10:59.280 we don't really have the authentication
01:11:00.800 on the backend side. So for now I'll
01:11:03.120 just put something like my rate
01:11:06.120 limit but as I said in production grade
01:11:09.360 applications you would like to have
01:11:11.360 something like uh let's say either user
01:11:14.679 ID you could have IP address so on and
01:11:18.159 so forth. uh in our case let's just keep
01:11:20.480 it simple just to understand this
01:11:22.320 concept and just leave the like a
01:11:25.600 hard-coded uh key a hard-coded
01:11:28.760 identifier and then we'll say if it is
01:11:31.440 not success right we can say return res
01:11:37.320 status and you already know it is port
01:11:40.320 29 which means too many
01:11:42.840 requests we'll say send this
01:11:48.760 message please try again
01:11:52.760 later and then we can uh like in the
01:11:56.159 else case if it is not if it is success
01:11:59.440 sorry if it is success we can call the
01:12:01.360 next function successfully but if it is
01:12:03.679 not success we'll just return a status
01:12:05.920 code with the error message and then at
01:12:09.199 the very end we can say export
01:12:12.000 uh
01:12:12.920 this as a default
01:12:16.719 let's say rate limiter. So this is the
01:12:19.040 middleware. We would like to put it in
01:12:20.880 front of our API, right? This is our API
01:12:23.679 just in front of it where we have the
01:12:26.000 middle layers. We can basically say app
01:12:28.560 do
01:12:29.400 use rate limiter. Okay. Now let's
01:12:33.520 actually try to test this out. I'd like
01:12:35.920 to be a little bit more extreme. So I'll
01:12:38.320 say only four requests per minute. And
01:12:41.440 I'll send my requests. So
01:12:44.679 one it is successfully done. Let's say
01:12:47.600 two three four. Now the fifth one should
01:12:52.080 fail. Too many requests. Please try
01:12:54.800 again later. So basically we cannot send
01:12:57.360 any more requests. And if you take a
01:12:59.679 look at the
01:13:01.159 database you will be able to see that we
01:13:03.760 are rate limited. So we have sent four
01:13:06.120 requests. Now we are rate limited. And
01:13:08.800 this was our key. Now this will block
01:13:11.679 the entire application right all the
01:13:14.320 users but as I said you would like to
01:13:16.800 make it um per user and to be able to
01:13:20.159 make that you would either add the user
01:13:22.719 ID or something like IP address in this
01:13:26.080 case I'd like to keep it simple my goal
01:13:28.320 with this uh with this section is to
01:13:31.600 teach you the rate limiting so for that
01:13:33.679 reason I'll keep it simple so here I'll
01:13:36.000 just put a comment here we
01:13:39.960 list kept it
01:13:42.280 simple. So in a real world application,
01:13:45.120 you would like to put the user ID or the
01:13:47.360 IP address as your key. Okay, so I hope
01:13:50.320 that makes sense. That's going to be for
01:13:52.719 this section as well. Let's try to fix
01:13:54.560 this. I'll put 100 per 60 seconds. Um in
01:13:58.960 the next section, we can basically
01:14:01.360 organize our files and folders and then
01:14:04.159 we can get into the mobile application.
01:14:06.480 So I'll see you in the next section. All
01:14:09.040 right. So let's try to organize the
01:14:11.320 server.js file. Currently it looks like
01:14:14.080 a complete mess because we we have
01:14:16.480 everything right here in this file. Now
01:14:19.040 what you would like to do basically take
01:14:21.360 every one of these routes and put it
01:14:23.600 under a folder. So I will create the
01:14:26.800 routes folder and let's try to see how
01:14:29.440 we can get started with it. So
01:14:31.760 everything is related to transactions.
01:14:33.760 Right here we can see we have API
01:14:35.760 transactions for the summary you know to
01:14:38.239 delete create get everything is related
01:14:41.199 to transactions. So we will create a
01:14:43.600 route for that. I'll say
01:14:46.920 transactions
01:14:48.440 route.js file and then we can create a
01:14:51.520 router. So just follow along with me.
01:14:53.840 It'll make sense in a second. Let's say
01:14:55.840 import the express from express and we
01:14:58.480 would like to create a router and I'll
01:15:01.440 say express.outer router and just make
01:15:04.719 sure that this R is capitalized. Then
01:15:07.360 I'll say export default this router
01:15:11.280 here. We'll put all of our routes. So
01:15:14.000 just save. Go ahead. Get everything that
01:15:16.880 you have seen here. Right? Just cut
01:15:19.239 that. Paste this right here. And instead
01:15:22.880 of app, we don't really have app, right?
01:15:25.120 We have router. So we'll say
01:15:28.120 router.get. We'll say
01:15:30.760 router.post router. need and one more
01:15:34.080 get. Now let's try to import the
01:15:37.800 SQL we'll say JS at the end. Okay. Now
01:15:42.320 to be able to use the transactions to be
01:15:44.560 able to use this file we need to import
01:15:46.719 it. So if you have realized every one of
01:15:49.600 these routes has the /
01:15:52.600 API/transactions right. So this is
01:15:54.960 something common that we have on all of
01:15:57.440 our routes. So we can put it right here.
01:15:59.920 I'll say app.use. This is a middleware
01:16:02.960 that we'll add. Let's say slap
01:16:08.600 API/transactions. If we got a request to
01:16:11.760 this endpoint, we basically want to
01:16:14.080 import this route. So let's say maybe
01:16:17.280 import it and put it right here. I'll
01:16:20.000 say import
01:16:24.840 transactions route from this file. So
01:16:28.560 we'll go into the routes and get this
01:16:30.960 one. Just make sure to put the js at the
01:16:33.800 end and we'll just put it right here.
01:16:36.880 Now since we have /
01:16:39.640 ai/transactions, we can delete them from
01:16:42.000 here. So if it is only /
01:16:45.000 ai/transactions, we can just put slash,
01:16:47.520 right? And here this field already
01:16:50.719 added. So this has been prefixed. We can
01:16:53.199 delete that. Do the same thing for this
01:16:55.840 one.
01:16:57.679 And I think for the very first
01:17:01.719 one so let me just put them side by side
01:17:04.480 and try to explain what we have done.
01:17:07.360 I'll just do mod
01:17:11.960 alapi/transactions which is going to be
01:17:13.840 prefixed with every single one of these
01:17:16.000 routes. So we are basically saying that
01:17:18.640 if we get a request to /
01:17:22.040 API/transactions go ahead and run this
01:17:24.159 file where we have the get request post
01:17:27.199 delete and then this one. So if we get a
01:17:30.080 request to /
01:17:32.600 API/transactions / summary and then a
01:17:35.280 user ID just go ahead run this function
01:17:38.320 and same for these ones. Okay so let's
01:17:40.960 open up the terminal. Looks like nothing
01:17:43.280 has crashed right it is working as
01:17:45.360 expected and we can give it a go like
01:17:48.000 I'll send a request we should get a
01:17:50.080 response back as exactly as it was
01:17:53.080 before so that's the very first thing
01:17:55.280 that we have done right this is the
01:17:57.120 first optimization that we can add now
01:17:59.600 one more thing I'd like to mention let's
01:18:01.679 say later at some point you add some
01:18:04.000 products to this application so you
01:18:06.320 would say create a rod under the API
01:18:09.440 under the
01:18:10.679 products and you would create a route
01:18:13.280 for that as well. So products route and
01:18:15.920 you could put every single route that is
01:18:19.120 that is about products. Okay, so just
01:18:21.600 keep that in mind. This makes it really
01:18:23.600 really convenient because let's say 1
01:18:26.400 month later you come back to this
01:18:28.000 codebase, you would like to update
01:18:30.400 something that is related to products.
01:18:32.640 You don't need to visit this file at
01:18:34.400 all, right? You don't have anything to
01:18:36.320 do to do with it. You'll just visit the
01:18:39.040 product routes and update that file and
01:18:41.280 you are done. But of course we don't
01:18:43.440 have any products. One more thing now
01:18:47.040 this file could get really messy because
01:18:49.440 we have bunch of different functions.
01:18:51.520 They could be 50 lines of code, 100
01:18:53.920 lines of code, so on and so forth. What
01:18:56.400 you can do is take these functions and
01:18:59.120 put them under uh a specific folder as
01:19:02.480 well. So this is what we call a
01:19:04.400 controller. So I'll go ahead create the
01:19:06.480 folder called controllers. So these are
01:19:09.120 some best practices that you can keep in
01:19:11.120 mind and I'll say
01:19:13.080 transactions
01:19:16.440 controller.js file. Okay. So this is
01:19:19.360 what we call the get transactions by
01:19:21.920 user ID. Right? So I will cut this and
01:19:24.560 create a function. Let's say it'll be an
01:19:27.360 async function where we can say get
01:19:31.239 transactions by user ID. You can call
01:19:34.320 this anything but this is the name that
01:19:35.920 I'll be going with and then I'll paste
01:19:38.080 this in. Let's try to delete this part
01:19:41.560 completely and this one. Okay, so this
01:19:44.719 should be good to go. Now we can add
01:19:46.480 this function right here. Let's say get
01:19:48.679 transactions by user ID. Let's try to
01:19:52.159 import it.
01:19:57.690 [Music]
01:20:01.120 So, we need to go one up under the
01:20:03.880 [Music]
01:20:05.080 controllers. Oops. Let's say controllers
01:20:07.760 and get this
01:20:09.320 file. Okay. Now, let's do the same
01:20:11.679 thing. And do we have a typo? Get
01:20:14.719 transactions by user
01:20:17.719 ID. So, since this is not highlighted, I
01:20:20.560 thought it is not working. Let's open up
01:20:22.239 the
01:20:23.080 terminal. Okay, it looks like Okay, so I
01:20:26.320 think we forgot to say export this,
01:20:28.080 right? So, I'll say export. Now we can
01:20:30.159 get that. Now it's been highlighted.
01:20:32.159 Okay. The other thing is to create one.
01:20:35.120 So I will basically cut this entire
01:20:37.719 function. You can make it as an arrow
01:20:40.000 function as well. But I'll just be
01:20:42.080 consistent. I'll say async function.
01:20:45.280 Paste this in. The name could be let's
01:20:48.640 say create
01:20:51.050 [Music]
01:20:52.679 transaction. And this is not an error
01:20:54.960 function. So we can delete this.
01:20:59.679 and try to import
01:21:01.800 it. Okay, now let's get the delete
01:21:07.430 [Music]
01:21:09.320 one. So I'll cut that. Let's say delete
01:21:14.110 [Music]
01:21:17.480 transaction export async
01:21:20.440 function. It's kind of boring. You can
01:21:22.880 skip this section. I mean just pretty
01:21:25.360 quickly uh speed up here. I'll say
01:21:28.920 delete
01:21:31.640 transaction and I think we should be
01:21:34.080 good to
01:21:36.040 go. And then very last one is to get the
01:21:39.360 summary. Right. I'll cut that. Oops.
01:21:57.199 And I'll just paste this in. Let's try
01:21:58.960 to fix
01:21:59.960 [Music]
01:22:02.760 it. Okay. So, let's save and try to see
01:22:07.199 the terminal if we have any errors or
01:22:09.480 not. In this file, I think we are using
01:22:12.679 SQL, but we haven't really imported.
01:22:15.840 Let's try to import that and put the js
01:22:18.719 at the
01:22:20.040 end. Delete this.
01:22:23.440 Okay, so everything should be working
01:22:24.960 out. Let's take a look at the terminal
01:22:26.639 and try to give it a go. Looks like we
01:22:29.040 don't have any errors. Let's send a post
01:22:31.520 request to create something like an
01:22:35.280 income of let's say second
01:22:38.040 salary. Let's say
01:22:41.320 4,000. We can create it successfully.
01:22:43.840 Now let's try to get a transaction. I
01:22:46.800 mean get the transactions for a profile.
01:22:50.400 Um, looks like it failed. Let's
01:22:55.960 see. Res is not
01:22:59.480 defined. What do you mean? We sent a
01:23:03.440 request to API
01:23:07.639 transactions. Okay. So, here we need to
01:23:09.840 put the request and response. And again,
01:23:13.120 my thought process was we sent a
01:23:15.280 request. Let me just find it. It is the
01:23:17.440 get request to this endpoint. Let me
01:23:19.840 find the controller. We don't really
01:23:21.679 have the response. So let's paste this
01:23:24.040 in. Send the request. Now we can get the
01:23:28.239 response back. And we can try to delete
01:23:31.440 one. So I'll go ahead delete the one
01:23:33.840 with the ID of
01:23:36.120 four. So I'll put
01:23:38.920 ID4. It's been deleted. Let's put
01:23:41.360 something that we don't really have in
01:23:42.960 the database and put something that is
01:23:47.000 invalid. Okay, so everything is working
01:23:50.000 as expected. We can add something, get
01:23:52.239 them and let's get the summary as
01:23:55.880 well. Okay, so it is working completely
01:23:59.199 fine and we have just organized our
01:24:02.639 entire codebase, right? We have our
01:24:04.719 controller functions for the
01:24:06.520 transactions. We have our middleware
01:24:08.800 folder. We have the config. We have the
01:24:11.920 routes and server.js file looks a lot
01:24:14.800 more cleaner.
01:24:16.440 Right? And we can I think delete this
01:24:18.960 one as well. One of the conventions is
01:24:21.840 to have a route for the health check. So
01:24:24.960 you would basically say uh I don't know
01:24:27.760 maybe
01:24:29.400 API/alth or just health check or just
01:24:33.840 health you know something similar and
01:24:35.920 then you would send a response back. you
01:24:38.000 would uh send your request just to check
01:24:40.560 if your API is up and running. But in
01:24:43.120 this case, I'll just delete it to keep
01:24:44.960 it simple. And I think we can take this
01:24:48.480 function and put it right here under the
01:24:51.239 database. So here I'll paste this in and
01:24:54.239 let's say export this function and we
01:24:57.600 can call it right
01:24:59.239 here by importing it. We can delete the
01:25:02.400 SQL. We are not using it. It is coming
01:25:05.520 right here. Right. Open up the terminal.
01:25:08.400 Let's see. It is working as expected. If
01:25:11.120 we try to break this. So, I'll try to
01:25:14.239 break
01:25:16.199 that. You know, let's change the
01:25:18.920 password and save this file. Now,
01:25:22.159 authentication failed. But if we put the
01:25:24.400 correct one, everything is working as
01:25:26.159 expected. All right. So, with that, I
01:25:28.320 think that's going to for the entire
01:25:30.400 backend part where we have built the
01:25:32.480 entire API. We even implemented
01:25:34.960 something called rate limiting. Um, I
01:25:37.360 hope you enjoyed the entire section. In
01:25:39.120 the next one, we're going to get started
01:25:40.800 with the React Native mobile
01:25:42.679 application. So, I'll see you there. So,
01:25:45.120 I already said goodbye, but just a
01:25:47.360 second. I'd like to do one more quick
01:25:49.400 optimization where I'd like to take
01:25:51.679 everything that is related to
01:25:53.120 application and put it under a folder
01:25:55.760 called source. So, if you have ever used
01:25:58.320 React, Nex.js JS or any other production
01:26:01.520 grade framework. Uh probably you have
01:26:04.000 seen this folder, right? The entire
01:26:06.000 application logic is within this folder.
01:26:09.040 So this is what I'd like to do. I'll
01:26:10.880 just get the config controllers
01:26:13.120 middleware routes but not the node
01:26:15.840 modules. So let me first grab all of
01:26:18.159 these and put it under the source. I'll
01:26:21.440 do the same thing for the routes. And
01:26:23.679 finally the server.js file. So these are
01:26:26.960 the actual application logic but things
01:26:29.840 like you know package JSON orv file or
01:26:33.520 you know our dependencies could be
01:26:35.840 outside of this folder. So this is just
01:26:38.080 a commission that I wanted to follow.
01:26:40.320 But if you open up the terminal you'll
01:26:42.560 see that it's going to crash. It's
01:26:44.560 because here we said just go ahead run
01:26:47.040 the server.js file but now it is not
01:26:50.400 really right here right it is under the
01:26:52.639 source. So we'll say now it is under the
01:26:55.679 source folder. Save this and kill this
01:26:58.960 and re restart it. Now it is working
01:27:02.400 correctly. And I'll add one more script.
01:27:05.120 So this is something for the production.
01:27:08.000 Here I'll just say run the server.js JS
01:27:10.719 file but uh with the node right in
01:27:14.320 development we would like to run it with
01:27:16.000 nodemon but in the production we'll just
01:27:18.880 run it with
01:27:20.760 node which is something that uh which is
01:27:23.840 something that is not going to listen
01:27:25.760 for the changes. Okay. So this is
01:27:27.760 something that we'll be using when we
01:27:29.440 deploy this API. Okay. I think that's
01:27:32.880 going to uh under the main. This is one
01:27:35.520 more optimization that we could add. I
01:27:37.520 just feel like this section is never
01:27:39.600 going to end. But here we go. The
01:27:42.080 starter file is not index.js. In our
01:27:44.880 case, it is server.js, right? And it is
01:27:48.000 under the source folder. So, let's go
01:27:50.480 ahead uh add this. And now everything
01:27:53.600 should be working correctly. Okay. So,
01:27:56.719 that's going to be it for this section.
01:27:58.159 I'll see you in the next one. All right.
01:28:00.480 So finally we can get started with the
01:28:02.800 mobile folder where we can initialize
01:28:05.199 our React Native application. Currently
01:28:07.440 we don't really have anything and before
01:28:09.760 we write any code I'd like to you know
01:28:12.239 just give you a quick crash course on
01:28:14.320 React Native. So these are the things
01:28:16.159 that I have explained in my previous
01:28:18.000 tutorials but just in case if you are
01:28:20.159 new here I'd like to go over it pretty
01:28:22.800 quickly. Okay so you might be asking
01:28:25.040 what is React Native in the first place.
01:28:27.440 It is a framework that allows you to
01:28:29.600 build mobile applications using React.
01:28:32.320 So that's it. It is just a framework
01:28:34.719 that allows you to build mobile
01:28:36.400 applications using React. You can use
01:28:39.120 either JavaScript or TypeScript. And
01:28:41.760 there is a really common term called
01:28:44.080 crossplatform development, which means
01:28:46.880 writing code once that can run on
01:28:49.280 multiple platforms. And this is exactly
01:28:51.840 what React Native allows you to allows
01:28:54.320 you to do. uh because it is a
01:28:56.280 cross-platform framework. Sorry, it's a
01:28:59.040 cross-platform framework because you can
01:29:01.440 write one codebase in JavaScript and you
01:29:04.080 can deploy it to both iOS and Android.
01:29:07.440 So, this is exactly what we'll be doing.
01:29:09.679 We'll just write one codebase in
01:29:11.520 JavaScript and it'll work both on iOS
01:29:14.400 and Android. And it can even work in web
01:29:18.080 thanks to Expo, which is something that
01:29:20.400 we'll get into. But this wasn't really
01:29:22.639 the case back in the old days. So if you
01:29:25.920 want to build a mobile application, you
01:29:28.480 had to build it. You had to build it
01:29:30.639 twice. So one for the app store and then
01:29:33.600 one for the play store. And assuming you
01:29:37.199 don't really know any of these
01:29:38.239 languages, it would be really slow
01:29:40.400 because you first had to learn Swift,
01:29:42.719 build it. Once it is done, just go back
01:29:45.040 and learn Cotlin uh and you know, build
01:29:48.000 it, deploy it, so on and so forth. It
01:29:50.239 was really expensive as a founder as
01:29:52.480 well because you had to hire two
01:29:55.280 different engineering teams,
01:29:57.639 right? One team would build this uh part
01:30:00.880 of the app and then the other one this
01:30:03.600 app. So it's like really cumbersome and
01:30:06.080 expensive and before CIFT I think there
01:30:08.880 was objective C like sift is a little
01:30:12.239 bit more simplified version of it. I
01:30:14.480 have never used any of them but these
01:30:16.480 are the things that I have just
01:30:17.600 researched and you know just keep that
01:30:20.080 in mind and then before cotlin you had
01:30:22.320 to build it with java you can still do
01:30:24.800 it but I think cotlin is a little bit
01:30:26.880 more abstract like abstraction on top of
01:30:29.280 it um yeah so I think developers mostly
01:30:33.360 let's say they prefer this over
01:30:36.600 java and then if you wanted to build it
01:30:39.280 with you know if you wanted to build it
01:30:41.600 for the app store you have to have a
01:30:43.840 MacBook which is to be honest pretty
01:30:46.400 expensive. But now thanks to React
01:30:48.639 Native, you can just skip everything and
01:30:50.960 just learn JavaScript and build it which
01:30:53.360 is pretty cool. And there is something
01:30:55.120 called Expo on top of it which is
01:30:57.520 something that React Native teams I mean
01:31:00.000 React Native team uh recommends. So this
01:31:03.120 is a screenshot from their documentation
01:31:05.440 that you can take a look as well. So
01:31:07.600 just check out the ReactNative.dev. This
01:31:10.560 is the entire documentation for React
01:31:12.400 Native. Uh so they basically say that
01:31:15.600 they believe the best way to experience
01:31:17.760 React Native is through a framework and
01:31:21.120 their optional choice is Expo which is
01:31:23.760 something that we'll be using. It's
01:31:25.280 incredible. We'll just see it for in
01:31:27.440 this tutorial. Okay. So our go framework
01:31:29.920 for React Native is Expo. But now don't
01:31:32.639 get confused. React Native is not the
01:31:35.120 same thing as Expo. So Expo is built on
01:31:38.560 top of React Native. Okay. So it is like
01:31:40.960 additional toolbox that we have that
01:31:43.280 makes react native development a lot
01:31:45.360 more easier and we'll see that as I
01:31:48.199 said. So it's like Nex.js that is built
01:31:51.440 on top of react in web development
01:31:53.760 right. So you get additional
01:31:55.520 optimizations like let's say server site
01:31:58.320 rendering uh server actions, SEO
01:32:01.280 optimizations, image optimizations,
01:32:03.760 links, so on and so forth, right? We
01:32:05.679 could just talk about it for hours, but
01:32:08.960 let's move on. So here I just put five
01:32:11.360 different comparisons that you can take
01:32:13.199 a look. Like I think there is nothing to
01:32:15.760 explain. Just pause the video and take a
01:32:17.760 look at it even though I'll I'll go over
01:32:20.000 it. So this is the web react. Okay, so
01:32:22.960 this is just ReactJS and this is React
01:32:24.960 Native. So the component structure is
01:32:27.679 exactly the same, but instead of having
01:32:30.000 divs and H1 and P, we have like Wu and
01:32:33.760 text. So it doesn't really matter if you
01:32:35.920 use H1, P, you know, span, uh, let's say
01:32:40.080 H6, H3, any kind of text, it should go
01:32:43.840 under the text component, which is
01:32:46.480 coming from React Native. And div is
01:32:49.120 just a view. Okay, so we just have view
01:32:51.760 for
01:32:52.679 boxes. Okay, so we'll just get into it a
01:32:55.280 lot in the like a lot more in the coding
01:32:58.000 like in a couple of minutes. But these
01:32:59.760 are some examples to keep in mind. And
01:33:02.159 when it comes to styling here in web, we
01:33:05.760 would have a class name and then uh
01:33:08.400 define it in our CSS file, right? So we
01:33:11.120 have like card class with some padding,
01:33:13.679 border radius, etc. And then we put it
01:33:16.320 right here. But instead in React Native
01:33:19.040 we create a stylesheet. Okay. So just
01:33:21.280 import it, create a styles object where
01:33:24.800 you have your classes. So cart is
01:33:27.280 basically an object. You would give the
01:33:29.199 padding all the styles and then just
01:33:31.840 come back to here and say styles.cart.
01:33:34.880 We're just going to apply these styles
01:33:37.280 to this view. So same for this one. So
01:33:39.679 on and so
01:33:41.480 forth. Let's see what do we have else.
01:33:45.040 The event handling. Okay. So we don't
01:33:46.880 really have a button in React Native. We
01:33:49.360 have things like touchable opacity or
01:33:52.000 pressable which are the equivalent of a
01:33:54.480 button right and on web we have like on
01:33:57.760 click on mouse over uh but since in
01:34:01.040 mobile development we don't really have
01:34:02.639 a mouse there are events like on press
01:34:05.760 on long press so on and so
01:34:08.040 forth. Okay so we have lists. So in
01:34:12.000 React you would do something like
01:34:14.480 array.mmap and for each item you would
01:34:17.760 you know render something. This is
01:34:19.600 something that you can do in react
01:34:21.199 native as well but uh the better option
01:34:24.080 is to use something called flat list. It
01:34:27.280 has a lot more optimization on top of
01:34:30.480 this usage. Okay. So this is something
01:34:32.880 that we'll be using as well. Just keep
01:34:34.960 that in mind. you would say here is my
01:34:37.199 item sorry here's my array and for each
01:34:40.080 item go over and run uh this function.
01:34:44.159 So it'll basically take every single
01:34:46.159 item and return this part. Okay, so this
01:34:49.600 might look a little bit weird but we'll
01:34:51.120 see that in the tutorial in the incoming
01:34:54.080 sections. And then finally we have the
01:34:56.400 forms. So instead of a input right
01:34:59.600 instead of an input we have text input
01:35:02.239 component which is almost the exact same
01:35:04.480 thing. with some syntax differences and
01:35:07.600 we don't really have a form element. So
01:35:10.239 in web we have on submit but here
01:35:12.719 basically when we click to the button we
01:35:15.120 would just submit that. Okay. So these
01:35:17.440 are just some examples that I wanted to
01:35:20.239 put here so that you can just get a bit
01:35:22.679 motivated that react is not really
01:35:25.520 different than react native or vice
01:35:27.760 versa. There are just some syntax
01:35:29.679 differences and a couple of different uh
01:35:32.400 let's say concepts, right? Okay. Now,
01:35:35.920 how are you going to follow along with
01:35:37.679 this tutorial? Let's try to go over it
01:35:39.840 pretty quickly. So, basically, you have
01:35:42.080 two different options. Uh you can either
01:35:44.719 install Expo on your phone, right? So,
01:35:47.280 this is a screenshot that I took. So,
01:35:49.520 you you could install it from either App
01:35:51.679 Store or Play Store and then scan a QR
01:35:55.199 code. This is something that we'll see
01:35:56.880 in a second. Or you could install a
01:35:59.360 simulator on your machine. So if you're
01:36:01.760 using Windows, you can install Android
01:36:03.840 Studio. And if you're on Mac, you can
01:36:06.000 use Xcode. Like this will take a little
01:36:08.639 bit longer because you're installing a
01:36:11.199 huge simulator. But if you want to get
01:36:14.159 started pretty quickly, you can install
01:36:16.080 the XOGO application. It'll just be
01:36:18.400 installed in like couple of minutes. And
01:36:21.120 here, as I said, this is really quick
01:36:22.800 and convenient to get started with, but
01:36:25.600 this is a lot more slower and this could
01:36:28.639 be pretty cool if you are going to build
01:36:30.960 more applications in the future, right?
01:36:33.199 In the long run, it could be fun because
01:36:35.600 you would just have your simulator in
01:36:37.920 your laptop. So, you don't really need
01:36:39.920 to check your phone every single time.
01:36:42.400 So, in either case, you are going to
01:36:44.000 build the application. So I think I
01:36:45.920 would recommend you to go with this
01:36:47.679 option to be Ela fast but it's
01:36:49.840 completely up to you. In this video I'll
01:36:51.760 be using the simulator so that I can
01:36:54.080 just show you the output as we go. Okay.
01:36:56.560 So let's go ahead and get started with
01:36:58.320 the actual application. I'll open up the
01:37:01.440 terminal. Now I just killed the back end
01:37:03.360 for now. We don't really need it. So
01:37:05.119 I'll cd into the mobile folder and I'll
01:37:08.080 say mpx
01:37:12.760 create-expo@ latest and we're going to
01:37:15.360 put dot at the end. So we'll be using
01:37:17.600 expo for the you know initialization. Uh
01:37:20.800 like as I said it it is the let's just
01:37:23.840 go through it pretty quickly. I think I
01:37:25.760 haven't really talked about it expo
01:37:27.679 enough. So it is the framework that is
01:37:30.719 built on top of React Native and it's
01:37:33.440 like all the toolbox all the necessary
01:37:35.600 APIs that would let you to build a
01:37:38.800 production ready application and you can
01:37:41.040 take a look at the entire documentation.
01:37:43.520 They actually have a pretty cool uh
01:37:45.840 tutorial right here within the
01:37:47.560 documentation but uh in this video I'd
01:37:50.239 like to walk you through it. Okay. So
01:37:52.239 we'll just run this command to
01:37:53.920 initialize the expo app.
01:37:59.520 So this is going to get you a
01:38:02.400 boilerplate expo application and we're
01:38:05.199 going to go ahead delete everything and
01:38:06.880 just get started from
01:38:08.920 scratch. Okay, so it's done. Now this is
01:38:11.920 pretty much a React codebase. So we have
01:38:14.880 things like components, we have custom
01:38:17.119 hooks, we have some constants. So these
01:38:19.679 are the colors, but we're going to
01:38:21.040 change it and build it from scratch. So,
01:38:23.199 it's it should be pretty uh let's say
01:38:25.440 pretty uh familiar to you, but we'll
01:38:28.480 delete everything and get started from
01:38:30.400 scratch. But first, I'd like to just run
01:38:32.719 this app on my simulator. Okay. So, I'll
01:38:35.280 just put them side by side. Now, let's
01:38:37.840 say clear the terminal and MPX Expo.
01:38:41.679 Now, in a second, I'll show you how to
01:38:43.679 run this on your physical device. But
01:38:46.320 first, now if you're on iOS or if you're
01:38:49.600 on Mac, just press I. But if you are on
01:38:52.000 Windows, press A. So I'll press I. It's
01:38:55.360 going to get started with
01:38:58.119 it. Okay. So this is the boilerplate
01:39:00.960 application that Expo gives you. We'll
01:39:03.119 delete everything and get started from
01:39:04.880 scratch. But first, let me open up the
01:39:07.320 camera and show you how to open this up
01:39:11.199 on your phone. So I have both an Android
01:39:14.239 device and an iOS device. So first,
01:39:16.880 let's just from here say scan the QR
01:39:19.600 code. I'll click to it. In here, we
01:39:22.239 should be able to have a, you know, QR
01:39:24.719 code that I'd like to scan pretty
01:39:28.360 quickly. Okay, now it is building the
01:39:31.360 application. We're going to get the
01:39:33.040 exact same output that we have right
01:39:35.960 here. Okay, let's do the exact same
01:39:38.159 thing on my, you know, iOS
01:39:42.679 device just to double check it is
01:39:45.040 working correctly.
01:39:48.159 Okay. So, if you don't have the uh iOS
01:39:50.719 simulator, you can follow along with
01:39:52.880 your actual phone. Okay. Now, let's try
01:39:55.600 to update something. So, here I'll go
01:39:58.000 ahead update this welcome text which is
01:40:00.239 under the app tabs and index. So, we'll
01:40:03.440 delete everything and explain
01:40:05.000 everything. Do not worry at the moment.
01:40:07.520 Here I'll say welcome one 2 3 let's say.
01:40:11.520 And once I save, notice how it'll be
01:40:14.679 updated. Okay. So that means everything
01:40:17.199 is working correctly. Um I'll delete
01:40:20.000 these applications, right? I'll just
01:40:21.920 kill them and instead I would like to uh
01:40:25.600 explain it from the simulator so that we
01:40:28.080 can see it side by
01:40:30.520 side. Okay. So now that you know how you
01:40:33.280 can follow along with your phone, let me
01:40:35.920 maximize this and just zoom out a bit.
01:40:38.159 So there is so much like so much going
01:40:40.480 on at the moment. what we would like to
01:40:42.400 do just delete everything and get
01:40:44.320 started from scratch. And thankfully
01:40:46.960 React Native the expo expo team gives
01:40:50.080 you a script where you can reset the
01:40:52.239 project. So these are the things that we
01:40:54.400 don't really understand at the moment.
01:40:56.400 So that's why I'll go ahead kill the
01:40:58.639 application with Ctrl C and then I'll
01:41:01.119 say mpm run reset-
01:41:04.840 project. So this will basically reset
01:41:07.440 the project. And here it ask me it asks
01:41:10.719 me a question where it says do you want
01:41:13.520 me to delete everything or should I take
01:41:16.000 everything and put it a folder called
01:41:19.320 app-ample. So I'll just say press enter.
01:41:22.719 So it'll take everything that we had and
01:41:24.639 it'll put it under the app-le folder.
01:41:27.760 Right? So we had the components
01:41:30.239 constants hooks. But for now, I'd like
01:41:32.880 to ignore this and take a look at the
01:41:35.639 index.tsx
01:41:37.159 file with a super basic content. So,
01:41:41.040 I'll just run the app once
01:41:43.800 again. So, let's say MPX expo and I'll
01:41:47.040 say just press I. Let's put them side by
01:41:50.880 side and go over it. Now, this is the
01:41:52.960 old version. I'll press R to reload
01:41:57.000 it. Here we can see it says reload the
01:41:59.440 app. Now this is the this is the output.
01:42:01.920 Now I'd like to go a little bit slowly
01:42:04.239 at the beginning, right? So I'll just go
01:42:06.000 really slowly just to make sure we
01:42:08.159 understand the fundamentals and then we
01:42:10.800 can speed up the process. Okay. So
01:42:13.440 everything starts from the app folder
01:42:16.000 and specifically from the layout file.
01:42:18.960 So this is a special file called
01:42:20.960 underscore layout. It's using TypeScript
01:42:24.159 but in this tutorial we'll be using
01:42:25.679 JavaScript just to keep it beginner
01:42:27.840 friendly. So here they have something
01:42:30.159 called stack navigator. I'll explain
01:42:32.560 this but for now let's go into the
01:42:34.960 homepage which is called
01:42:37.159 index.tsx. Again a special file name.
01:42:40.080 Okay. So this is the homepage the home
01:42:42.080 screen that you would have. Now let's
01:42:44.159 try to change
01:42:46.520 something. Save. It's been updated.
01:42:49.360 Okay. Now let's get started with some
01:42:51.760 components. So we said that view is
01:42:54.239 equivalent of dev, right? It is just a
01:42:57.199 simple box. And then we have some
01:42:59.600 styles. So here, let's say the
01:43:01.760 background color is going to be
01:43:04.400 something like red. It'll be updated. So
01:43:07.600 this is how you would add some styles.
01:43:09.600 There are different ways that we'll see.
01:43:11.760 You could either put it like uh inline.
01:43:14.159 Let's do it actually on this one. So you
01:43:16.400 would say style, open up this object,
01:43:18.880 and you would say color. Let's say I'll
01:43:21.520 say it'll be blue. Okay, it's been
01:43:24.320 updated. I don't really know if you can
01:43:26.080 see it, but it's definitely blue. And
01:43:29.520 then let's try to put a component like a
01:43:32.639 link. Let's say it'll take us to the
01:43:35.280 about screen, which is something that we
01:43:37.360 don't have, but we'll create it. Now,
01:43:40.400 for the link, you have either expo
01:43:42.159 router, right? Link coming from export
01:43:44.400 router or react navigation. I would
01:43:46.560 recommend you to use expo. It is a lot
01:43:48.480 better than the other one. So, let's say
01:43:51.360 href. Once we click to it, it'll take us
01:43:54.239 to the about page. But we don't really
01:43:56.320 have this one. So let's try to create
01:43:58.239 it. I'll say about
01:44:02.040 jsx. Now I'll use a snippet called
01:44:06.119 rnf which which is going to give you a
01:44:08.800 react native functional component. And
01:44:11.199 let's say this will be called as about.
01:44:14.320 Now if you cannot get this snippet, you
01:44:16.719 can install this extension.
01:44:21.199 Um just go ahead and install this one
01:44:23.119 and you can say things like
01:44:25.960 rnf and you can get the exact same
01:44:28.320 output that I have. Okay, let's save and
01:44:31.199 try
01:44:32.040 to save this file as well. Now it says
01:44:34.880 we cannot see it but it's actually
01:44:37.600 there. I'll refresh this. I'll say R to
01:44:40.639 reload
01:44:42.600 this. Now I'll click it. We can go into
01:44:45.920 that page. So if you if you're getting
01:44:48.320 this error probably VS Code is buggy.
01:44:50.800 Just press
01:44:52.199 commandshiftp or control shiftp and say
01:44:55.199 developer reload
01:44:57.159 window. So this is a pro tip that you
01:44:59.760 can keep in mind. But looks like this
01:45:02.000 does not work. Let's try to make
01:45:04.320 everything
01:45:07.320 JSX. Let's say yes. And I'll update this
01:45:10.560 one as well. Let's go with a
01:45:13.400 JavaScript. Save this file and close
01:45:15.520 that as well. Okay, now we don't really
01:45:17.040 have any errors. But now as you can tell
01:45:20.159 the navigation is working. Now if you
01:45:23.280 can see this is what we call the stack
01:45:25.320 navigator. So when you click to it new
01:45:27.840 pages will be coming from the right hand
01:45:29.840 side and the previous pages will go from
01:45:33.040 the left hand side. Right? So this feels
01:45:35.440 like a stack and this is possible thanks
01:45:38.719 to this component that we just put in
01:45:41.199 into the root layout. So almost always
01:45:43.920 you would like to have this component in
01:45:45.920 your applications unless you are
01:45:47.920 building only a single page mobile app.
01:45:51.840 Okay. So we're going to have that right
01:45:56.199 here. And now you might be asking I
01:45:58.800 don't really want to see this screen
01:46:00.880 header right. So it's really basic
01:46:03.280 really simple to get rid of. We'll go
01:46:05.199 under this tag. We'll say screen options
01:46:08.159 where we would like to say the header
01:46:10.239 shown is going to be equal to false
01:46:12.719 save. Now it is gone. Okay. So this is
01:46:14.880 something that you can keep in mind in
01:46:16.639 your notes. But in this case I'd like to
01:46:18.960 have it. But in this case it is
01:46:20.639 something that I'd like to have it. So
01:46:22.159 I'll just delete that. Now let's see
01:46:23.920 another component. So here I'll just say
01:46:26.239 the image component. Again use the one
01:46:28.719 that is coming from expo image. It's a
01:46:30.800 lot more optimized. Here we can put the
01:46:33.119 source. Now, this could be either a
01:46:35.360 local image or a remote image. So, let's
01:46:38.159 see what I mean. I'll just put the URI
01:46:40.800 and let's grab an image from
01:46:43.639 Unsplash. Okay. So, I'll just get this
01:46:45.920 keyboard image. Let's say copy the image
01:46:49.920 address or link address. What should we
01:46:52.080 do? I'll just say copy the link
01:46:55.400 address. I'll paste this in. Let's put
01:46:57.840 them side by side. Now if I save I
01:47:00.320 cannot see anything because we don't
01:47:01.920 really have any width or height. So
01:47:04.080 let's say
01:47:07.320 style let's put the width I'll say 100.
01:47:10.960 And let's do the same thing for
01:47:15.480 height. Okay. So for some reason we
01:47:18.080 cannot still see that. I think we should
01:47:20.800 get the image address. So here I'll say
01:47:23.119 copy the image address instead of
01:47:29.480 link. Okay, now we can see it. So you
01:47:32.480 would use URI if you want to get a
01:47:35.360 remote image. But let's say you want to
01:47:37.520 get this local image from the images. Uh
01:47:41.280 let's say you would like to get the
01:47:42.719 React
01:47:43.880 logo.png. So here instead of this I'll
01:47:46.560 comment this out for the reference.
01:47:49.360 Let's say you would create the image
01:47:51.199 component once
01:47:52.600 again. Now for the source you would like
01:47:55.760 to import it. So here I'll say
01:47:58.360 require I'll put at which means you are
01:48:01.119 in the root. Okay. So you are in the
01:48:03.360 mobile folder. From here we'll go under
01:48:05.840 the assets. Let's say /
01:48:09.239 assets. Go under the images and then get
01:48:12.639 the react
01:48:17.480 logo.png. And of course, I'd like to get
01:48:19.840 my styles. So, let's paste this in.
01:48:22.239 Okay. So, we can import that as well. It
01:48:24.239 is working correctly. So, these are the
01:48:26.400 things that you can keep in mind. I
01:48:28.719 think we'll be using we'll be using them
01:48:30.719 later in the
01:48:32.119 video. So, I know that we are going
01:48:34.400 slowly, but I really want to make sure
01:48:36.320 that you understand the basics. So,
01:48:38.480 let's give another example. I'll create
01:48:40.880 a view. Basically, it is a div. If you
01:48:43.440 put some text like hello, what do you
01:48:46.000 think will happen? Well, I think we'll
01:48:48.159 get an error. Let's save. As we can
01:48:50.639 tell, whenever you have a text, it has
01:48:53.520 to be under the text component. So, here
01:48:56.080 I'll just put text. And now, let's say
01:48:58.639 hello. Save. The error is gone. Now, you
01:49:01.679 might be asking, hey, we had a text here
01:49:04.159 under the link, but it is not wrapped
01:49:06.400 with a text component. Well, if you
01:49:08.960 hover over the link, they will tell you
01:49:11.119 that we are wrapping it under a text
01:49:14.080 component by default so that you don't
01:49:16.320 have to. Okay. So, even though it looks
01:49:18.480 like we don't have it, like we
01:49:20.960 definitely have that under the hood. So,
01:49:23.360 this is one more thing that you can keep
01:49:25.040 in mind otherwise you'll get like you'll
01:49:29.199 get errors just like this one. Okay. So,
01:49:31.679 let's delete this view. And other thing
01:49:33.920 that I'd like to talk about is the
01:49:35.960 styles here. I'll go ahead create a
01:49:39.600 let's say we'll create an object I'll
01:49:41.440 say post styles this is the convention
01:49:44.239 most of the time this is what we call it
01:49:46.400 we'll say from the stylesheet so just
01:49:49.440 import that from react
01:49:51.560 native let's do it style sheet here we
01:49:55.040 would like to create one not compose
01:49:58.000 let's say create and we'll pass an
01:50:00.639 object so here let's say I want to call
01:50:03.280 this as the container class right so I
01:50:06.480 can say container container and put
01:50:08.239 these styles in which is flex of one and
01:50:11.679 let me copy and paste the rest. Okay,
01:50:14.880 now instead of putting it in line I'll
01:50:16.800 say delete this and grab it from the
01:50:19.199 styles. So I'll say styles container.
01:50:22.159 Okay, now let's save everything is going
01:50:24.400 to be the same. Here you can add more
01:50:26.400 things like background color is going to
01:50:29.360 be let's say purple. It's going to be
01:50:32.320 updated. That means these styles are
01:50:34.960 actually being updated, right? They are
01:50:37.040 being applied. So you can do the same
01:50:38.880 thing for the rest. Just cut this out
01:50:41.520 from here. I'll say styles dot let's say
01:50:46.080 I don't know let's say
01:50:49.480 heading. You would go ahead create this
01:50:52.159 one. Uh let's say font size is going to
01:50:55.920 be something like huge, right? And let's
01:50:59.040 say color is going to be blue as well.
01:51:03.199 Okay, as you can tell, these are the
01:51:04.960 things that you would do. This is a
01:51:06.800 different way of using it. Now, this is
01:51:08.800 really cool actually because if you
01:51:11.600 think about it, you will have like 20
01:51:14.159 lines of code for a single class, right?
01:51:17.119 For a single style. And if you put
01:51:20.040 it right here in line, so let's pretty
01:51:22.639 quickly do it. Imagine you have this one
01:51:25.840 like at some point this component will
01:51:27.840 be really really ugly because here you
01:51:30.159 will have another 20 lines of code right
01:51:33.199 here you would have maybe 50 lines of
01:51:35.360 code so everything would be styles
01:51:37.440 instead of doing it in this way we would
01:51:39.440 create our own object and we can even
01:51:42.320 take it put it into a different file so
01:51:44.880 that we don't really we don't really
01:51:46.960 have to see any styles in the JSX file.
01:51:50.480 So I just did some Ctrl Z and bring this
01:51:52.880 back to the previous state. Now I think
01:51:55.440 we can leave this section here. Let's
01:51:57.440 talk about the app.json file as well.
01:52:00.320 This is the configuration file for your
01:52:02.960 mobile app. Here we can see like we have
01:52:05.360 the entire expo configuration. You have
01:52:07.920 your icon for Android you know for web.
01:52:10.880 These are the things that you would have
01:52:12.880 and then let's say for the iOS you know
01:52:16.400 for plugins like everything right this
01:52:19.440 is the configuration file most of the
01:52:21.599 time you don't really work with it but
01:52:23.520 once you once you're about to deploy
01:52:26.080 this app to Apple store or play store I
01:52:29.280 think this is the this is the file that
01:52:30.880 you would be updating now one more thing
01:52:33.440 if you press W it's going to open up
01:52:36.719 this application on
01:52:38.440 web okay so you can just put it into the
01:52:42.320 web view, right? So, you just shrink the
01:52:45.199 screen and you can test this out or you
01:52:47.360 can build a web application with Expo.
01:52:50.560 But we are not really interested with
01:52:52.159 this option. So, we'll move on with the
01:52:54.400 mobile phone that we have, right? So,
01:52:56.639 I'll leave this section here. We just
01:52:58.480 learned the basics of React Native,
01:53:00.719 right? In the incoming sections, we can
01:53:02.960 get started with the authentication so
01:53:05.119 on and so forth. Maybe just one more
01:53:06.960 thing I could explain pretty quickly.
01:53:09.520 Now there is something called tab
01:53:11.440 navigator. So this is an example that I
01:53:13.920 have. So if you can see at the very
01:53:16.000 bottom of this file or at the bottom of
01:53:18.320 this pawn right here we have couple of
01:53:21.599 different tabs. Whenever you click to
01:53:23.679 one of them the UI will update. So this
01:53:25.920 is what we call the tab navigator right.
01:53:28.960 So, it is a navigation pattern that
01:53:31.520 creates a tap bar, usually at the bottom
01:53:34.400 of the screen that allows users to
01:53:37.679 switch between different screens. In
01:53:39.760 this application, we are not going to
01:53:41.199 have the tab navigation. As you can
01:53:43.679 tell, we don't really have this tab at
01:53:46.320 the bottom. Instead, we have the stack
01:53:48.760 navigator. But just to mention, if you
01:53:51.119 wanted to create a tab navigator under
01:53:53.920 the app folder, you would create this
01:53:56.159 special folder called tabs. and then you
01:53:58.880 would put your tabs within this folder.
01:54:01.760 This is something that we have done in
01:54:03.199 the previous React Native tutorials. You
01:54:05.760 can check them out. But in this video,
01:54:07.920 we'll not be using it. Okay? So, this is
01:54:10.480 something to keep in mind. Uh with that,
01:54:13.599 that's going to be it for this section.
01:54:14.960 I'll see you in the next one. Okay. So,
01:54:17.599 this is where we left. We just learned
01:54:19.280 the basics of React Native, but now it's
01:54:21.840 time to set up our codebase. So to keep
01:54:25.280 everything simple and a lot more easier
01:54:27.360 for the incoming sections, we can add
01:54:29.679 our CSS files, our colors, some images,
01:54:33.840 so on. Right? So here I have prepared an
01:54:36.560 entire GitHub gist. So just uh I'll just
01:54:39.520 put the link in the description. You can
01:54:41.040 find it. So here we'll have couple of
01:54:43.520 different CSS files that we would like
01:54:45.599 to copy and paste instead of typing them
01:54:48.000 out because this is not a CSS course.
01:54:50.560 really like to focus on the actual React
01:54:53.360 Native concepts. Right? So here we have
01:54:56.239 things like flex, background colors,
01:54:58.960 paddings, you know, width, height, super
01:55:01.360 super basic CSS. So in this case, I'd
01:55:04.000 like to just copy and paste those. Here
01:55:06.560 I'll copy the very first file which is
01:55:09.040 for the oath. So here I'll go ahead
01:55:11.280 paste this in under the let's say mobile
01:55:15.159 create the styles folder under the
01:55:19.480 assets and then create this file called
01:55:23.800 oath.styles.js. So I'll go ahead paste
01:55:25.760 this in 100 lines of code. We'll be
01:55:28.239 using them. So these are basically the
01:55:30.320 class names that you would need to get a
01:55:33.119 beautiful output like these ones. So
01:55:36.080 this is the you know styles for the oath
01:55:38.719 pages and then we have the homepage as
01:55:41.119 well as the create page and then we are
01:55:43.280 going to need some colors so that I can
01:55:45.599 give you all these different themes. So
01:55:48.639 we have the coffee theme, we have the
01:55:50.880 purple theme, the green and then the
01:55:53.679 blue ocean theme. Right? So for this
01:55:56.320 once again you can find the colors.js
01:55:58.800 file. Go ahead copy it. Again I'll
01:56:02.159 explain how this works.
01:56:04.560 just put it under the
01:56:06.280 constants. So here under the mobile
01:56:09.280 create the constants and then let's say
01:56:13.159 colors.js file paste this in. So
01:56:17.280 basically we have let's say four
01:56:19.760 different themes right they have the
01:56:21.599 exact same thing like primary background
01:56:24.719 so on and so forth but the values are
01:56:27.040 different. And then at the very bottom
01:56:29.440 we have this themes object. If it is
01:56:32.000 coffee, it'll use the coffee theme. If
01:56:34.560 it is forest, we'll use the forest
01:56:37.440 theme. So on and so forth. And then
01:56:39.440 here, this is the actual colors. Let's
01:56:42.159 say you would like to use the coffee
01:56:43.679 theme. Here you would just say, give me
01:56:46.159 the coffee. If you would like to use the
01:56:47.840 ocean theme, you would put this and your
01:56:50.560 application will change the theme. And
01:56:53.040 you will see this. By default, I'd like
01:56:55.599 to go with the coffee theme. Okay. So
01:56:58.159 just save that. and under the oath
01:57:00.159 styles here we can see for the colors we
01:57:02.960 are just grabbing them from the colors
01:57:05.639 object. Okay, so this is a pretty basic
01:57:08.800 JavaScript trick that we almost always
01:57:11.360 do when it comes to themes and then I'll
01:57:14.560 create the
01:57:16.840 homestyles.js file and then let's create
01:57:20.480 the create styles.js file as well. Let's
01:57:24.320 try to copy and paste
01:57:27.719 them. So, this is the create page.
01:57:30.320 Pretty long, but that's
01:57:33.400 fine. Paste this in. And that's it. Now,
01:57:37.280 we'll get the exact same
01:57:39.560 thing. So, this is another thing we'll
01:57:42.000 get into a bit later in the video, but
01:57:44.320 for now, just get the home
01:57:49.719 styles. Okay. So super super basic CSS.
01:57:53.840 Again, please don't get like don't get
01:57:56.159 mad. This is super basic CSS and I just
01:57:59.040 assume you already know this. So we have
01:58:01.119 things like width, height, legs, flex
01:58:03.280 direction, you know, colors, nothing to
01:58:05.920 explain. Otherwise, this tutorial would
01:58:07.840 be too many hours and we don't really
01:58:09.760 want to have something like that.
01:58:11.760 Finally, I'll create one more thing
01:58:14.239 under the let me see I think under the
01:58:16.960 library. So I'll create the lib and I'll
01:58:20.000 say utils.js file here. We'll just have
01:58:23.760 a utility function a helper function
01:58:26.960 that will basically format the date. So
01:58:30.239 we'll copy that paste this in. This is
01:58:32.400 something that we'll use later in the
01:58:33.920 video. Basically we're going to get the
01:58:36.000 date from our database which is in this
01:58:38.320 format and we would like to convert it
01:58:40.320 to be in this format. Right? So let me
01:58:42.719 pretty quickly display this is what we
01:58:45.119 have in the database. This is the format
01:58:47.920 and then this is what actually we want
01:58:50.320 to see the formatted version of
01:58:53.000 it. Okay. So it'll be possible thanks to
01:58:56.400 this function. And then very last thing
01:58:59.920 will be the images. So I have generated
01:59:02.800 these images with the help of AI with
01:59:05.840 chat GPT. So I paid $20 per month just
01:59:09.199 to create this image for you guys as
01:59:11.280 well as this icon. So let's try to
01:59:13.760 actually get those. So I'll provide them
01:59:16.320 for free. Let me just find the GitHub
01:59:18.639 repo for that. I think it is this one.
01:59:21.599 You can find the link in the
01:59:22.800 description. Currently it is private but
01:59:25.280 while you're watching it'll be
01:59:27.400 free. And I have even added some
01:59:30.159 different variations. So you can use any
01:59:32.560 of them that you wish. So this is
01:59:34.159 something that I'll not be using but I
01:59:36.080 just created that in case you want to
01:59:38.159 use it. So, we have all of
01:59:42.360 these and I think we are missing this
01:59:45.280 icon, this logo. Let me upload it as
01:59:48.080 well. All right. So, I just uploaded
01:59:49.679 that one as well. Just go ahead and
01:59:51.760 install them. And we would like to put
01:59:53.520 them under the assets folder. So, here
01:59:57.040 under the images, I'll just go ahead and
01:59:59.520 put them. Okay. So, I just pasted all of
02:00:01.840 these. I got the logo and then four
02:00:04.320 different illustrations that I called
02:00:06.480 I1, I2 all the way up to
02:00:09.000 four. Okay, so I think that's going to
02:00:11.280 be it for this quick setup section where
02:00:14.000 we just got the images, the colors, and
02:00:16.080 then the styles. I think we can delete
02:00:18.320 everything at the moment. I'll just get
02:00:20.159 rid of the styles. Let's just for now
02:00:23.119 put a text without any styling. And
02:00:27.360 actually, before we end the section, I'd
02:00:29.199 like to show you something else here.
02:00:31.280 Here I'll delete everything and notice
02:00:33.360 how we are going to get an error. First
02:00:35.440 let me do Ctrl + Z pretty quickly. So
02:00:37.840 under the container we had these
02:00:39.800 classes. I'd like
02:00:41.800 to just delete everything but leave this
02:00:45.360 container
02:00:46.840 class. Okay. So let me put them side by
02:00:51.480 side and reload my application. I'll
02:00:54.400 press
02:00:56.280 R. Okay. So if we delete the flex one,
02:00:59.760 notice how what'll happen. Actually,
02:01:01.520 I'll delete
02:01:03.400 everything and maybe we could get rid of
02:01:06.599 the say screen options. The screen
02:01:10.239 header I should say let's say show
02:01:15.159 header wait is it called header shown.
02:01:18.960 Okay, here I'll say uh you know hide
02:01:21.440 this say false. Okay. Now, as you can
02:01:24.960 tell, the content is out of the safe
02:01:27.760 area view. So, this is what we call the
02:01:30.080 safe area view. Anything within the, you
02:01:33.040 know, outside of the status bar, right?
02:01:35.520 So, here user cannot really see it
02:01:37.679 because it is behind the camera, it is,
02:01:39.920 you know, it is in the status bar. So,
02:01:42.239 to fix this, we we are going to create a
02:01:44.560 component. I'll go under the mobile just
02:01:47.280 shrink everything. Create the components
02:01:51.400 folder and I'll create a component
02:01:54.320 called save screen. Let's say JSX and
02:01:58.719 I'll get
02:02:00.520 RNF. Let's give elit spit space and get
02:02:04.080 started with it. So I'll just kill the
02:02:06.000 left hand side and let me just tell you
02:02:08.719 what we'll be doing. We will basically
02:02:10.719 take our entire application which is
02:02:12.719 this one and wrap it with the let's say
02:02:16.400 save
02:02:18.840 screen. So this is something we will
02:02:21.119 import. Let's save
02:02:24.599 it. Put this tag and then we will import
02:02:28.400 the save
02:02:32.520 screen. I know that this might look a
02:02:34.719 little bit weird but it'll make sense. I
02:02:36.639 promise just in a second. So we'll get
02:02:38.639 that under the components under the save
02:02:40.880 screen. Okay, let's save. Currently it
02:02:43.440 doesn't work but we're going to make
02:02:44.719 that work. So here basically we said
02:02:47.679 that everything in our app should be
02:02:50.480 under the save screen where we would
02:02:52.719 like to you know put the content within
02:02:55.360 the save area view. So here is what
02:02:57.840 we're going to be doing. We will take
02:02:59.599 the children which is our entire
02:03:02.080 application right the stack. So we'll
02:03:04.400 take the children and display
02:03:07.080 it. And then we'll add some styling.
02:03:10.560 I'll say style. Now we'll be using a
02:03:13.440 custom package or I should say just an
02:03:16.719 external package that has already been
02:03:18.960 installed when we create the expo
02:03:21.360 application. So you can double check
02:03:23.119 that under the package JSON. And the
02:03:25.840 package name is this one react native
02:03:29.199 save area context. So from here we'll
02:03:32.000 get a hook say insets and use save area
02:03:37.800 insets. Now you'll see the output here.
02:03:40.480 I'll say just give some padding from the
02:03:42.960 top. Let's say petting top. It'll be
02:03:45.440 inserts top. And let's give the flex to
02:03:49.199 be one. And then I'll say background
02:03:52.440 color could be from the colors.
02:03:57.199 Let's say it's going to be coming from
02:03:59.800 this constant that we have. I don't know
02:04:02.239 why we cannot see it. Let's try to
02:04:04.400 import it manually. I'll say
02:04:07.320 import the
02:04:09.320 colors
02:04:10.430 [Music]
02:04:12.679 from constants and colors
02:04:16.840 file. Okay. So why this does not
02:04:23.890 [Music]
02:04:25.000 work? Okay. So, I think my VS code is
02:04:27.599 kind of buggy. Let me fix
02:04:30.280 that. So, under the
02:04:32.840 mobile constants. Okay. Really, really
02:04:36.080 weird. But let's try to save it and give
02:04:39.520 it a go. I'll say colors do use the
02:04:42.199 background. Okay, let's save. Now, as
02:04:44.880 you can tell, the content is within the
02:04:47.520 save area view. If we didn't have this,
02:04:50.000 let me delete this petting top. Now, it
02:04:52.719 is outside of it. So this will by
02:04:54.800 default make sure that your content is
02:04:57.679 within the safe area view right which is
02:05:00.880 this container right. So it is right
02:05:03.520 here. So I hope that makes sense. This
02:05:05.360 is a component that I almost always use
02:05:08.159 in my react native applications uh to
02:05:10.880 get rid of this kind of effect right. I
02:05:13.840 don't really want my content to be
02:05:15.560 invisible. So this is a component that I
02:05:18.480 previously used as well in my previous
02:05:21.119 React Native tutorial. Now, this is kind
02:05:23.760 of not kind of, but literally annoying.
02:05:26.719 Okay, so I just paused the video and
02:05:28.320 take a look at it. I think it's because
02:05:30.320 we already have the colors coming from
02:05:32.639 the app example and we don't really need
02:05:35.119 this folder. We can delete it. That was
02:05:37.360 the previous the boiler plate
02:05:40.159 application from Expo. So, we could
02:05:42.320 literally delete that now probably and
02:05:45.520 hopefully it should work out. Okay, so
02:05:48.239 you can just delete that and bring this
02:05:49.920 back. Now, we don't really have that
02:05:51.360 there. You can delete the text. Here we
02:05:54.320 go. Okay. So, that's going to be it for
02:05:56.239 this section. Just keep this component
02:05:58.080 in mind. You can even put it in your
02:06:00.080 notes because probably in your next
02:06:02.560 applications, you would like to use
02:06:04.719 something like this, right? And we have
02:06:06.719 another option. You can put the petting
02:06:09.360 bottom as well. If your content is
02:06:12.239 overlapping with the you know with the
02:06:14.719 at the very bottom I don't know how to
02:06:16.639 call this but you can just say petting
02:06:20.599 bottom is going to be inserts bottom as
02:06:24.159 well and I think we have left and right
02:06:27.239 two okay so here I'll just have the top
02:06:30.480 only and hopefully I'll see you in the
02:06:32.960 next section so this is where we left
02:06:35.520 now let's try to set up the
02:06:36.960 authentication using clerk so you can
02:06:39.440 find the link in the description. I'll
02:06:41.280 go ahead and visit my
02:06:42.920 dashboard. Okay. So, if you go right
02:06:45.719 here, click to the dashboard and then
02:06:48.400 you should be able to see your
02:06:49.840 application. Just select that. This is
02:06:52.000 the one that we have created. I'll
02:06:53.920 select expo and we have already got the
02:06:57.040 public key. First, let's import the
02:07:00.079 package. I'll copy that. Open up my
02:07:02.880 terminal and just make sure that you are
02:07:05.040 under the mobile. So kill this paste
02:07:07.760 this in and at the same time you can set
02:07:10.800 up your env file. So I'll say env I
02:07:14.960 think they also call it as local. Let's
02:07:17.280 see. Not this is just not really that
02:07:20.079 important but like I'll just put it as
02:07:23.360 so that we have the exact same thing as
02:07:25.400 documentation. And just make sure to put
02:07:27.679 this file under the get ignore so that
02:07:30.239 you don't really push it to GitHub. Um
02:07:33.360 let's see. Just scroll to the very
02:07:35.480 bottom just put
02:07:37.719 env so that it is also
02:07:40.840 ignored. Okay. So I'll copy it and paste
02:07:44.719 this in. I think we can delete it from
02:07:46.639 the env file under the back end. We
02:07:50.000 don't really need it here on this file.
02:07:52.960 Okay. Now that we got the package, we
02:07:55.440 can start the app with MPX
02:07:58.840 expo. Let's say reload.
02:08:02.800 kill this
02:08:03.880 file and let's move on with the steps.
02:08:07.599 Okay, so they say update the layout, the
02:08:10.239 root layout, right? So I will get
02:08:13.719 this
02:08:15.320 and update that
02:08:17.800 file. So under the root layout we use
02:08:20.480 the stack instead this time we will put
02:08:23.440 the slot component which is like the
02:08:25.760 outlet if you have used it in react
02:08:28.400 right we have
02:08:29.880 outlet. So in react router DOM or react
02:08:32.960 router we had this component which
02:08:35.520 basically says put whatever page user in
02:08:38.480 right. So we'll get the slot from expo
02:08:41.159 router and then let's get the clerk
02:08:44.000 provider from this
02:08:48.679 import. And then I think we forgot to
02:08:52.159 like I accidentally delete the save
02:08:54.239 screen. Let me put that because we still
02:08:56.880 want to have our page to be under the
02:08:59.760 save area view. Okay. So that's it for
02:09:03.360 this step. Now we'll get this
02:09:06.920 package. So basically I am at the moment
02:09:09.679 doing everything the documentation
02:09:13.560 says import the expo secure store and
02:09:17.199 rerun the app. We can update the token
02:09:20.639 cache. So these are some configurations
02:09:23.199 that we are adding that clerk needs
02:09:25.440 behind the scenes to add a really robust
02:09:29.960 authentication. I'll get this import as
02:09:32.320 well. Paste this in. And I think we
02:09:35.360 should be good to go. Now we need to set
02:09:37.199 up our files. So here we will create a
02:09:40.800 group route or route group. Under the
02:09:43.679 app folder I will create this folder
02:09:46.400 with the brackets. So we'll create this
02:09:49.119 oath. Right? I will call this as oath
02:09:51.760 and we can put our authentication
02:09:53.679 screens within this file within this
02:09:56.320 folder. So here I'll have
02:10:00.040 sign-in.jsx and then I'll do the same
02:10:02.079 thing for sign
02:10:04.440 up and then we will create a layout
02:10:08.840 file
02:10:10.920 layout.jsx. So you might be asking can
02:10:13.199 we create more than one layout? Yes
02:10:15.360 absolutely. This is the root layout and
02:10:17.760 then this is the oath layout and you can
02:10:20.000 create more and more for every single
02:10:22.880 route that you have or every single
02:10:25.040 group right and then now let's copy this
02:10:28.000 for the layout this is what they say in
02:10:30.079 the documentation so under here I'll
02:10:32.880 paste this in basically this will check
02:10:35.040 if user is signed in or not if they are
02:10:37.760 signed in it will take them to the
02:10:39.360 homepage but else we will show them the
02:10:42.480 you know signin page or the signup page
02:10:45.360 okay So let's save and then the other
02:10:48.000 step is to set up the signup file as
02:10:50.800 well as the sign in. Let's put them one
02:10:53.679 by one. I'll basically copy and paste
02:10:56.159 and we will update these
02:10:59.960 files. Let's do the same thing for the
02:11:02.719 sign
02:11:03.880 in. Okay. So this is what I have. I'll
02:11:06.320 just paste this in. And then they have a
02:11:09.360 sign out button. Let's copy it.
02:11:12.880 create that under the
02:11:22.199 components. So we'll see everything just
02:11:24.560 in a second. For now, follow along with
02:11:26.880 me. And then finally, they have the
02:11:29.040 homepage, which is the page if user is
02:11:32.000 signed in or not. Right? It'll like if
02:11:34.480 they are signed in, they will see a
02:11:36.719 hello text with the user email. I'll
02:11:40.560 copy it. Now instead of calling it as
02:11:42.639 home I will say
02:11:44.760 root. So under the mobile under the app
02:11:48.000 I'll say create this root route and then
02:11:51.920 I'll put the so I will put the index.jsx
02:11:55.760 file which is my homepage. So we can
02:11:58.079 delete this one now that was just for
02:12:00.239 testing purposes. Let's put
02:12:03.480 this let's say get the sign out button.
02:12:07.280 So here we have an error because our
02:12:09.679 components are not under the app folder.
02:12:12.000 We can delete that. Now it should be
02:12:14.239 working out. And then I'll create
02:12:16.159 another file called underscore
02:12:19.880 layout.jsx. So here we'll put something
02:12:22.320 else that is going to check if user is
02:12:24.639 signed in or not. So let me just pretty
02:12:26.880 quickly provide this. I'll just paste
02:12:29.040 this in. Let me walk you through it. So
02:12:30.880 I just paste this in. Let me walk you
02:12:32.880 through it pretty quickly. This is just
02:12:34.560 a layout file where we check if user is
02:12:37.679 signed in or not. If they are not signed
02:12:39.760 in, we will take them to the sign-in
02:12:41.520 page, but else we'll show them the
02:12:43.599 homepage, right? Or whatever page they
02:12:45.920 are in. So, let's save and take a look
02:12:48.000 at the output. Hopefully, it'll work as
02:12:50.599 expected. Um, I'll reload my page. Well,
02:12:54.239 first let's delete the uh the
02:12:56.599 about.jsx and reload it
02:12:59.320 now. So, we are not authenticated.
02:13:02.239 That's why we are in the sign-in page.
02:13:04.480 So let's say sign
02:13:06.119 in. So here like there is no styles at
02:13:10.000 all but we have a text input. Let me put
02:13:12.960 my name or my
02:13:15.000 email. So I think like this is email and
02:13:18.239 this is password. I know that it's not
02:13:20.239 really visible but this is just for
02:13:22.639 testing purposes that clerk gives you.
02:13:25.119 We will change it
02:13:27.079 completely. So here we are in the signin
02:13:29.760 page. Let's go into the sign up. If you
02:13:31.760 click to it now, we are in the sign up
02:13:34.760 page. So let's take a look at the UI. We
02:13:38.719 have a text input. This is for the
02:13:41.159 verification. And then this is for the
02:13:43.280 sign up. We have a text input where we
02:13:46.159 can put the email and then the password.
02:13:48.639 And then we can submit that on press.
02:13:51.280 It'll call this
02:13:54.199 function. We're just going to call the
02:13:57.360 create method with the sign up and sign
02:13:59.920 up is coming from clerk, right? And then
02:14:03.040 we say prepare email address
02:14:05.079 verification and strategy is to send an
02:14:08.239 email code, a six-digit verification
02:14:10.719 code. And then this is going to update
02:14:13.599 the state so that we can see the
02:14:15.360 verification UI. So let's pretty quickly
02:14:17.679 go over it. I'll put the email that I
02:14:20.639 have for testing purposes. Let's get
02:14:23.360 this add
02:14:25.400 symbol. Paste this in. And I'll say
02:14:29.159 gmail.com. Now for the password, I'll
02:14:31.360 put something like 1 2 3 4 5 6. It
02:14:35.119 should fail because this is a really
02:14:36.800 weak password. If you open up the
02:14:39.360 terminal, it says it should be at least
02:14:41.760 six characters. Now, let me put an
02:14:44.719 actual secure
02:14:49.159 password. Okay. So, I'll just say
02:14:51.199 continue.
02:14:52.719 Now we got the verification code. Let's
02:14:55.360 take a look at it from my inbox. So this
02:14:57.840 is what we just got 0 minutes ago. And
02:15:00.079 this is the verification code. Let me
02:15:02.000 copy that and paste this
02:15:04.920 in. And then I'll say
02:15:07.719 verify. Okay, now we are logged in. We
02:15:10.400 can see the homepage, right? And if you
02:15:13.040 take a look at the dashboard, if you
02:15:15.040 just refresh that, you should be able to
02:15:17.520 see that this user just signed up. So
02:15:20.159 that means our authentication our
02:15:22.639 authentication system works
02:15:25.159 correctly. And by the way when we like
02:15:29.360 when we had the verification page this
02:15:31.760 is what we have seen. It says just put
02:15:34.480 your input which is coming from the
02:15:36.960 code. This is the state. Now this is
02:15:38.880 super basic react code. I don't really
02:15:41.119 know if you if you get confused but
02:15:43.679 basically we have some states. It is use
02:15:46.719 state. We have you know user router just
02:15:50.320 like in Nex.js or react router DOM you
02:15:53.280 navigate the user depending on the
02:15:55.119 actions and then we got some values and
02:15:58.239 functions from
02:16:00.520 clerk. So for the verification process
02:16:04.079 here it says just attempt email address
02:16:06.679 verification by passing the code. So if
02:16:09.440 you put the wrong code it is going to
02:16:12.159 fail right and we will even check for
02:16:14.480 that.
02:16:16.079 Okay, so here it says if it is complete
02:16:18.800 just activate the account and take user
02:16:21.040 to the homepage. This is exactly what
02:16:23.360 happened. But in the else case you can
02:16:25.280 handle this. They just put a console
02:16:27.880 log. Okay. So I hope all that makes
02:16:30.239 sense. Now we will go ahead and actually
02:16:32.558 completely change the UI so that we
02:16:35.040 could have this beautiful UI for these
02:16:37.280 pages. So this is the sign up, the
02:16:39.760 create account page, the sign in and
02:16:42.240 then the verification page.
02:16:45.439 Okay, so this is what we'll be doing
02:16:47.040 next. And just before we get into the
02:16:49.120 next section, I think we forgot to save
02:16:51.040 this file. Let's save it and try to you
02:16:54.000 know log out which is coming from the
02:16:56.240 sign out button file here. Once you
02:16:59.840 click to this button, once you click to
02:17:01.760 this touchable opacity, it'll call this
02:17:04.160 function called handle sign out and it
02:17:07.200 basically calls the sign out coming from
02:17:09.599 clerk and then it'll just redirect you
02:17:11.840 to the redirect to your desired page.
02:17:14.478 This is not really important. It'll take
02:17:16.160 you to the signup page, right? So, let's
02:17:18.638 save and click to it. Now, we are in the
02:17:22.398 signin page. So, that means everything
02:17:24.959 works correctly. Now, I just logged in
02:17:27.120 once again. And even if you don't have
02:17:29.040 this line, it should still work. It
02:17:30.959 should still navigate you to the sign-in
02:17:33.040 page. So, I'll go ahead click to it.
02:17:35.599 Now, we are signed out. Immediately, we
02:17:37.519 are in the sign-in page. And how does
02:17:39.679 that work? Well, basically under the
02:17:42.000 homepage we have this layout, right? We
02:17:44.558 say if user is not signed in, just take
02:17:47.040 them to the sign-in page immediately.
02:17:49.280 Use the redirect component coming from
02:17:52.080 expo router. Okay, so this is something
02:17:54.959 that we should keep in mind and with
02:17:57.519 that in the next section we will improve
02:18:00.080 our pages. All right, so this is where
02:18:02.638 we left. In the previous section, we
02:18:04.558 implemented the authentication in the
02:18:06.638 most basic way. Now let's try to fix our
02:18:09.840 pages because currently they look really
02:18:12.080 really ugly. So first we'll get started
02:18:14.478 with the signup page. Here we'll keep
02:18:17.280 all these states and functions. But here
02:18:20.080 I'd like to add one more state for the
02:18:22.638 error. Right? I'll say error set error.
02:18:26.638 Initially it could be an empty string.
02:18:29.200 So I'll say use state import that. And
02:18:33.439 you know instead of react use state let
02:18:35.760 me delete every one of
02:18:37.879 them. I'll just import use state from
02:18:40.638 react.
02:18:45.120 Okay, now we'll be using this. But
02:18:47.439 first, let's shrink everything and say,
02:18:50.558 you know, update the pending
02:18:52.160 verification UI. So, if you say like
02:18:55.280 this is
02:18:56.359 true, let me refresh our
02:19:00.200 page. So, I think we should visit the
02:19:03.040 signup page because this is where it'll
02:19:05.359 happen. Okay, if this is true, this is
02:19:07.679 what you're going to see. Now, we'll fix
02:19:09.599 this. Normally you don't really want to
02:19:11.359 put true but for now just to see the
02:19:13.519 output just to see the UI this is what
02:19:16.080 we're going to have. So we will return a
02:19:18.398 div which is a view component and then
02:19:21.359 we'll say style is going to be equal to
02:19:24.920 styles. Now this styles will be coming
02:19:27.599 from the oath styles file.
02:19:32.879 So let's say import the styles
02:19:36.840 from. So why my VS code doesn't really
02:19:39.679 work for the suggestions I don't really
02:19:42.000 know. So from the mobile folder we'll go
02:19:45.840 under the
02:19:48.359 assets. From here we'll go under the
02:19:50.720 styles and then we will get this folder
02:19:53.840 or the file which is oath.styles.js
02:20:00.040 JS where we have the styles import
02:20:04.200 right okay let's
02:20:06.439 save and shrink the left hand side now
02:20:09.359 here I'll say styles
02:20:12.120 doverification
02:20:19.160 container okay once you save it'll be
02:20:21.680 updated and then for the text I'll put
02:20:24.160 the verification title class let's save
02:20:27.280 UI is just getting better, right? And
02:20:29.840 then now we'll just check if we have an
02:20:32.080 error or not. What I'd like to do just
02:20:34.399 copy and paste and walk you through it.
02:20:36.560 Super simple. Five lines of code. So we
02:20:39.280 say if there is an error, display this
02:20:41.600 UI, but else don't show anything, right?
02:20:44.640 Let's import the colors. So this is
02:20:46.960 absolutely annoying. Let me just say
02:20:49.040 reload the
02:20:50.439 window so that hopefully it
02:20:53.319 works. Okay, it doesn't now. That's
02:20:56.080 fine. we'll import it manually but here
02:20:58.560 we are using an icon right so this is
02:21:01.120 coming from expo icons let's scroll to
02:21:03.920 the top so here I'll bring the import it
02:21:08.240 is coming from vector icons from expo so
02:21:11.760 we have bunch of different options so
02:21:13.840 like we are using ion icons but we have
02:21:16.399 like ant design let's see do we have any
02:21:20.240 other icons so we have evil icons
02:21:23.840 material icons bunch of different
02:21:25.760 options
02:21:26.560 This is the one that we'll be using in
02:21:28.240 this file. And let's import the colors
02:21:30.880 as well from the
02:21:34.120 constants. Okay, let's try to save. And
02:21:36.800 I'll just say let's have an
02:21:38.760 error. This is the container that you
02:21:41.200 would have for the error. Let's say, you
02:21:44.240 know, something went
02:21:47.080 wrong. This is how it would look like.
02:21:50.160 And you can close that. Obviously, for
02:21:52.000 now, it doesn't really work, but we'll
02:21:54.240 make that work because this is currently
02:21:57.640 hardcoded. So, basically, when you click
02:22:00.160 to this close icon, it will set the
02:22:02.720 state to be null so that this container
02:22:05.680 is just disappears, right? Okay. I hope
02:22:09.120 that makes sense. So, that was for the
02:22:11.439 error UI. Now, let's move on here. For
02:22:13.920 the text input, we would like to update
02:22:16.000 it. So, we'll keep the value, the
02:22:17.840 placeholder, the own change. But for the
02:22:21.760 you know for the styles we can add some
02:22:23.520 classes here. I'll do something else
02:22:25.840 that you have never seen before. I'll
02:22:28.000 say style. Now instead of an object this
02:22:30.880 will be an array. Now why this is the
02:22:33.040 case? Let's see. I'll say styles
02:22:36.120 doverification input. So let me pretty
02:22:39.120 quickly copy and paste. So this will
02:22:41.600 always be applied right. But we will say
02:22:44.640 if we have an error actually this should
02:22:48.080 be a comma. I'll say if we have an error
02:22:51.280 only then apply this which is the styles
02:22:54.399 do error
02:22:57.080 input. So you would use this array
02:22:59.520 syntax whenever you have something like
02:23:02.200 dynamic. So if we don't have an error we
02:23:04.880 will not get this class. Since this is
02:23:07.040 false we don't really get anything. But
02:23:08.960 if it was true the UI would be
02:23:13.080 updated. Okay. So in this case we're
02:23:15.600 going to put the error as the state. So
02:23:17.760 let's save the UI will be updated. Now
02:23:20.240 I'd like to change the placeholder text.
02:23:22.880 It is not really visible. So let me put
02:23:25.840 this value. Now it looks pretty cool.
02:23:28.319 And finally we would like to update the
02:23:30.240 button, right? The touchable opacity
02:23:32.640 here. I'll just say this style will be
02:23:34.800 the button that we have under the styles
02:23:37.600 so that we can get this output. And then
02:23:40.080 for the button text, I'll say style is
02:23:43.680 going to be styles dot button
02:23:48.680 text. Okay. So notice how if I visit the
02:23:52.479 colors file and if I wanted to use the
02:23:55.120 forest, everything is going to update
02:23:57.600 easily, right? I can change to be
02:24:00.920 ocean and purple.
02:24:03.920 Okay, so this is how easy it is to
02:24:05.760 update our theme thanks to this like
02:24:08.800 thanks to these files, right? As well as
02:24:11.600 the styles. Let's go into the old
02:24:15.000 styles.js. We are just using the colors,
02:24:18.240 right? That could be background, that
02:24:20.560 could be the white color, the border
02:24:22.479 color, text color. Everything is coming
02:24:24.800 from these objects. So I hope that makes
02:24:27.840 sense. I'll be using the copy by
02:24:29.760 default. And now I also want to get rid
02:24:32.800 of this header under the oath
02:24:37.319 file. Um here I'll just say screen
02:24:40.920 options header shown to be false.
02:24:44.560 Hopefully we'll get rid of that. Here we
02:24:47.880 go. So that was the verification UI. But
02:24:51.439 of course this is not going to be true.
02:24:53.200 It is going to be pending verification
02:24:56.160 only. In this case you are going to see
02:24:57.920 that UI by default. we would see the
02:25:00.640 signup page, the signup screen. And now
02:25:03.120 let's try to fix it. First, we can get
02:25:05.840 rid of this fragment that we don't
02:25:07.680 really need. And in this view, we'll
02:25:10.319 have some
02:25:11.479 classes. I think for now, we can just
02:25:13.840 say style is going to be flex of one so
02:25:17.520 that it is taking the entire screen. And
02:25:19.920 then maybe we can center that. I'll
02:25:23.640 say like
02:25:25.880 align content center. It should be
02:25:30.479 Maybe just apply content as
02:25:32.760 well.
02:25:34.280 Okay, maybe this should be align items.
02:25:37.439 Okay, here we go. Everything is being
02:25:39.040 centered. We are going to change this a
02:25:41.120 bit for now. Let's move on here. I'll
02:25:43.920 have another view that is going to wrap
02:25:46.399 everything. So, I'll cut that. Put it
02:25:49.280 right here. And then for the
02:25:52.359 styles we'll use the
02:25:55.960 styles dot let's say
02:25:59.560 container. After this one we are going
02:26:01.920 to get the image and in this case I'll
02:26:04.479 be using the second illustration that we
02:26:07.280 have. So I'm just importing it from the
02:26:09.280 assets. Let's import the expo
02:26:12.680 image here. I'll just scroll to the top.
02:26:15.200 I'll say import image from expo
02:26:23.800 image. Okay, so we have the image. For
02:26:26.399 some reason, it does not work. So I just
02:26:29.040 paused the video and try to understand
02:26:31.120 why that was the case. It's because
02:26:33.439 under the illustration class, we don't
02:26:36.000 really have the width to be a fixed
02:26:38.080 value. Previously, it was 100%. So I
02:26:41.520 just had to delete that and bring a
02:26:44.399 value like 300. Once you have done the
02:26:46.880 same thing, it should work out
02:26:48.720 correctly. So we got the image that
02:26:50.960 means we can move on with the text here.
02:26:54.240 Instead of sign up, I'll just say create
02:26:56.880 the account with this class called
02:26:59.520 title. And then within this uh right
02:27:03.280 after this one, we will put the exact
02:27:05.280 same thing that we had above. So it'll
02:27:08.800 be the error container. I'll copy
02:27:13.399 it and just paste this in. Okay. So if
02:27:17.120 we have an error, we'll just see it
02:27:19.280 right
02:27:20.760 here. And then we have the text input
02:27:23.760 for the email. So here it says do not
02:27:26.560 capitalize by default. So here we just
02:27:29.040 had none. The value is the email
02:27:31.200 address, the placeholder as well as the
02:27:33.439 onchange text. it'll basically update
02:27:36.000 the state with whatever user passes.
02:27:38.479 Right? So I will delete this and paste
02:27:41.040 my version. It's the exact same thing. I
02:27:43.680 just added the placeholder text as well
02:27:45.840 as this style. Let's save. Now this is
02:27:48.800 how that look. Let's do the same thing
02:27:50.960 for the password. I'll copy it and paste
02:27:54.720 this
02:27:56.120 in. Okay. So here we have let me save.
02:28:00.560 This is the output that we have. Now you
02:28:02.560 might be asking how does that work that
02:28:04.800 we don't see the characters. It's
02:28:07.359 because we have the secure text entry to
02:28:10.319 be equal to true. If it was false you
02:28:13.200 would see the
02:28:14.520 password. Okay. So let's bring this back
02:28:16.880 and it should be true. Whenever you
02:28:19.040 change the value it'll update the state
02:28:21.760 for the password. And then for the
02:28:24.479 continue text, I think we can delete
02:28:26.880 that and just put something like sign up
02:28:30.479 with the with the button class as well
02:28:32.800 as the button text so that we can get
02:28:35.439 this output. And then finally, we'll put
02:28:37.840 a beautiful UI. So at the moment, I'm
02:28:40.479 just copying and pasting. I can feel
02:28:42.640 like it is a little bit annoying, but
02:28:44.800 there is nothing related to React
02:28:47.040 Native. These are just some, you know,
02:28:49.520 views, texts, and some classes. So
02:28:52.720 that's why I'll just go ahead copy and
02:28:55.439 paste and walk you through it. So we got
02:28:57.920 a view with this class and then the
02:29:00.160 footer text that says already have an
02:29:02.479 account. If so, you have this link or
02:29:05.520 the button that will take you back. So
02:29:08.720 if you clicked it, you'll go back to the
02:29:10.640 signin page with the router.back method.
02:29:14.399 And the router is coming from Expo from
02:29:18.000 Expo router. So I'll click to it. We are
02:29:21.040 in the signup page and we can click to
02:29:23.040 this one. We can go back now. Everything
02:29:25.280 looks fine but we actually have a
02:29:27.680 problem. I don't know if you have
02:29:29.280 realized it but just press command shift
02:29:32.080 K bring the uh bring the keyboard. So
02:29:35.439 whenever you click to the let me refresh
02:29:38.640 the page. Sorry just refresh the
02:29:40.960 application. So whenever you click to
02:29:42.960 the input it is not really visible right
02:29:45.680 keyboard overlaps that. So to fix this
02:29:49.280 we have a couple of different options.
02:29:51.040 There is a component coming from React
02:29:53.120 Native called keyboard avoiding view.
02:29:56.160 Now you can use this instead of the
02:29:58.319 basic view that we have. So I'll say
02:30:00.800 keyboard avoiding
02:30:02.840 view. So by default it is not going to
02:30:05.439 fix it. You had to add some options. So
02:30:08.399 instead of doing that I'll be using a
02:30:10.439 package which is this one. Let me pretty
02:30:13.640 quickly show you this. So, React Native
02:30:16.640 keyboard keyboard aware scroll view. So,
02:30:19.600 it's really popular and this is the
02:30:22.080 output that you would have whenever you
02:30:24.399 click to an input. It'll just scroll
02:30:27.160 automatically because it is aware of the
02:30:30.080 situation. So, let's try to copy it
02:30:33.960 and you know run this from our
02:30:38.439 terminal. So, it has just been
02:30:40.399 installed. Let's run the application and
02:30:43.120 we are going to set this up. So instead
02:30:45.439 of this we'll say keyboard aware scroll
02:30:50.920 view which is going to be coming from
02:30:53.359 that package. Let me get the
02:30:56.280 import and we can delete the link as
02:30:59.200 well as this one that we are not using.
02:31:01.600 So we're going to be using this from
02:31:03.120 that
02:31:04.439 package here. Uh let's delete the
02:31:08.120 styles. And for the style, we'll only
02:31:10.640 have the flex of one. And then we'll say
02:31:13.680 content container style will be
02:31:16.319 incremented like flex grow of one. And
02:31:19.200 then we'll say enable it on the Android
02:31:21.520 as well as well as enable the automatic
02:31:24.319 scroll. And then now we can save and
02:31:26.880 give it a go here. I'll refresh my
02:31:31.160 application. Okay, looks like it
02:31:33.200 crashed. Let's say press
02:31:37.399 I so it can run
02:31:43.720 this and I'll clicked it. Now here we
02:31:47.200 can see it just scrolls automatically
02:31:49.439 and if you click outside it's going to
02:31:51.439 close that. Same for this one. Pretty
02:31:54.240 cool. You can add even more things which
02:31:57.040 are coming from the documentation. So
02:31:59.120 I'll put something like extra scroll
02:32:01.520 height. Let's say it'll be 100. So if
02:32:04.560 you click to this one, it'll scroll even
02:32:06.960 more, right? So we have 100 space, extra
02:32:11.120 space. If you delete that, notice how
02:32:14.160 it'll only scroll as much as needed,
02:32:17.280 which is something that I'll
02:32:19.640 leave. And I just opened the application
02:32:22.399 in the Android as well as the iOS
02:32:24.880 physical devices. So let's double check
02:32:27.200 if it is working correctly. I'll click
02:32:29.280 to this. it scrolls automatically,
02:32:31.600 right? And for the password, you know,
02:32:34.560 keyboard scrolls and UI updates uh
02:32:37.720 automatically. Same for the iOS, I mean
02:32:40.960 Android. Here you can see the keyboard
02:32:43.920 doesn't really overlap with the input.
02:32:48.200 Okay. Now, we can
02:32:51.240 actually visit the sign-in page and get
02:32:54.080 started with it. Currently, it looks
02:32:56.240 really, really ugly. So I'll visit the
02:32:58.640 sign-in page and all we have to do just
02:33:01.520 repeat ourselves because the
02:33:03.280 functionality is already working. We'll
02:33:05.439 just update the UI. Right. So we
02:33:07.920 previously checked that we can sign up
02:33:09.920 correctly successfully and we can sign
02:33:12.920 in. Okay, just to speed up the process,
02:33:15.760 I'll go ahead and do some copy pasting,
02:33:18.000 but I'll walk you through it 100%. So
02:33:20.800 we'll get our import at the very top and
02:33:23.600 let's actually get the image as well
02:33:25.840 from React Native. We'll be using that.
02:33:29.200 So let's scroll to the bottom where we
02:33:31.359 have this view. We are going to update
02:33:33.680 it with the keyboard aware scroll view
02:33:37.520 so that we have this beautiful scroll
02:33:40.640 animation. Right? The keyboard doesn't
02:33:42.720 really overlap with the text
02:33:45.479 input. Okay. So the other thing we'll
02:33:48.240 have is the container view. Let me put
02:33:51.040 that and wrap the entire application
02:33:53.359 with
02:33:55.479 it and just make sure that this is
02:33:58.080 called keyboard aware scroll
02:34:01.720 view. Okay. So I'll get the container
02:34:04.960 class on this view. The styles should be
02:34:08.080 imported
02:34:09.240 from from the oath
02:34:13.640 styles. And then for the text we will
02:34:16.160 have something like welcome back. And
02:34:18.399 just above that we will have the image.
02:34:20.720 So let's paste this in. This is what we
02:34:22.640 have. If you wanted to you can update
02:34:24.800 the image but this is what I'll have in
02:34:27.840 the signin page. And then let's put the
02:34:30.720 error container just like previously
02:34:33.280 right after the welcome back text. I'll
02:34:36.479 paste this in. Let's import the ion
02:34:39.800 icons. get the colors and let's create
02:34:43.600 this error
02:34:49.560 state. Let's say use state of null. But
02:34:53.040 first, let's delete those and say this
02:34:56.479 is going to be use
02:34:59.479 state. I'm too lazy to type this out.
02:35:02.080 I'll just paste
02:35:03.319 in. Okay, this is what we have. If we
02:35:05.920 had an error, this would be the output.
02:35:10.240 Okay. And then we'll update the text
02:35:12.080 input which is going to be for the email
02:35:15.280 here. I'll go ahead delete this one.
02:35:17.200 Paste this in. We have the placeholder
02:35:20.240 uh I mean the placeholder and then the
02:35:22.560 text color and then some styles. This is
02:35:25.520 what we have. And then let's get the
02:35:27.399 password. So this is exact same thing
02:35:29.680 that we have done in the signup page. I
02:35:32.000 hope you are not really bored just
02:35:34.319 because we copy and paste. And I really
02:35:36.560 really hope that you are not angry
02:35:38.319 because you don't really learn anything
02:35:39.920 at this point. These are the things that
02:35:41.920 you have learned a couple of minutes ago
02:35:44.160 right here.
02:35:45.479 Right. Okay. So I'll just paste this in.
02:35:48.479 And then I think we need to put the sign
02:35:52.560 in button which is going to be a
02:35:54.479 touchable opacity. So I will just update
02:35:57.359 that. This is what we have. on press we
02:35:59.840 are going to call the function that will
02:36:01.840 log us in and then at the very bottom we
02:36:04.640 will handle the
02:36:07.800 navigation so I'll delete this view
02:36:10.319 paste this in now here if you put a
02:36:12.960 single code I think eslint is going to
02:36:15.520 give you a warning so it says use one of
02:36:18.399 these options to escape the single code
02:36:22.080 and here we are using add
02:36:24.760 apos and then semicolon so that we don't
02:36:27.920 really get any warnings. Really
02:36:30.000 annoying, really used to a bit, but this
02:36:31.840 is what ESLint wants you to have. So, we
02:36:34.640 have to listen to it. And then we have
02:36:37.359 the link and then we have the touchable
02:36:39.359 opacity within that. That is going to
02:36:41.520 take us to the signup
02:36:44.680 page. Let's try to sign in with the
02:36:47.120 account that we have
02:36:49.560 created. So, I'll just kill the keyboard
02:36:52.000 so that I can type this out pretty
02:36:53.840 quickly. Now for some reason I cannot
02:36:56.160 add the ads symbol. I'll just do it in
02:36:59.600 this way. Copy and
02:37:04.760 paste. Now let's put the wrong password
02:37:08.760 actually. So I'll put the wrong
02:37:11.720 one. Let's
02:37:14.120 see. Okay, it says password is
02:37:16.720 incorrect. But I think we cannot see it
02:37:19.920 because in the function we didn't really
02:37:21.920 handle that, right? So here if we have
02:37:24.800 an error we only console log it instead
02:37:27.120 of actually you know instead of instead
02:37:30.479 of actually properly handling that. So
02:37:33.359 for this I'll go under the catch instead
02:37:36.000 of just console logging it I will paste
02:37:38.319 this in. So what are we doing? We are
02:37:41.439 just going under the code right under
02:37:43.520 the errors under the code we say if the
02:37:46.399 password is incorrect. If this is the
02:37:48.800 case, just set the error to be this
02:37:51.680 value. But else just put something like
02:37:54.399 a general message. Let's say UI should
02:37:57.760 be
02:37:58.439 updated. Here we go. But if it is
02:38:01.680 correct, so I'll put the correct one. We
02:38:04.640 should be logged in
02:38:09.319 hopefully. So is it wrong again? Let me
02:38:12.399 double check. I'll put the correct one.
02:38:20.880 Okay, looks like it's correct. Now we
02:38:23.200 are logged in uh and navigated to the
02:38:26.399 homepage automatically. Now there is one
02:38:28.479 more thing that I'd like to optimize in
02:38:30.800 the signup page. So let's try to see
02:38:33.200 what I mean. If I try to sign up with
02:38:35.600 the exact same email. So I'll just put
02:38:37.760 this one. Let me get the add
02:38:44.040 symbol and I'll just put a password.
02:38:47.200 Let's say sign up. Now if you check the
02:38:49.840 terminal, it says this email address is
02:38:52.560 already taken. Please try another one.
02:38:55.439 So we can double check this code as
02:38:57.680 well. If this is the case, we can throw
02:39:00.319 an error like this one. So for this
02:39:03.520 we'll go under the on signup press and
02:39:07.280 under the catch we can handle that. So
02:39:10.240 I'll provide this to
02:39:12.840 you here. I'll paste this in. Let's try
02:39:15.840 to sign up. Okay, this is the case. So
02:39:18.960 we hit the hit the if check and update
02:39:21.760 the state so that UI can be updated. If
02:39:24.720 you click to this one, it'll just it'll
02:39:26.720 be gone. Now, just to double check
02:39:28.640 everything is working, I'll go delete
02:39:30.960 this user and sign up from
02:39:33.240 scratch so that we can see if the verify
02:39:36.160 page is still working correctly. Okay,
02:39:39.359 user has been deleted. We can go into
02:39:41.840 the signup page. Let me put a correct
02:39:45.160 password. So, if you put something like
02:39:47.520 1 2 3, you will get this error which you
02:39:50.960 can handle it. So all you have to do
02:39:53.439 just take a look at the
02:39:55.960 terminal. Okay, I think we are not
02:39:58.080 console logging it but let's let's do
02:40:00.479 it. Say console log the error itself.
02:40:04.080 Sign
02:40:05.399 up. Okay, you can basically take this
02:40:08.399 error and put it into the terminal or
02:40:10.720 into the UI. I'll skip that because I
02:40:13.200 already show you how you can handle the
02:40:15.880 errors. Let's try to actually put a
02:40:18.800 correct password.
02:40:21.680 or a password that is going to be
02:40:24.760 accepted. So, it'll take us to this
02:40:27.399 page. Let's get the verification
02:40:30.760 code. Okay. So, I just got that. Let me
02:40:33.760 copy and
02:40:36.280 paste. Let's say verify. We are in the
02:40:40.040 homepage. And from the dashboard, we
02:40:42.800 should be able to see that user that has
02:40:44.880 just logged in. Okay. So I think that's
02:40:47.600 going to for the entire authentication
02:40:50.600 flow. We already built it but we just
02:40:53.439 had to update the UI. I think the most
02:40:55.920 important thing that you should keep in
02:40:57.520 mind from this section is this component
02:41:00.479 because otherwise you would get the
02:41:02.960 strange behavior where the keyboard is
02:41:06.479 overlapping with the content right with
02:41:08.720 the text input. So this is definitely
02:41:11.200 something that you should keep in mind
02:41:12.880 for your next project. Okay. So I just
02:41:16.160 closed every single file that we had.
02:41:18.240 Normally I was going to end this section
02:41:20.399 right here but I just said let me take a
02:41:22.640 quick step back and try to explain
02:41:24.640 everything that we have done so far so
02:41:26.800 you don't really you don't really get
02:41:28.439 confused. So we just said that this app
02:41:30.960 folder is special for expo where we have
02:41:33.840 our navigation files and we have some
02:41:36.399 special files like underscore layout as
02:41:39.439 well as the index.jsx. Then we have some
02:41:42.240 routes. So everything starts from the
02:41:44.720 root layout where we have handled the
02:41:46.880 authentication thanks to clerk. Then we
02:41:49.520 have this safe screen trick which is a
02:41:52.240 component that we have created so that
02:41:54.560 our content is not overflowing with the
02:41:57.520 status bar. Right? We just added this
02:42:00.080 inserts top which is going to be
02:42:02.319 dynamic. Our content is always visible.
02:42:05.840 Okay. Then we put the slot component
02:42:08.399 which is going to render the currently
02:42:10.399 selected content.
02:42:13.120 And then we have the oath pages that has
02:42:16.080 a layout file which is going to check
02:42:18.319 for the authentication. So if you are
02:42:20.560 signed in and if you want to visit the
02:42:23.160 authentication authentication pages you
02:42:25.840 cannot see that right it says if you are
02:42:28.000 logged in you will be redirected to the
02:42:30.439 homepage and then we have the sign in
02:42:33.120 and sign up pages which are mostly
02:42:35.600 coming from clerk. So all we had to do
02:42:38.399 just update the UI right with this
02:42:41.040 component and some icons some error
02:42:44.000 containers and for the icons we are
02:42:46.399 using ion icons and here is how that
02:42:49.200 work. All you have to do just add a
02:42:51.359 name. So here we use the close icon but
02:42:54.240 you could use bunch of different
02:42:56.840 things. I mean like all of them are
02:42:59.359 coming from you know ion icons. So
02:43:02.880 literally thousands of different icons
02:43:05.520 and we'll be using bunch of different
02:43:07.760 icons. So this is the one called close
02:43:10.960 that would give you this output
02:43:14.479 uh sorry this one and then we have like
02:43:17.040 alert circle which is this
02:43:19.640 one. Okay then let's see what we have
02:43:23.000 done. We have used this component as I
02:43:25.680 said which is coming from this package.
02:43:28.080 Otherwise the keyboard is going to
02:43:30.000 overflow the inputs. Then we did the
02:43:32.960 similar thing in the signup page. So
02:43:35.439 there is no reason to explain this. Like
02:43:38.800 honestly it feels like an English
02:43:40.560 sentence. You can just read the
02:43:42.240 comments. Everything should be pretty
02:43:44.319 clear. We just handled the error cases
02:43:47.359 just to have a better
02:43:50.040 output. And then let's see under the
02:43:52.640 root we have a layout file as well. This
02:43:55.760 is going to handle the navigation. the
02:43:58.240 redirection if user is not authenticated
02:44:00.960 we will take them to the sign-in page
02:44:03.920 and then the homepage content currently
02:44:06.560 this doesn't really do anything in the
02:44:08.640 next section we are going to fetch data
02:44:11.040 so that we can have this kind of a
02:44:13.520 output right so this is the homepage
02:44:15.760 that we're going to build in the next
02:44:17.279 section I hope everything makes sense so
02:44:20.000 far like I can understand if it is your
02:44:23.200 very first time some some stuff could be
02:44:26.160 really annoying and confusing using, but
02:44:28.640 I would say it's going to get a lot
02:44:30.960 easier and a lot more it's going to make
02:44:33.279 a lot more sense as we go through the
02:44:35.439 tutorial. Okay, so I hope you enjoyed
02:44:37.760 it. I'll see you in the next section.
02:44:40.240 Now, it is time to get started with the
02:44:42.319 homepage. So, this is the end result
02:44:44.319 that we're going to have. Basically, we
02:44:46.240 need a query so that we can get the
02:44:48.720 balance. This is what we call the
02:44:50.479 summary. And then we have the
02:44:52.279 transactions. This is another get
02:44:54.319 request. And then we are going to need a
02:44:56.240 delete request so that we can delete the
02:44:58.880 transactions. Right? So to be able to
02:45:01.120 fetch those, we need to pass the user
02:45:03.120 ID. Let's take a look at it. Under the
02:45:05.880 server.js under under the routes, we say
02:45:09.040 that if we want to get the transactions
02:45:11.120 by user ID, we need to pass the user ID
02:45:13.840 into the URL. And same for the summary.
02:45:17.120 And if we want to delete one, we need to
02:45:19.200 pass the uh transaction ID that we would
02:45:22.080 like to delete. Right? Okay. So let's
02:45:24.399 keep this in mind and try to build those
02:45:27.000 functions. Now for this I will create a
02:45:29.760 hooks folder and we are going to create
02:45:32.160 a custom hook called use
02:45:36.200 transactions.js file. So this has
02:45:38.560 nothing to do with React Native. This is
02:45:40.720 going to be a super simple React custom
02:45:43.920 hook. Okay. So this is just a React
02:45:46.479 custom hook file. It has nothing to do
02:45:49.279 with React Native. your React knowledge
02:45:51.600 should be enough to build this entire
02:45:53.439 file. Okay, so let's go ahead and get
02:45:55.760 started with it. First, I'd like to
02:45:57.680 export this use transactions book. Let's
02:46:02.240 say this is going to
02:46:04.120 be an arrow function and we would like
02:46:07.200 to get the user ID as the argument and
02:46:10.000 then we are going to have couple of
02:46:11.439 different states. So, let me just
02:46:13.359 provide them to you. We will have the
02:46:15.439 transactions state which is going to be
02:46:17.680 an empty array. Once we fetch it, it'll
02:46:20.560 be an array of transactions like these
02:46:23.120 ones, right? And then we're going to
02:46:24.880 have a state to keep track of the
02:46:27.040 summary where we have the balance,
02:46:29.200 income, and expenses, which is going to
02:46:32.000 be an object. Let me provide that one as
02:46:34.600 well. So, we have the summary with
02:46:37.279 balance, income, and expenses. By
02:46:39.520 default, you can put anything. I'll just
02:46:41.359 go with zero. And we will update them.
02:46:43.840 And then for the loading state we will
02:46:46.000 have the true by default because we
02:46:48.160 would like to fetch it immediately once
02:46:50.319 we fetch that. This is going to be equal
02:46:52.080 to false. Now I would like to create a
02:46:55.240 variable here. I'll say con API URL so
02:47:00.240 that we don't really need to type this
02:47:01.840 out again and again. So we'll say
02:47:05.720 http localhost 501 /
02:47:10.359 ai which is our API URL right and then
02:47:13.760 we're going to have couple of different
02:47:15.200 functions. So first I'd like to say get
02:47:18.240 the transactions let's say fetch
02:47:21.080 transactions which is going to be an
02:47:23.200 async
02:47:25.080 function where we'll have a try and
02:47:27.520 catch block. Under the try, we can get
02:47:29.680 the response by sending a fetch request
02:47:33.200 to let's just put back. We'll say API
02:47:37.160 URL slash it is a
02:47:40.439 transactions and then slash whatever the
02:47:43.439 user ID is. Let's put the user ID and
02:47:46.960 then we'll get the
02:47:48.760 data say await
02:47:52.840 response.json. Once we got the data, we
02:47:55.439 can set our state with it. So I'll say
02:47:57.279 set transactions with this data and for
02:47:59.920 the catch case I'll just put a console
02:48:01.840 log to simply handle this. Now we'll be
02:48:04.960 calling this function under a use effect
02:48:07.439 and I'd like to optimize this function.
02:48:10.240 So for now I'll just cut that. Okay. So
02:48:12.399 cut it with me. We'll say wrap this with
02:48:15.040 a use call back function. Okay. So let's
02:48:17.680 say use callback which is coming from
02:48:19.680 react. Now we can pass the function and
02:48:22.800 then as the dependency array we will put
02:48:25.120 the user ID. So whenever the user ID
02:48:28.000 changes it's going to recreate this
02:48:30.399 function. So let me just put a comment.
02:48:32.960 Let's say use callback is used for
02:48:38.359 performance
02:48:39.960 reasons it will memorize the function.
02:48:44.560 So it'll basically cach that. So if you
02:48:47.439 hover over that you can read it. Um,
02:48:49.760 it's the exact same thing that I just
02:48:51.439 said. Now, in the same way, I would like
02:48:53.520 to create one more function that will
02:48:55.680 get the summary. Since it's the same
02:48:57.920 thing, I'll just paste this in super
02:49:00.080 basic JavaScript code, right? Super
02:49:02.399 basic react code where we wrap the
02:49:04.720 function with the use call back hook.
02:49:07.200 And then finally, we will have one more
02:49:09.760 function to be able to call both of them
02:49:12.800 at the same time. So, I'll just paste
02:49:14.720 this in. It is called as load data. So
02:49:18.160 this function is going to call the fetch
02:49:20.560 transactions as well as the fetch
02:49:22.319 summary at once. So here we just say
02:49:25.240 promise.all so that these functions can
02:49:28.200 be run in
02:49:31.319 parallel. Now what do I mean like maybe
02:49:34.160 as a beginner you would do this. You
02:49:36.240 would say instead of this entire thing
02:49:39.120 let me type this out. I'll say erate
02:49:41.439 fetch
02:49:43.000 transactions and then once this is done
02:49:45.600 just go ahead fetch the summary. So you
02:49:48.560 can do it in this way as well but there
02:49:50.560 is no reason like there is no reason to
02:49:53.760 do it in this way because here is how
02:49:55.920 that work. First you will run this.
02:49:58.080 Let's say it'll take 2 seconds. Until
02:50:00.560 this is done you cannot call that. Once
02:50:02.880 this is done then you can call this
02:50:05.040 right? But it doesn't have to be. we can
02:50:07.760 fetch this first or this one first right
02:50:11.359 we can just call them at the same time
02:50:13.520 whichever ends first we're going to get
02:50:16.120 that so instead of doing doing it in
02:50:19.200 this way I hope I have explained it
02:50:21.760 clearly but basically instead of doing
02:50:24.000 in this way you would like to call them
02:50:25.680 in parallel so that this doesn't have to
02:50:28.319 wait for this one or vice versa okay and
02:50:31.840 then we are updating the aloing state
02:50:33.920 finally we'll just say it's going to be
02:50:35.600 equal to false these These are the get
02:50:38.319 methods that we have. At the very end, I
02:50:40.800 will add the delete functionality. So
02:50:43.120 I'll say delete transaction. This is a
02:50:45.439 function that takes the transaction ID
02:50:48.080 where we sent a delete request to this
02:50:50.640 URL. And if it is done, we will load the
02:50:53.520 data again to refresh the UI. And now we
02:50:56.960 we are using the alert. Let's import it
02:50:59.359 from React Native. So here I'll just
02:51:01.680 scroll to the top. Let's say import the
02:51:04.760 alert from React
02:51:07.560 Native. Let's say alert. It should be
02:51:10.520 okay. Now depending on the success case
02:51:13.840 or error case will show an error or a
02:51:16.720 success message. So you're going to see
02:51:18.880 you're going to see this once we call
02:51:21.120 this function. Okay. Now this is the
02:51:23.600 entire hook. All we want to do just go
02:51:25.920 at the very bottom still within the
02:51:28.479 hook. Okay. Within the hook, we'll just
02:51:31.120 say return an object with all these
02:51:33.200 fields. So, we would like to return the
02:51:35.279 transactions. We would like to return
02:51:37.200 the summary, the is loading state, and
02:51:39.520 then our functions, which is the load
02:51:41.840 data as well as the delete
02:51:44.920 transaction. Okay, so these are the only
02:51:47.200 two functions that we will export. We
02:51:49.520 will return. Now, you might be asking
02:51:51.680 why don't we return this function as
02:51:54.160 well as this one? Because they are
02:51:56.319 called under the load data. Okay.
02:52:00.000 Now let's try to actually call this hook
02:52:02.319 under the homepage. Here I'll visit the
02:52:05.240 index.js file and let's try to you know
02:52:09.760 call that hook. I'll say use
02:52:12.359 transactions and here we would like to
02:52:14.560 pass the user ID right this hook wants
02:52:18.000 you to pass the user ID and we can get
02:52:20.319 that by doing user dot id which is
02:52:24.319 coming from clerk and then we'll just
02:52:26.560 say from this hook we are getting a
02:52:28.560 couple of different values such as the
02:52:30.920 transactions we are getting the summary
02:52:33.520 we are getting the loading state the
02:52:35.680 load data method as well as the delete
02:52:38.200 transaction method or the function
02:52:40.880 Now what I'd like to do just say under a
02:52:43.200 use
02:52:44.200 effect call the load
02:52:48.680 data and then we'll just say uh leave
02:52:51.760 this as empty but I think we are getting
02:52:53.760 a warning. So let's say just add the
02:52:56.160 load
02:52:57.319 data. Okay, I'd like to console log
02:53:00.000 this. Let's say console log data is
02:53:03.840 loaded and we can get the transactions
02:53:07.120 or actually let's say
02:53:12.120 transactions and then let's do the
02:53:14.240 summary as
02:53:18.760 well.
02:53:21.720 Okay. Now looks like we got an error. Uh
02:53:24.720 let's try to see why this is the case. I
02:53:27.359 think it's because I am not running the
02:53:29.200 back end here. Here I'll go ahead run
02:53:31.880 this. Let's say cd back end and say mpm
02:53:35.279 run a dev. Now if you are running the if
02:53:38.399 you're running the application from your
02:53:40.240 physical device you're going to get into
02:53:42.479 an error and I'll give you the solution
02:53:44.479 in a couple of minutes. But for now just
02:53:46.880 follow along with me. Go ahead run the
02:53:49.040 back end in the mobile. Now reload this
02:53:51.520 app by pressing R. And I am logged in.
02:53:54.880 As you can tell we got the balance,
02:53:57.279 expenses and income. So it is working
02:53:59.680 correctly. The only issue that we have
02:54:02.800 like let me let me display I'll say
02:54:06.080 console log user ID and let's say user
02:54:09.680 do ID which is coming from clerk. We
02:54:12.240 should be able to see it. Okay. So this
02:54:14.560 is the user ID but in our transactions
02:54:17.760 we put some test user ids. Let me
02:54:21.960 refresh. Okay. So let's try to actually
02:54:24.880 put the correct user ID. So, I'll paste
02:54:27.279 this in. Paste this in. Uh, let's say
02:54:30.319 paste this in as
02:54:32.760 well. Now, our balance should be
02:54:35.640 updated. I'll go under DBS code. Let's
02:54:39.520 reload our
02:54:42.359 app. Okay. So, as you can tell now, the
02:54:45.760 balance is actually coming from the API,
02:54:48.880 right? That means everything is working
02:54:50.720 correctly. Same for the transactions.
02:54:53.359 Now we have done this manually but this
02:54:56.080 is just for now. Later in the video once
02:54:58.640 we build the create page we don't really
02:55:00.880 need to do it manually. It'll happen
02:55:03.640 automatically. Okay. But now if you are
02:55:06.479 following along with your actual
02:55:08.240 physical device you are going to get
02:55:10.399 some errors. And let me actually open up
02:55:13.120 my camera as well as the as well as my
02:55:15.600 phone and take a look at the error
02:55:19.720 together. So I just scanned the QR code.
02:55:22.640 Let's see what is the
02:55:26.040 problem. Like I'll try to pretty quickly
02:55:28.720 log in. So I put the credentials. I'll
02:55:31.120 log
02:55:33.319 in. Okay. So at the very end it says
02:55:37.040 network request failed. I don't know if
02:55:39.840 you can read it but like why this is the
02:55:42.960 case. Now the problem here is that I am
02:55:46.160 trying to call the local host from my
02:55:48.640 actual device. Right here in our code,
02:55:51.920 let's take a look at it. Uh under the
02:55:55.200 use transactions which is our mobile
02:55:57.600 phone. Here we say call the local host.
02:56:00.880 Now when you call it from your physical
02:56:03.040 device that means like it understands
02:56:05.840 that your back end is running on your on
02:56:08.880 your phone which is not the case. Local
02:56:10.960 host is your laptop. So it cannot
02:56:13.840 connect to it. Let me actually visualize
02:56:16.399 this under an image. So when you are
02:56:18.880 running the simulator it works because
02:56:21.520 the local host in this case means your
02:56:24.479 laptop right it works correctly with
02:56:26.800 your simulator but if it is your
02:56:28.880 physical device local host means this
02:56:31.840 exact phone which is not the place that
02:56:35.439 our back end is running our back end is
02:56:37.760 in our laptop. So to be able to fix
02:56:40.479 this, we need to take our entire API and
02:56:44.479 deploy it like deploy it to the cloud.
02:56:47.920 And this is exactly what we're going to
02:56:49.680 be doing in the next section. All right.
02:56:52.240 So this is where we left. Now in this
02:56:54.000 section, we would like to deploy our
02:56:55.520 API. We have talked about why because if
02:56:58.399 you don't deploy it, you cannot really
02:57:00.560 use this application from your physical
02:57:02.640 device. You can use it from the
02:57:04.399 simulator but not on your physical
02:57:06.760 device because we are calling the local
02:57:09.279 host. So we'll just deploy this uh API
02:57:12.720 first. I would like to shrink everything
02:57:14.800 and actually kill everything that we
02:57:16.720 have. I'll open up a new terminal and I
02:57:20.080 would like to first uh push this code to
02:57:22.720 GitHub because we'll be using a platform
02:57:25.520 called render.com which has a free plan.
02:57:28.399 You don't need to pay anything. With
02:57:30.399 this we will deploy our API. To be able
02:57:32.720 to use this first we need to uh like
02:57:35.920 first we need to first we need to push
02:57:38.000 our code to GitHub. So here I'll create
02:57:40.640 a repository. Uh let's say the name
02:57:43.200 could be something like wallet API. I'll
02:57:45.760 make it private. If you wanted to you
02:57:47.680 can go with public. It's not really that
02:57:50.359 important. Okay. Now let's try to create
02:57:53.279 this as a git repo. I'll say cd into the
02:57:56.720 back
02:57:57.800 end and just say get in it. Now we don't
02:58:02.000 really want to push our credentials to
02:58:04.240 GitHub, right? So for this I'll say
02:58:06.560 create the MV file sorry get ignore file
02:58:10.880 get ignore and then we will say ignore
02:58:14.080 the MV file as well as as well as the
02:58:16.960 node
02:58:18.279 modules. Okay, let's save. Now they
02:58:20.640 should be ignored as we can tell. Now we
02:58:23.040 can basically take everything and push
02:58:24.880 it to GitHub. First just make sure you
02:58:27.760 have the actually the start command
02:58:30.399 right and then we can just say get add
02:58:34.520 everything get commit dash m which
02:58:38.560 stands for message let's say something
02:58:40.560 like initial
02:58:42.680 commit and
02:58:44.600 just you know commit that now I'll go
02:58:47.600 ahead and get this
02:58:49.800 script this command paste this in is
02:58:53.279 going to take the entire backend code
02:58:55.040 and push it to
02:58:57.319 GitHub. Okay, notice how we don't have
02:58:59.760 the
02:59:00.680 env modules, which is something that we
02:59:03.439 want, right? We don't want them to be
02:59:05.520 right here. Okay, so I'll go under the
02:59:08.560 dashboard. I already have an account. Go
02:59:11.200 ahead, create one and then just say
02:59:13.120 deploy a web service. We will select
02:59:16.160 this wallet
02:59:18.840 API. Let's grab our environment
02:59:21.359 variables. By the way, I'll copy
02:59:23.359 everything that we have
02:59:25.640 and we will paste this in under the
02:59:28.960 environment variables. Now, paste this
02:59:31.760 in. Don't change anything. Leave it as
02:59:33.760 it is. Scroll to the top. Select the
02:59:36.160 free plan. And then notice how it says
02:59:39.439 the build command is npm install, which
02:59:42.080 is correct because if you think about
02:59:44.000 it, when render takes your code, it
02:59:47.120 doesn't have the node modules, right?
02:59:49.279 First it needs to install your
02:59:51.399 dependencies. So it's going to run mpm
02:59:53.680 install and once it is done it's going
02:59:56.080 to run the server.js file. You can leave
02:59:58.960 this start command as it is or you can
03:00:01.359 say mpm run start. It's the same thing
03:00:04.840 because this mpm run start is going to
03:00:08.720 do the exact same thing right under the
03:00:11.920 start command. Okay. So I'll just leave
03:00:14.080 it in this way and let's say deploy the
03:00:16.960 web
03:00:17.880 service. This will take around one or
03:00:21.439 two minutes and then it should be good
03:00:23.680 to go. So I'll wait once this is done
03:00:26.000 successfully. I'll just be right back.
03:00:28.160 And actually while this is deploying we
03:00:30.479 can copy this URL which is the you know
03:00:33.520 the API URL that render gives us. So
03:00:36.479 I'll copy that. I'll go under the VS
03:00:38.880 code under the
03:00:41.800 transactions actually use transactions.
03:00:44.880 Okay. So we are going to update this
03:00:46.960 part because it's not under the local
03:00:48.960 host anymore. It is under this URL.
03:00:51.920 Right now if you are following along
03:00:53.840 with the simulator you can even like you
03:00:57.040 don't have to do it. You don't have to
03:00:58.720 change this part. You don't have to
03:01:00.319 deploy the API. But this is something
03:01:02.640 that I wanted to show you just in case
03:01:04.880 if you are following along with your
03:01:06.720 physical device. Okay. Now let's save
03:01:09.520 this and let's wait for this to
03:01:11.439 complete. It says your service is live.
03:01:14.720 Server is up and running and database
03:01:17.359 connected successfully. Now let's try to
03:01:20.359 actually test this out from our physical
03:01:23.279 device as well as the simulator. Okay.
03:01:26.240 So I'll just save this code and kill the
03:01:29.040 back end which we don't really have
03:01:30.840 already. I'll open up the application.
03:01:33.600 Let's say cd into the mobile. I'll say
03:01:36.160 mpx
03:01:37.800 expo. We can kill the back end and I'll
03:01:41.040 just say put them side by side. Reload
03:01:43.680 the app. It should be working out
03:01:45.319 correctly. Okay. So we can fetch those
03:01:47.840 from our deployed API, right? It is
03:01:50.479 coming from the deployed API. And if you
03:01:52.960 refresh this, this should say live. Here
03:01:55.439 we go. Now I'll open up my camera and
03:01:58.160 try to test this out from my actual
03:02:00.800 physical device. So here I'll go ahead
03:02:03.439 and scan the QR
03:02:09.399 code. Now my phone is sending the
03:02:12.319 request to this URL instead of local
03:02:14.960 host. So that means we don't really get
03:02:17.040 that network uh error, right? So it it
03:02:20.560 can actually fetch the data now even
03:02:22.880 though we don't we don't really display
03:02:25.120 it in the UI. We didn't get any errors.
03:02:28.240 Let's try to display it pretty quickly
03:02:30.399 under the homepage. Um just to double
03:02:33.359 check it is working correctly and you're
03:02:35.760 happy with it. So here I can maybe right
03:02:40.399 after the hello text I could say create
03:02:43.600 one more
03:02:45.000 text I'll just get the summary itself
03:02:48.479 and let's say we'll display the income
03:02:51.520 and let me say this is the income let's
03:02:54.880 do the same thing for
03:03:01.240 balance and let's do it for the
03:03:03.439 expenses.
03:03:06.690 [Music]
03:03:07.800 this. Okay, I'll save and let me open up
03:03:11.120 my camera once
03:03:13.399 again. So, I can see it on the UI. It is
03:03:17.040 right here. We got the balance, income,
03:03:20.000 and expenses. And it's the exact same
03:03:22.319 value that we have in the terminal under
03:03:25.359 the database. Okay, so that was the
03:03:28.720 solution. you know we had to update this
03:03:31.920 part if we are following from our
03:03:34.399 physical device but if we are using the
03:03:37.439 simulator we don't really need to do it
03:03:39.840 so this is something uh this is
03:03:42.240 something that I wanted to mention and
03:03:44.000 show you this under this section and now
03:03:46.880 I'll change this to be actually local
03:03:49.600 host because I am using the simulator
03:03:52.319 now there is one more problem by the way
03:03:54.080 before I change this this API is going
03:03:57.040 to be inactive every 15 minutes because
03:04:01.120 we are using the free plan, right? The
03:04:03.520 only downside with the free plan is that
03:04:05.840 it'll go inactive. Now, what does that
03:04:08.080 mean? Let's say for 15 minutes you don't
03:04:11.120 send a request. After 15 minutes, you
03:04:14.160 sent a request to your API, it's going
03:04:16.640 to take around 1 or 2 minutes for this
03:04:20.080 to load. So here it says your free
03:04:22.800 instance will spin down with inactivity
03:04:25.359 which is going to cause some delays
03:04:29.040 about 15 seconds or even more. So how
03:04:32.240 can we fix this without paying anything?
03:04:34.720 So there is something called chrome
03:04:36.640 jobs. Let me pretty quickly show you the
03:04:39.359 solution. I will go under the back end.
03:04:42.160 I will create a file called
03:04:45.240 chrome.js. And here I'll say under the
03:04:49.200 back end. So let me say go under the
03:04:51.680 back end and just say mpm install the
03:04:56.240 chrome package. So this is going to
03:04:58.880 install that. And you can find this file
03:05:01.920 from the source code or actually from
03:05:04.160 the GitHub. So let's find that. I'll say
03:05:08.399 just github.com. You can find the link
03:05:10.479 in the
03:05:12.200 description. Um let's see where that is.
03:05:16.720 you can find the chrome.js file. Just
03:05:20.080 copy
03:05:21.319 everything and we're going to paste it.
03:05:24.319 So like what are chrome jobs? I'll
03:05:26.640 explain it pretty quickly. So they are
03:05:28.960 some scheduled tasks that run
03:05:30.880 periodically at fixed intervals. And in
03:05:33.600 our case, we want to send one get
03:05:35.840 request for every 14 minutes so that our
03:05:39.200 API doesn't go inactive. so that it is
03:05:42.000 always up and running and it doesn't
03:05:44.560 really get inactive right so when we
03:05:46.720 send the request we can immediately get
03:05:49.359 response back so here are some examples
03:05:52.319 I don't really want to waste any time I
03:05:54.399 have explained this previously multiple
03:05:56.399 times you can check this out but
03:05:58.720 basically our code is super simple on
03:06:01.680 every 14 minutes we would like to send a
03:06:04.640 request to our API URL which is going to
03:06:08.040 be this URL so copy yours. Okay, I'll
03:06:12.000 copy that and then I'll paste it under
03:06:14.720 the
03:06:16.439 environment. So here I'll say edit add a
03:06:20.240 new one new variable
03:06:23.240 API URL and paste this value
03:06:27.640 in and if it is done successfully we're
03:06:30.640 going to put the console log in the else
03:06:32.560 case we'll just say you know whatever
03:06:34.560 the status code is. So yeah that's
03:06:36.800 entire code. Now we created this file
03:06:39.120 but we never run this. So here I'll go
03:06:41.920 under the server.js and I will import
03:06:45.359 this. Let's say import job from
03:06:49.000 chrome.js. And here I'll say
03:06:52.359 if like actually I'll just say rund
03:06:56.960 chrome sorry
03:07:00.040 job. I only want to start this if we are
03:07:03.040 in production. So here I'll say if
03:07:08.200 process
03:07:10.760 envord if it is equal to production
03:07:14.080 which means if we are deployed if we are
03:07:16.399 in the production environment only then
03:07:18.880 start the chron job right we don't
03:07:21.359 really need to run this locally and I
03:07:23.840 would like to create one more route for
03:07:26.240 testing purposes here I'll say app dot
03:07:29.279 get we can say something like / ai/hel
03:07:33.760 So this is to check if our API is
03:07:36.160 running correctly. I'll say request and
03:07:39.000 response and we can say something like
03:07:41.760 rest status of 200 let's say JSON and we
03:07:47.120 can just say
03:07:48.520 status is
03:07:51.319 okay. Okay. Now we have some changes. We
03:07:54.399 would like to deploy this to GitHub. And
03:07:57.680 I'll copy this part as well because I
03:08:00.880 would like to add it right here. So
03:08:03.120 whatever our API URL is, we'll say /
03:08:07.479 API/halth. Okay, I'll say save, rebuild,
03:08:10.800 and
03:08:14.040 deploy. And then I would like to change
03:08:16.880 this code. Sorry, I would like to push
03:08:18.960 this code to GitHub. Under the back end,
03:08:21.520 I'll say get
03:08:23.800 add
03:08:25.479 commit-m. Let's say chron.js
03:08:29.319 added. and I'll say get
03:08:35.560 push. Let's see where that
03:08:38.840 is. We just got the new changes and this
03:08:43.359 should redeploy that. So just go into
03:08:45.520 the dashboard here. We can see it is
03:08:47.760 deploying
03:08:49.399 it. The previous deploy has been
03:08:52.000 cancelled because this new one is going
03:08:54.800 to be deployed. So let's wait for this
03:08:57.120 to be completed
03:08:58.600 successfully. All right. So it is done
03:09:00.800 successfully. It is live and everything
03:09:03.600 should be working out as expected. Now
03:09:05.760 we don't really need to run the back end
03:09:07.840 from this terminal if you are using the
03:09:09.920 physical phone. But since I am using the
03:09:12.319 simulator, I will actually run that and
03:09:15.279 I will update this part with the local
03:09:17.359 host. So I'll comment this out,
03:09:19.359 duplicate that. And let me say this is
03:09:21.760 going to be local
03:09:24.920 host. All right. So that's it for this
03:09:27.359 section. Now you're able to follow along
03:09:29.680 with me with your physical device if you
03:09:31.840 don't have the simulator. So this is
03:09:33.760 something that I wanted to add and we
03:09:35.760 have an error because I'm not running
03:09:37.359 the back end. Let's try to run this.
03:09:40.000 Let's say mpm
03:09:42.200 rundev and reload our mobile
03:09:45.479 phone. It should be working out
03:09:47.520 correctly. Here we go. So that's it for
03:09:50.560 this section. I'll see you in the next
03:09:52.160 one where we will get started with the
03:09:54.479 homepage UI design. All right. So this
03:09:57.439 is where we left. Now let's build the
03:09:59.279 homepage UI design. For this we'll go
03:10:02.000 under the index.js file and let's try to
03:10:05.840 delete these console logs that we don't
03:10:07.760 really need and we can get started with
03:10:10.080 the loading state. So here I'll say if
03:10:12.880 it is loading we can return a page
03:10:16.399 loader component. Let's say page loader
03:10:19.680 which is something that we will create
03:10:21.600 under the
03:10:23.080 [Music]
03:10:26.279 components let's say JSX. Now this is
03:10:29.600 going to be using a component called
03:10:32.000 activity indicator. So basically we have
03:10:34.560 a view that is taking this loading
03:10:37.200 container style that is coming from home
03:10:39.920 styles and then we are using this
03:10:42.319 component coming from React Native. So
03:10:45.120 let's save and we'll see the output. and
03:10:47.760 let's try to import
03:10:50.040 it. Okay. So this is what we have while
03:10:52.880 it is in the loading state. This is what
03:10:55.279 you will see. I'll just make it true so
03:10:57.200 that you can see it. Now you can change
03:10:59.279 it. Now you can change the size. Let's
03:11:01.840 say small. We have large. I think we
03:11:05.520 have only large and small. I thought we
03:11:07.120 also had medium but I'll go with the
03:11:09.200 large. You can change the color as well.
03:11:11.920 Here we are using the primary color but
03:11:14.479 you could use anything that you wish.
03:11:16.880 Okay, so that's it for this component.
03:11:19.760 Now we can get started with the actual
03:11:22.240 UI if we don't have the loading state,
03:11:25.120 right? So we need to fix this part. The
03:11:28.319 very first thing I'd like to add is this
03:11:30.560 header component where we have the icon,
03:11:33.279 the username, and two different
03:11:37.319 buttons. So let's try to put them side
03:11:39.840 by side and get started with it. Now I
03:11:42.240 will delete everything that we have
03:11:43.760 under this view. Let's say this is going
03:11:46.160 to take the style and from the styles
03:11:50.319 which is coming from the homepage I mean
03:11:52.800 home styles we'll say get the container
03:11:55.520 class and then we can add one more view
03:11:58.560 let's say this will take the
03:12:01.399 style styles doc
03:12:04.760 content and then we can put the header
03:12:07.520 component so here I'll just say header
03:12:10.319 I'll have one more view let's say style
03:12:14.880 is going to be styles header and then we
03:12:18.000 can build the left hand side. So I'll
03:12:20.080 say header left and then we'll have the
03:12:23.040 right side. So this is the left and then
03:12:26.720 this is the
03:12:29.640 right. Okay. So under the left I will
03:12:32.640 have again a view. This is going to take
03:12:35.840 the class name or sorry is it's going to
03:12:38.560 take the style called styles. header
03:12:42.560 left and then we can put the logo which
03:12:45.920 is going to be an image that I'd like to
03:12:48.240 provide. Let's say import the image. I
03:12:51.120 think this is going to be coming from
03:12:52.640 React Native. You can also use the expo
03:12:55.439 but we are basically getting the logo.
03:12:58.399 Let's save. Okay, we just got the image.
03:13:02.240 And then right after the logo, we can
03:13:04.319 put the welcome container. So instead of
03:13:07.200 typing this out, I'll paste around four
03:13:09.680 lines of code. And let me walk you
03:13:11.520 through it. We have a view with a text
03:13:14.560 that says welcome and then we grab the
03:13:17.439 username. Now this is basically coming
03:13:19.840 from the clerk user. We are getting the
03:13:23.040 email address. So let's say email
03:13:25.680 address is this
03:13:28.520 one
03:13:30.439 atgmail.com. Oops. Let's say we are
03:13:34.000 getting the part before the add symbol.
03:13:36.880 So this is how we do it with the split
03:13:38.880 method.
03:13:40.720 So that's why we can see the very first
03:13:42.880 part as the username and then right
03:13:45.600 after this view after the header left we
03:13:48.640 can put the header
03:13:50.920 right. So here I'll go ahead create a
03:13:53.840 view and let me actually copy and paste
03:13:56.000 and I'll walk you through
03:13:57.720 it. We have a touchable opacity. Let's
03:14:00.560 import it. When we click to it, it'll
03:14:02.800 take us to the create page. Let's get
03:14:05.279 the router as well as the ion icons.
03:14:09.520 So here I'll say const router that'll be
03:14:12.880 coming from use
03:14:14.439 router from clerk sorry not clerk but
03:14:18.120 expo let's say use
03:14:20.920 router from expo router just import that
03:14:24.239 and then let's get the ion icons from
03:14:27.120 expo vector
03:14:28.840 icons. Now let's save and what we're
03:14:31.600 going to see.
03:14:33.359 Okay. So, we can see the add
03:14:35.479 button which is going to take this icon.
03:14:38.560 Now, we can add more different things
03:14:40.960 like add
03:14:43.399 circle right you can go with anything
03:14:45.840 but I'll go with the add and color is
03:14:48.319 going to be white and then I'd like to
03:14:50.319 fix this sign up button so that it looks
03:14:53.680 it look like this with an icon. So here
03:14:57.279 I'll visit this component which is
03:14:59.600 coming from the
03:15:02.040 components. Okay. Why I cannot visit
03:15:04.399 that? Let me just say sign out button
03:15:07.840 and fix
03:15:09.239 it. Fix the UI and then the
03:15:11.439 functionality. So actually the function
03:15:13.439 works correctly. All we have to do just
03:15:15.520 update the return statement. So we'll
03:15:18.080 have a touchable opacity with the on
03:15:20.080 press but on top of it I will add the
03:15:22.560 style. Let's say styles which is going
03:15:25.760 to be coming from both styles or I think
03:15:29.200 from the home styles. Let's import that.
03:15:32.000 Um I'll say styles do logo button. And
03:15:35.840 then for the text we will have the ion
03:15:40.600 icons. Import this. We'll give a name.
03:15:44.800 I'll use the blog
03:15:48.520 outline. And then I'll say size is going
03:15:51.120 to be 22.
03:15:53.319 colors color could be from the colors we
03:15:56.960 will get the text
03:15:58.920 color okay so this is the output that we
03:16:01.600 have now when we clicked it I don't want
03:16:03.920 to log out immediately I would like to
03:16:06.479 ask for a confirmation so what I'll be
03:16:09.279 doing is to delete this try and catch
03:16:11.760 block here I'll say alert dot alert and
03:16:16.080 there's also prompt but I'll be using
03:16:18.000 the alert here we'll just say first put
03:16:21.600 the title I'll say log out and then we
03:16:25.200 can put the message here. I'll say are
03:16:28.720 you
03:16:30.120 sure you want to log
03:16:33.319 out and then we'll have the actions. So
03:16:36.800 here we'll have two different buttons
03:16:39.040 which is going to be an object. Let's
03:16:40.800 say the text is going to be cancel and
03:16:43.760 then the style which can be cancel,
03:16:46.720 default or destructive. This is going to
03:16:49.040 be cancel. And we can duplicate this.
03:16:52.000 This time it'll say log out. So you will
03:16:55.279 see the output just in a second. Style
03:16:57.359 could be
03:16:58.840 destructive. Let's get this and then on
03:17:01.600 press. So once you click it, we would
03:17:03.920 like to call the sign out from clerk.
03:17:07.120 Okay, let's actually give it a go. I'll
03:17:09.279 click it. We got the confirmation thanks
03:17:11.920 to this alert. If you say cancel,
03:17:14.319 nothing would happen. But if you say log
03:17:16.720 out, you should be logged out. Okay. So
03:17:19.680 that means everything is working
03:17:21.120 correctly. I'll just try to log
03:17:25.880 in and then we can build the balance
03:17:29.479 card which is going to be this
03:17:31.840 component. So this is what I call the
03:17:33.920 balance card. You can call this anything
03:17:36.439 else but this is the name that I'll be
03:17:38.880 going with. So right after all these
03:17:41.960 views, so after the header but still
03:17:44.800 within the content here, we'll just say
03:17:48.000 create the balance
03:17:51.800 card. And we would like to pass the
03:17:54.239 summary into
03:17:57.140 [Music]
03:17:58.760 it. Let's try to create this component.
03:18:01.760 Under the components, I'll say balance
03:18:05.640 card.jsx. Now this doesn't contain any
03:18:08.319 logic at all. So I would like to copy
03:18:10.479 and paste. Please don't get don't get
03:18:12.640 mad. You can copy this from the repo
03:18:16.080 right from the source code. But
03:18:18.720 basically we just have some styles and
03:18:20.800 then some text. We display the balance,
03:18:23.920 the income, and then the you know the
03:18:27.000 expenses. Okay, let's save and try to
03:18:29.760 import
03:18:32.120 that. Hopefully it should be working out
03:18:34.640 as expected. There we go. And then after
03:18:37.359 the balance card, we can put this text
03:18:40.239 where it says recent
03:18:42.760 transactions. So right after the balance
03:18:45.760 card, I'll paste this in. We have a view
03:18:48.479 with a text with these classes. And this
03:18:51.439 is our title. Now it is time to actually
03:18:54.239 display our
03:18:55.800 transactions. So here we have bunch of
03:18:58.080 different transactions that we would
03:18:59.520 like to display. And for this we'll be
03:19:01.920 using something called flat list. Now if
03:19:04.720 you remember back in the tutorial I have
03:19:07.279 actually talked about it here. We said
03:19:09.920 when it comes to lists in React web we
03:19:13.279 would do things like you know array.m
03:19:15.600 map and for each item display this UI.
03:19:19.120 In this case we would like to use the
03:19:21.200 flat list in React Native for
03:19:23.680 performance reasons. So we'll explain
03:19:26.479 what they are. But first let's try to go
03:19:29.920 outside of this content. So just shrink
03:19:33.200 the content and go below to it. We will
03:19:36.399 have the flat list component that is
03:19:39.920 like the flat list component that we
03:19:42.479 import from React Native. So it is this
03:19:45.520 one that we got. This will take a couple
03:19:48.560 of different props. First let's add the
03:19:51.000 style. I'll say it's going to be styles
03:19:54.479 dot transactions list. And then we can
03:19:58.160 give the content container style as
03:20:00.640 well. This is going to be style
03:20:03.319 dot say styles.t transaction list
03:20:07.160 content which is going to take some
03:20:09.920 petting from the bottom and then we can
03:20:12.479 add the data that we would like to map
03:20:14.720 through which is the transactions array.
03:20:17.520 So why are we using the flat list in the
03:20:20.080 first place? I'll just add two different
03:20:22.399 comments. So flat list is a performant
03:20:25.200 way to render long lists in React
03:20:27.920 Native. It renders items lazily, only
03:20:31.279 those on the screen. Now, what does that
03:20:33.520 mean? Let's say in our database, we have
03:20:36.319 five different transactions. We fetched
03:20:39.279 all of them, but at the moment, we can
03:20:41.680 only see five different transactions,
03:20:44.479 right? We only see five. So, we don't
03:20:46.880 really want to render the remaining
03:20:49.960 495 transactions. So, flat list will
03:20:53.760 will be doing this exact same thing. So
03:20:56.000 it is going to only render the ones on
03:20:58.399 the screen. The other ones that are not
03:21:00.640 on screen will not be rendered. Only as
03:21:04.080 you scroll it is going to render them
03:21:06.640 which is going to boost the performance.
03:21:09.520 So this is something really important to
03:21:11.600 keep in mind. The flat list component is
03:21:14.720 you know using it in this way is a lot
03:21:16.720 different than doing something like
03:21:19.399 transactions.map and for each
03:21:21.279 transaction you know do something. This
03:21:23.920 is a lot different than flat list in the
03:21:26.319 performant way. Okay. So we got the
03:21:29.439 transactions. Now we will say for every
03:21:32.279 transaction just go ahead and render
03:21:34.720 item where it is this callback function.
03:21:38.800 So we'll just say dstructure the item.
03:21:41.359 So this is what you would get by
03:21:42.800 default. The react native called this as
03:21:45.680 item. So this is basically each
03:21:48.239 transaction and we would like to render
03:21:51.120 something. So here I'll put brackets and
03:21:54.160 I'll say just go below so that we can
03:21:57.040 have a bit space. I'll say render the
03:21:59.520 transaction item
03:22:02.600 component which is something that we
03:22:04.800 will create just in a
03:22:06.600 second. Okay. So we will pass the
03:22:09.710 [Music]
03:22:10.840 item and then on delete I will send the
03:22:15.920 handle delete function. Again, this is
03:22:18.720 something that we will create in a
03:22:20.239 second. But first, let's try to create
03:22:22.640 this component. So, under the
03:22:24.560 components, let me go under the mobile.
03:22:26.880 Under the components, I'll say
03:22:31.560 transaction item.jsx file. Now, once
03:22:35.520 again, this doesn't really contain any
03:22:37.520 logic. I'd like to copy and paste and
03:22:39.920 walk you through it. It's around 50
03:22:41.920 lines of code. So we got our imports and
03:22:44.960 we got a constant that we will take a
03:22:47.200 look at it. Basically this will display
03:22:49.520 an icon depending on the category. So if
03:22:52.560 the category is food and drinks you
03:22:55.279 would see this icon, right? If it is
03:22:57.760 bills you would see this icon. For
03:23:00.239 income for the other category so on and
03:23:03.279 so
03:23:04.040 forth. To be able to make that work we
03:23:06.800 create this object.
03:23:09.120 So this is the category and then the
03:23:11.200 icon name. So if it is income which we
03:23:14.239 can check like if it is a positive value
03:23:17.279 it is income and if it is like if it is
03:23:21.040 negative it is expense and then we got
03:23:23.600 the icon name depending on the item
03:23:26.600 category. Then finally we can display
03:23:29.040 it. So let's actually take a look at it.
03:23:32.000 I'll just zoom
03:23:33.479 out. We have the view with the icon. So
03:23:37.439 this will determine what what you have
03:23:39.920 on the left hand side and then the title
03:23:42.720 let's say the
03:23:44.040 category. So title, category and then on
03:23:47.520 the right hand side we have this amount
03:23:50.640 and we are adding either plus or minus
03:23:54.399 depending on the you know depending on
03:23:57.279 the category if it is expense or if it
03:24:00.319 is an income then the created
03:24:03.560 date and for this we are importing the
03:24:06.399 format date
03:24:08.200 function from the utils. So this is
03:24:11.359 something that we have created in the
03:24:13.120 past.
03:24:14.640 Okay, finally when you click to this
03:24:16.880 delete icon, you are going to call the
03:24:21.239 ondelete with the item ID. So I hope
03:24:25.200 this is not really confusing. This is
03:24:27.200 super basic React. Basically we have
03:24:29.600 bunch of different components and we
03:24:31.600 display some data and adding some styles
03:24:34.319 just to make it look nice. Okay, so you
03:24:36.880 can pause the video, type this out and
03:24:39.279 try to understand what is happening.
03:24:41.439 Once you have done this, we can
03:24:45.040 uh actually import
03:24:46.680 this. Now for the handle delete, let's
03:24:49.600 try to create it. It's a pretty basic
03:24:52.120 function where basically I would like to
03:24:54.800 ask for a confirmation here. I'll say
03:24:57.680 const handle delete and I can zoom in.
03:25:02.380 [Music]
03:25:05.520 So this will be a function where we get
03:25:08.479 the
03:25:11.720 ID and I'll just add an alert just like
03:25:15.200 what we have done in the signage
03:25:18.040 file. So delete transaction are you
03:25:20.960 sure? If so just go ahead call the
03:25:23.359 method in the cancel case. Don't do
03:25:25.880 anything. Now I'll click to it and I
03:25:29.439 think like these icons does not really
03:25:31.920 work. We will fix it. So I'll try to
03:25:34.560 delete this one. Say cancel, nothing
03:25:36.960 happens. But if I say
03:25:39.640 delete. It says success and page has
03:25:43.040 been refreshed. So that means it is
03:25:45.279 working correctly. Now when it comes to
03:25:47.600 icons, it doesn't really work because in
03:25:51.279 the database for the category, we just
03:25:53.840 have income and expense, right? But they
03:25:56.479 should actually be something like you
03:25:59.439 know transportation, shopping,
03:26:01.760 entertainment, so on and so forth. Let's
03:26:04.160 try to fix them. I'll go under the
03:26:06.640 database. Let's
03:26:09.399 refresh. Here for the expense, I'll say
03:26:14.439 transportation. And then for the income,
03:26:16.800 we can just say income but with
03:26:18.880 uppercase
03:26:21.160 I. Save the changes and take a look at
03:26:24.239 the output.
03:26:26.160 Um, I'll refresh. Oops. Open up the
03:26:29.120 terminal and refresh this
03:26:33.960 page. Okay. So, icons have been updated
03:26:37.479 because like it check with this object.
03:26:40.960 If it is transportation, you will get
03:26:43.040 the car icon. If it is income, you would
03:26:45.680 get the cash
03:26:48.120 icon. Now, we could add more props to
03:26:50.960 the flat list. So what happens if we
03:26:53.760 have an empty list? So I'll say list
03:26:56.319 empty content. In this case we can show
03:26:59.439 something like no transactions
03:27:02.840 found which is a component that we will
03:27:06.359 create. So do I have any images for
03:27:09.560 that? Looks like I don't but if we don't
03:27:12.160 have any transactions we will say
03:27:14.239 something like you don't have anything
03:27:16.160 go ahead and create one. So let's try to
03:27:19.200 create this under the
03:27:21.000 components. I'll say JSX again content
03:27:24.960 is only UI no logic at all. I'd like to
03:27:28.479 paste this around 30 lines of code. So
03:27:32.000 when user clicks when user clicks to
03:27:35.040 this touchable opacity we will take them
03:27:37.040 to the create page. Let's save and give
03:27:39.600 it a go. Import this. And here I'll say
03:27:43.040 the transactions is an empty array just
03:27:45.359 to test this out. And this is the output
03:27:47.760 that we have. If you clicked it, you'll
03:27:49.920 be under the create page, which we don't
03:27:52.399 have at the
03:27:53.640 moment. Okay. But for now, let's bring
03:27:56.080 this
03:27:57.000 back and try to add different props. So
03:28:00.560 here, I'll say shows vertical scroll
03:28:03.720 indicator. We don't really want to show
03:28:06.000 the scroll indicator. So I'll just say
03:28:08.359 false. So that it is never visible on
03:28:11.279 iOS or Android. But we can still scroll
03:28:14.319 through this component, even though
03:28:15.840 indicator is not really visible. Now, I
03:28:18.160 don't know if you have realized, but we
03:28:19.840 have a different behavior. So, it it is
03:28:22.160 kind of strange. Now, when you reload
03:28:24.239 the app, even though we are logged in,
03:28:26.800 it first shows us the sign-in page for a
03:28:30.000 split second. So, I'll refresh. So,
03:28:32.160 first we see the welcome back page and
03:28:34.399 then we are navigated to here. So to be
03:28:37.279 able to fix that I will go under the
03:28:39.680 root hut and I'll say you know first
03:28:43.439 kill the left hand side let's say get
03:28:45.760 the is loaded from clerk and I'll say if
03:28:49.439 it is not loaded if clerk is not loaded
03:28:52.720 please don't return anything so that I
03:28:54.880 don't have this different this strange
03:28:57.359 behavior. Now I'll refresh. So
03:29:00.319 immediately we would see the loading
03:29:02.800 spinner instead of the signin page.
03:29:05.600 Okay. So I'll add a comment. Let me just
03:29:08.520 say this is for a better user experience
03:29:14.560 and save this file. Now just before we
03:29:17.520 end this section, I'd like to show you
03:29:19.439 one last thing which is about the
03:29:21.760 refresh functionality. So when we do
03:29:24.560 this thing, it should refresh, right?
03:29:26.880 How can we add this functionality? Well,
03:29:29.359 basically under the flat list, we have
03:29:31.840 something called refresh control. So
03:29:34.239 here I'll say refresh control and I'll
03:29:36.720 say refresh control this from react
03:29:40.160 native and then this is going to take
03:29:42.239 the refreshing state. Let's say it's
03:29:45.200 equal to refreshing which is something
03:29:47.680 we will create and then on refresh
03:29:50.840 function let's say on refresh and paste
03:29:54.479 this in okay so these are the things
03:29:56.880 that we will create. If you delete them,
03:29:59.359 let's see what'll
03:30:03.160 happen. Like nothing happens. It
03:30:05.920 actually breaks the application. So
03:30:08.080 let's reload
03:30:12.840 it. And I will print this back with Ctrl
03:30:17.239 C. Now let's try to create those. So
03:30:20.479 this is going to be a state and this is
03:30:22.479 going to be a function. I'll just scroll
03:30:24.800 to the top. I'll say const
03:30:27.960 refreshing set
03:30:32.600 refreshing let's say use state if I can
03:30:36.319 type
03:30:38.840 correctly by default this is going to be
03:30:41.439 equal to false once we refresh that
03:30:44.080 we'll make it to be true and now let's
03:30:46.239 create our function called on refresh so
03:30:50.080 on refresh is going to be an async
03:30:52.399 function where we would like to update
03:30:54.399 the state we'll say set refreshing to be
03:30:58.040 true and then we would like to fetch the
03:31:01.439 data. So we would like to load the data
03:31:03.840 from scratch because we are refreshing
03:31:06.560 and then once this is done we'll say set
03:31:09.120 refreshing to be equal to
03:31:11.560 false. Okay. So I'll save and let's give
03:31:14.080 it a go. I'll refresh. Now here we can
03:31:17.680 see it is refreshing but since loading
03:31:20.720 state has been updated we can see the
03:31:23.040 entire page loader. To get rid of this
03:31:25.920 I'll say if you are loading and if you
03:31:28.640 are not refreshing only then show the
03:31:31.600 page loader. Now here we can see the
03:31:35.359 page lo sorry the refresh control
03:31:38.920 itself. Now let's actually see if it is
03:31:41.840 getting the latest data. So, I will go
03:31:44.160 ahead update the expense in the
03:31:46.880 database. Let's say it'll be just
03:31:51.640 1,000, save the change, and try to
03:31:56.120 refresh. Okay, here we can see it's been
03:31:58.800 just updated. So, with this out of the
03:32:01.040 way, I think we have completed the
03:32:02.880 entire homepage where we have the header
03:32:05.680 component, we got the balance card, and
03:32:08.239 then the transactions. And for this we
03:32:10.560 have used the flat list which is a
03:32:12.720 really cool component for the
03:32:15.040 performance optimizations. Okay. So with
03:32:17.840 that in the next section we're going to
03:32:19.520 get started with the create
03:32:21.560 page. Now it is time to get started with
03:32:24.479 the create screen where we have a header
03:32:27.120 component at the top that we can go back
03:32:29.439 to the homepage or we can save the
03:32:31.680 transaction. So we have two different
03:32:33.760 selections, right? And then two
03:32:35.920 different input elements and then the
03:32:38.160 category grid. So with this in mind,
03:32:40.720 let's get started with it. We would like
03:32:43.040 to create a file called create. So I
03:32:47.120 will create it under the root. This is
03:32:49.279 this is going to be our
03:32:52.840 screen. Okay, I'll just shrink the left
03:32:55.439 hand side and let's say
03:32:58.120 RNF. Let's try to you know format this.
03:33:02.000 I'll just say create
03:33:04.200 screen and then get started with it. Now
03:33:07.439 I'll give you like an array of
03:33:10.279 categories. So we have the ID, name, and
03:33:13.640 icon. So we'll be using this array to
03:33:16.239 display these items, right? So in total
03:33:18.800 we have I think seven different items.
03:33:21.760 So this is exactly what we have. So
03:33:23.840 we'll use this in a couple of minutes.
03:33:26.080 And then I'd like to get the use router
03:33:28.800 from export router. I'll paste this in.
03:33:31.840 Let's import it. I'll just scroll to the
03:33:34.640 top. I'll say
03:33:38.040 import from expo router. And then I'd
03:33:41.600 like to get the use user from
03:33:46.840 clerk because we would like to get the
03:33:49.359 user object. This is the currently
03:33:51.359 authenticated user, right? So I'll get
03:33:53.840 it from clerk clerk expo and then I'll
03:33:56.720 add couple of different states. So let
03:33:59.680 me import the use state from React. So
03:34:02.800 we are going to keep track of the title,
03:34:04.720 the amount, selected category if it is
03:34:07.359 an expense or not. And my mouse is I
03:34:09.920 think dying at the moment. The battery
03:34:12.479 should be dying. That's why it is a bit
03:34:14.840 laggy. But let's move on. Okay. If it is
03:34:17.760 an expense or not and the loiting state.
03:34:20.800 So by default the expense will be
03:34:22.960 selected. And then I will create a
03:34:25.279 function called handle create. So this
03:34:28.800 will handle the creation of the
03:34:30.720 transaction. I'll say it'll be an async
03:34:33.319 function where we can get started with
03:34:35.840 it. So first let's fix this. Now first
03:34:39.920 I'd like to add some form validations.
03:34:42.160 Right? So here I'll say
03:34:46.200 validations. I'll add the if check.
03:34:48.399 We'll say if there is no title we'll say
03:34:51.040 please enter a transaction title. And
03:34:53.760 this alert is coming from React Native.
03:34:56.399 And then like I'll have couple of
03:34:58.640 different if checks. First I'll say if
03:35:00.960 amount is not a number or if it is less
03:35:03.840 than zero we'll just say please enter a
03:35:06.880 valid amount. Now if it is if it is an
03:35:09.840 expense we don't want them to put
03:35:11.600 something like you know minus 100.
03:35:15.200 Instead they'll just select the expense
03:35:17.680 and put 100. We will convert this to be
03:35:21.200 minus
03:35:23.160 100. Okay. So this is something to keep
03:35:25.680 in mind. That's why we have this if
03:35:28.120 check. And after this one, I'll add one
03:35:30.640 more thing. So if user did not selected
03:35:33.600 a category, right? If there is no
03:35:35.600 category selected, we'll say please
03:35:37.760 select a category. And then we can
03:35:40.080 actually get started with the logic. So
03:35:42.560 I'll have try, catch, and finally. So in
03:35:46.000 the finally, we'll just update the
03:35:47.760 loading state to be equal to
03:35:50.600 false. And then in the try we will send
03:35:53.600 the request right maybe before here we
03:35:56.160 could just say set is
03:35:58.040 loading to be
03:36:00.040 true. So first I'd like to format the
03:36:03.040 amount. So I'll say formatted amount if
03:36:05.359 it is an expense we will get the value
03:36:07.760 and just put a minus uh in front but
03:36:11.120 else we'll get the absolute value of it.
03:36:13.680 So it'll be positive and then we would
03:36:16.000 like to call the API. So here I'll say
03:36:18.600 const let's say response and I'll say
03:36:22.200 await fetch. Now here we would like to
03:36:25.279 put the API URL which is something that
03:36:28.080 we have used under the use transactions.
03:36:31.279 Now instead of putting it here I will
03:36:33.359 create a file for this. So under the
03:36:36.520 constants I'll just say
03:36:39.960 API.js and I will cut this from here.
03:36:44.080 And just in case you're looking at the
03:36:45.920 source code, I'll leave it here for now
03:36:48.080 as a comment. I'll paste this here and
03:36:51.040 just say export this
03:36:53.399 one. And then here we would like to
03:36:55.760 import this so that the use transactions
03:36:58.560 doesn't
03:36:59.479 fail. And then I'll be using the same
03:37:01.840 thing here on this file. Now it is
03:37:04.080 coming from the
03:37:05.720 API.js. So I'll add my back text. Let's
03:37:09.120 say API URL imported from the constants
03:37:14.279 slashtransactions. We would like to send
03:37:16.160 a post request. So I'll say method is
03:37:19.200 going to be
03:37:21.080 post. And then for the header contents
03:37:24.800 for the header we'll just say you know
03:37:27.439 application JSON we'll send some JSON
03:37:29.760 data and it'll be under the body. Let me
03:37:33.200 paste this in.
03:37:35.200 We will stringify this object where we
03:37:37.840 sent the user ID, title, amount and
03:37:40.640 category. If you take a look at the
03:37:42.720 server.js file under the controller
03:37:46.399 under the post method, these are the
03:37:49.279 fields that we are expecting, right?
03:37:51.279 Title, amount, category, and then the
03:37:53.359 user
03:37:56.279 ID. And then right after this response,
03:38:00.640 so here I'd like to say if response is
03:38:04.080 not okay, that means something went
03:38:06.760 wrong, we can get the error data. So
03:38:10.960 this is what I'll be doing. And then
03:38:12.239 I'll just throw the error so that I can
03:38:14.399 catch it under the catch block. But else
03:38:16.880 we would like to just show a success
03:38:19.920 alert. And then I will take the user
03:38:22.560 back to the homepage. Okay. In the
03:38:25.279 catch, I'll put the console log as well
03:38:28.000 as put an alert with the error
03:38:31.560 message. And we can console log it just
03:38:35.080 like just like this. So that's entire
03:38:38.399 function that we need. Super simple,
03:38:40.640 nothing complex. We just send a fetch
03:38:43.120 request, right? And then we have some
03:38:45.479 validations. Now we would like to call
03:38:47.520 this under the UI when we when we click
03:38:51.120 to this save button. Okay, let's try to
03:38:54.399 build it
03:38:55.800 now. So, first I'll say this view will
03:38:59.040 get the style from the styles and this
03:39:02.399 should be coming from let's import it.
03:39:05.920 I'll say
03:39:07.380 [Music]
03:39:09.479 import. I think this should be wrapped
03:39:12.160 with curly braces and I'll say from
03:39:14.800 let's go one up one more under the
03:39:17.800 constants under the sorry not constants
03:39:20.880 it should be under the assets. Let's
03:39:22.640 find
03:39:23.560 it. So, assets styles and then create
03:39:28.080 page styles. Right? So, here we'll say
03:39:32.439 styles. And then this is not going to be
03:39:34.800 a text, but instead it'll be the view
03:39:37.439 for the
03:39:38.840 header. So, I'll put the comment. Let's
03:39:41.200 say style is going to
03:39:44.439 be
03:39:46.520 styles. Now, instead of typing this out,
03:39:49.040 we have done this multiple times. So I'd
03:39:51.200 like to just paste and walk you through
03:39:52.960 it. So we have the view for the header
03:39:55.680 and then a touchable opacity. Let's
03:39:57.680 import it. And then ion icons. We'll
03:40:00.720 import that as well. Let's get the
03:40:02.680 colors. Then now let's try to import the
03:40:06.319 ion icons. I'll just scroll to the top.
03:40:09.439 Get my import and we can save it and let
03:40:12.800 and then let's take a look at the
03:40:14.080 output. Okay. So this is what we got.
03:40:16.640 This is the back button with the arrow
03:40:18.720 back icon. Then we got the text in
03:40:21.680 middle and then the touchable opacity
03:40:24.160 that will save that will save the
03:40:27.080 transaction. Now we are adding the
03:40:29.200 loading state. So let's say if it was
03:40:31.279 true it is going to be disabled and then
03:40:34.560 if it is like if it was true we would
03:40:37.120 see
03:40:39.560 saving and if it is not loading let's
03:40:42.640 actually say like false or sorry let's
03:40:47.040 say
03:40:48.040 true. So this is what you would see. But
03:40:50.960 for now, let's bring them back. We are
03:40:53.680 going to see this in action once we
03:40:55.200 actually submit the form. And then after
03:40:57.680 the header. So I'll just shrink this.
03:40:59.840 I'll say create one more view with the
03:41:02.560 style to be
03:41:06.520 styles.cart where we would like to put
03:41:08.960 the selector. So I'll say
03:41:12.359 style
03:41:13.880 styles.ype selector. Here we'll have two
03:41:17.200 different selectors. either expense or
03:41:19.040 the income and this entire thing is
03:41:21.920 called as cart
03:41:24.680 right. So this entire thing is
03:41:27.770 [Music]
03:41:30.040 cart. Okay. So under the type selector
03:41:33.439 I'd like to first put the expense
03:41:35.359 selector that will be a touchable
03:41:38.000 opacity. So just paste this in. Let's
03:41:40.640 save. Okay. Right next to it we we would
03:41:44.160 like to put the income
03:41:46.359 selector. So these are the things that
03:41:48.479 we have done multiple times. That's why
03:41:50.720 I'd like to just copy and paste. Let's
03:41:53.520 say income
03:41:57.150 [Music]
03:41:58.680 selector. Let me just walk you through
03:42:00.720 it pretty quickly. We have this style
03:42:03.279 will be applied every single time,
03:42:05.439 right? No matter what happens. But if it
03:42:07.760 is expense only, then this would be
03:42:09.760 applied which says it is active. So that
03:42:12.319 we can have this styling otherwise this
03:42:14.800 is how it'll look like. Same for the
03:42:17.120 colors and same for this text as
03:42:21.160 well. Okay, it's the exact same thing
03:42:23.520 for the income selector. Now, we would
03:42:25.840 like to put the amount container. So,
03:42:29.040 right after the touchable opacity and
03:42:31.279 after this view, which is the type
03:42:36.120 selector, we will paste the amount
03:42:38.680 container. Let's import the text input.
03:42:42.160 Okay, so this is the UI. So we have the
03:42:44.880 amount as the state for the value and on
03:42:47.840 change we will update that state and the
03:42:49.920 keyboard type is numeric. So if you say
03:42:52.319 command shift K you will see that the
03:42:55.040 keyboard is actually
03:42:57.399 numeric. Okay. And then right after the
03:43:00.720 amount container we'll have the input
03:43:02.960 container. Let me copy and paste. So
03:43:06.160 right after this one. So please feel
03:43:08.800 free to pause the video and type this
03:43:10.600 out. Super simple. No logic at all.
03:43:14.000 Right after the input container, we can
03:43:16.399 put the
03:43:17.800 title for the
03:43:20.279 category. Okay. Now we are going to map
03:43:22.640 through the categories which is this
03:43:24.720 array that we have at the very
03:43:27.479 top. So right after the text I will have
03:43:30.560 a view. Let me give a little bit space.
03:43:33.520 This will take the style as the
03:43:37.000 styles.category grid. Now here I'll just
03:43:40.000 say category or sorry categories do map.
03:43:43.520 Let's get every single category and for
03:43:46.399 them we would like to return this
03:43:48.720 content which is going to be a touchable
03:43:51.120 opacity. I'll paste this in. Let's save
03:43:54.080 and give it a go. Now if it is selected
03:43:57.040 okay my mouse is really annoying. If it
03:44:00.080 is selected as you can tell styles have
03:44:02.800 been updated
03:44:05.080 right. So these styles are coming from
03:44:08.080 these lines where we say if it is the
03:44:10.560 selected category go ahead make it
03:44:13.120 active. Same for the color right if it
03:44:15.680 is selected make the color to be white
03:44:18.640 otherwise it'll be this text color
03:44:21.120 otherwise it is white right either white
03:44:23.760 or this text color and same for the
03:44:27.600 let's see for the text right okay so
03:44:30.960 that's the entire UI I think right after
03:44:34.479 these views so just uh above the
03:44:37.600 container I'd like to paste this in
03:44:39.840 where we would like to put an activity
03:44:41.840 indicator
03:44:43.760 So if it is in the aloing state, I'll
03:44:46.000 just say
03:44:47.560 true. Okay, what is happening? So I just
03:44:50.640 realized this should be activity
03:44:52.239 indicator not based. So let's delete
03:44:54.960 that. And now it should be working out
03:44:57.319 correctly. So if we are in the loading
03:44:59.520 state, we would like to see this for a
03:45:01.600 split second. Let's say is loading. So
03:45:05.680 we have built everything. Let's give it
03:45:07.439 a go. I'll say I'll have an expense for
03:45:10.319 food and drinks. Let's say it is 100 and
03:45:13.920 I'll
03:45:14.920 say you know uh let's say KFC and I'll
03:45:19.720 save. Okay, looks like it failed. Do I
03:45:22.479 have my back end
03:45:25.239 running? Yes, I have. Let's see. It says
03:45:28.319 failed to
03:45:31.720 create. So why this is the case? Let's
03:45:34.239 see. So I just paused the video and put
03:45:37.120 a console log right here. And when I say
03:45:40.040 save on the terminal, I see that it says
03:45:43.359 all fields are required. So let's see
03:45:46.399 visit the server.js file. Here under the
03:45:50.000 post method, we are expecting user ID.
03:45:54.640 But here we just sent user ID. Right,
03:45:57.760 let's make this to be user ID and test
03:46:01.680 this out. Hopefully it should work out.
03:46:03.840 I'll say
03:46:05.239 save. Okay, now we got the success
03:46:07.760 message. If we refresh this page, it is
03:46:10.319 right here. And of course, it would be
03:46:12.640 in the database as well. So, it has just
03:46:16.080 been
03:46:17.080 created. Okay. Now, let's open up our
03:46:19.560 application. Let's try to add one more
03:46:21.840 thing which is going to be income. This
03:46:24.080 was an expense as you can
03:46:26.680 tell. Let's say income. I'll say
03:46:29.680 something like 1,500. Let's say salary.
03:46:34.630 [Music]
03:46:36.239 Let's say income and
03:46:40.760 save. Balance has been updated. It is
03:46:43.640 added. Let's
03:46:45.880 refresh. Okay. So, it is working
03:46:48.160 correctly as well. I'd like to delete
03:46:50.720 one of
03:46:52.600 them. It works uh successfully and we
03:46:56.319 can log out. You know, we can refresh. I
03:46:59.680 think our entire application works
03:47:01.520 correctly without any issues. So, I
03:47:03.920 think that's the entire application. Now
03:47:05.920 just before we end this section, I would
03:47:07.760 like to visit the root layout and I'd
03:47:10.960 like to mention something else. So the
03:47:13.600 root layout is this one. The one that is
03:47:16.720 directly under the app, right? So here I
03:47:19.600 will add the status bar. I would like to
03:47:22.399 say get the status bar component, but
03:47:25.279 I'd like to import it from expo. I think
03:47:27.520 it's a lot a lot better to use. Let's
03:47:30.319 say expo status bar. Now we can add the
03:47:33.439 style because currently this is in the
03:47:35.760 light mode which is not really visible.
03:47:37.840 So this is white. I don't know if you
03:47:39.680 can see it from the video but I can
03:47:41.279 barely see it. Here I'll say make this
03:47:43.920 to be in the dark mode. Let's save. Now
03:47:46.720 we can change the theme. Right. We can
03:47:49.040 say
03:47:50.760 light which was the default option. And
03:47:53.520 I think there's also inverted and then
03:47:55.840 auto but I'll go with dark so that it is
03:47:58.800 visible in this theme. And if we change
03:48:01.680 the colors, let's see if it is still
03:48:04.239 visible. So say
03:48:07.160 forest. So the dark theme will almost
03:48:09.920 always work in our themes. So we can go
03:48:12.960 with the ocean as well.
03:48:16.359 Okay. So that was one more component
03:48:18.960 that I wanted to mention and you can put
03:48:20.800 it under the root layout because it'll
03:48:23.359 always be in your entire application. So
03:48:25.840 with this that's going to be it for the
03:48:27.760 entire tutorial. I hope you enjoyed it.
03:48:29.920 We built an entire API as well as the
03:48:32.880 mobile application. We connected them.
03:48:35.199 We even deployed our API. Now that was
03:48:38.160 the URL. I'll copy it. Paste this in.
03:48:41.279 And let's say /
03:48:43.239 API/halth. We should get something like
03:48:45.520 okay. And as you can tell, we don't have
03:48:47.600 any delays at all because we are sending
03:48:50.080 that you know chrome jobs the get
03:48:52.640 methods. If you go under the logs, you
03:48:55.520 should be able to see that like get
03:48:58.000 request sent successfully which is
03:49:00.640 happening every single 14 minutes. Like
03:49:03.439 can you see there's always uh like from
03:49:06.640 here 14 minutes 14 minutes so on and so
03:49:09.520 forth. Every single time there is a
03:49:11.960 14minut chrome job that is set it up
03:49:15.040 thanks to this file that we have. Right?
03:49:18.319 So in every single 14 minute we will
03:49:20.960 send a request so that this doesn't get
03:49:23.439 inactive. So if you think this tutorial
03:49:25.760 was helpful just let me know in the
03:49:27.520 comments and hopefully I'll see you in
03:49:29.600 the next video.