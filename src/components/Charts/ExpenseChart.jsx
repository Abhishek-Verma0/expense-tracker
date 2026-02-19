import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import "./ExpenseChart.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4D4D", "#A259FF"];

const ExpenseChart = ({ transactions }) => {
  // ── Pie Chart Data (Expenses by Category) ──
  const categoryData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const categoryMap = {};

    expenses.forEach((txn) => {
      const cat = txn.category || "Uncategorized";
      categoryMap[cat] = (categoryMap[cat] || 0) + Number(txn.amount);
    });

    return Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));
  }, [transactions]);

  // ── Bar Chart Data (Income vs Expense) ──
  const summaryData = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return [
      {
        name: "Total",
        Income: income,
        Expense: expense,
      },
    ];
  }, [transactions]);

  return (
    <div className="charts-container">
      {/* Pie Chart */}
      <div className="chart-card">
        <h3>Expense by Category</h3>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-color)",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "var(--text-color)" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data">No expense data to display</p>
        )}
      </div>

      {/* Bar Chart */}
      <div className="chart-card">
        <h3>Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                color: "var(--text-color)",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "var(--text-color)" }}
              cursor={{ fill: "var(--header-row-bg)" }}
            />
            <Legend />
            <Bar dataKey="Income" fill="#00ff88" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expense" fill="#ff4d4d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
