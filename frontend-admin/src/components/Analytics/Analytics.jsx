import React, { useState } from "react";
import styles from "./Analytics.module.css";
import chefIcon from "../../assets/Analytics/chefIcon.svg";
import clientIcon from "../../assets/Analytics/clientIcon.svg";
import moneyIcon from "../../assets/Analytics/moneyIcon.svg";
import orderIcon from "../../assets/Analytics/orderIcon.svg";
import { useEffect } from "react";
import { getAllChef, getOverallSummary } from "../../services";
export default function Analytics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chefs, setChefs] = useState([]);

  const [overallSummary, setOverallSummary] = useState({});

  useEffect(() => {
    getAllChef()
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setChefs(data.chefs);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getOverallSummary()
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          // console.log(data.summary);

          setOverallSummary(data.summary);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formatNumber = (num) => {
    if (num >= 1_000_000_000)
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return num?.toString();
  };

  return (
    <section className={styles.analyticsContainer}>
      <div className={styles.searchBar}>
        <div className={styles.circle}></div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.content}>
        <h1>Analytics</h1>
        <div className={styles.analytics}>
          <div className={styles.totalData}>
            <div className={styles.data}>
              <img src={chefIcon} alt="Chef" />
              <div className={styles.dataContent}>
                <h3>{chefs.length.toString().padStart(2, "0")}</h3>
                <h4>TOTAL CHEF</h4>
              </div>
            </div>

            <div className={styles.data}>
              <img src={moneyIcon} alt="Chef" />
              <div className={styles.dataContent}>
                <h3>{formatNumber(overallSummary?.totalRevenue)}</h3>
                <h4>TOTAL REVENUE</h4>
              </div>
            </div>

            <div className={styles.data}>
              <img src={orderIcon} alt="Chef" />
              <div className={styles.dataContent}>
                <h3>
                  {overallSummary?.totalOrders?.toString().padStart(2, "0")}
                </h3>
                <h4>TOTAL ORDERS</h4>
              </div>
            </div>

            <div className={styles.data}>
              <img src={clientIcon} alt="Chef" />
              <div className={styles.dataContent}>
                <h3>
                  {overallSummary?.totalCustomers?.toString().padStart(2, "0")}
                </h3>
                <h4>TOTAL CLIENTS</h4>
              </div>
            </div>
          </div>

          <div className={styles.charts}></div>

          <div className={styles.chefData}>
            <table className={styles.chefTable}>
              <thead>
                <tr>
                  <th>Chef Name</th>
                  <th>Order Taken</th>
                </tr>
              </thead>
              <tbody>
                {chefs.map((chef) => (
                  <tr key={chef._id}>
                    <td>{chef.name}</td>
                    <td>{chef.currentOrders.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
