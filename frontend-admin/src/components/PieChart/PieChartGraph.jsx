import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer,Tooltip,Legend } from 'recharts';
export default function PieChartGraph({ orderSummary }) {
  const [percentages, setPercentages] = useState([]);

  const COLORS = ['#5b5b5b','#828282','#2c2c2c'];

  const calculatePercentages = (orderSummary) => {
    const total =
      orderSummary.dineInCount +
      orderSummary.takeAwayCount +
      orderSummary.servedCount;
  //  if (total === 0) return;

    let percentageData;

    if (total === 0) {
      percentageData = [
        {
          name: "Dine In",
          value: 0,
        },
        {
          name: "Take Away",
          value: 0,
        },
        {
          name: "Served",
          value: 0,
        },
      ];
    } else {
      percentageData = [
        {
          name: "Dine In",
          value: Number(((orderSummary.dineInCount / total) * 100).toFixed(1)),
        },
        {
          name: "Take Away",
          value: Number(
            ((orderSummary.takeAwayCount / total) * 100).toFixed(1)
          ),
        },
        {
          name: "Served",
          value: Number(((orderSummary.servedCount / total) * 100).toFixed(1)),
        },
      ];
    }

    setPercentages(percentageData);
  };

  useEffect(() => {
    if (orderSummary) {
      calculatePercentages(orderSummary);
    }
  }, [orderSummary]);

  return (
     <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={percentages}
            cx="50%"
            cy="50%"
            innerRadius='60%'
            outerRadius='100%'
            paddingAngle={5}
            dataKey="value"
            label={false}
          >
            {percentages.map((entry, index) => (
              <Cell
                key={`slice-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
