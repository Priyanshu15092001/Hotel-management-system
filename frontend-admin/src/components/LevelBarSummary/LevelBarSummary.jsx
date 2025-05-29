import React, { useEffect, useState } from "react";
import styles from "./LevelBarSummary.module.css";
export default function LevelBarSummary({ orderSummary }) {
  const [percentages, setPercentages] = useState([]);

  const COLORS = ["#5b5b5b", "#828282", "#2c2c2c"];

  const calculatePercentages = (orderSummary) => {
    const total =
      orderSummary.dineInCount +
      orderSummary.takeAwayCount +
      orderSummary.servedCount;

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
    <div className={styles.levelContainer}>
      {percentages.map((item, index) => (
        <div className={styles.levelPercentage} key={index}>
          <span>
            {item.name} ({item.value}%)
          </span>
          <div className={styles.bar}>
            <div
              className={styles.progress}
              style={{
                height: "100%",
                width: `${item.value}%`,
                backgroundColor: COLORS[index % COLORS.length],
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
