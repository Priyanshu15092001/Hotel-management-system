import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Cell,
} from "recharts";

const RevenueGrowthChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const maxRevenue = Math.max(...data.map((d) => d.totalRevenue));
  const barData = data.map((d) => ({
    ...d,
    backgroundBar: maxRevenue, // Full-height bar
  }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer>
        <ComposedChart
          data={barData}
          margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="label" />
          {/* <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}

          <defs>
            <linearGradient id="blackToGray" x1="0" y1="0" x2="0" y2="1">
              <stop offset="40%" stopColor="#f0f5f3" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>

          {/* Use the gradient here */}
          <Bar dataKey="backgroundBar" barSize={40} fill="url(#blackToGray)" />

          {/* Actual Revenue Line */}
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#2a2a2a"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueGrowthChart;
