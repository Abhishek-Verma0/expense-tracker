# FinFusion - Personal Finance Tracker

A modern, responsive expense tracking application built with React and Vite. FinFusion helps you monitor your income and expenses, visualize your financial health, and stay on top of your budget with ease.

## Features

- **Dashboard Analytics:** Visual representation of your finances (Pie and Bar charts).
- **Transaction Management:** Easily add, edit, and delete income or expense records.
- **Search & Filter:** Find exactly what you need with fast category and keyword filtering.
- **Light/Dark Theme:** Built-in theme toggling for an optimal viewing experience in any lighting condition.
- **Secure Authentication:** User signup and login powered by Firebase Auth.

## Tech Stack

- **Frontend Framework:** React (with Vite)
- **Routing:** React Router DOM
- **Data Visualization:** Recharts
- **Icons:** React Icons
- **Backend & Auth:** Firebase

## Getting Started

Follow these steps to run the application locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A Firebase project set up with Authentication and Firestore Database enabled.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd expense-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Navigate to `http://localhost:5173` to view the app.

## Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the app for production.
- `npm run preview` - Locally preview the production build.
- `npm run lint` - Lints the codebase using ESLint.

