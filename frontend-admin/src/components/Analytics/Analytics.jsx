import React, { useState } from "react";
import styles from "./Analytics.module.css";
import chefIcon from "../../assets/Analytics/chefIcon.svg";
import clientIcon from "../../assets/Analytics/clientIcon.svg";
import moneyIcon from "../../assets/Analytics/moneyIcon.svg";
import orderIcon from "../../assets/Analytics/orderIcon.svg";
import arrowIcon from "../../assets/Analytics/downArrow.svg";
import { useEffect } from "react";
import {
  getAllChef,
  getOrderSummary,
  getOverallSummary,
  getRevenueSummary,
  getTable,
} from "../../services";
import PieChartGraph from "../PieChart/PieChartGraph";
import LevelBarSummary from "../LevelBarSummary/LevelBarSummary";
import RevenueGrowthChart from "../RevenueGrowthChart/RevenueGrowthChart";
export default function Analytics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [chefs, setChefs] = useState([]);

  const [overallSummary, setOverallSummary] = useState({});

  const [orderSummaryRange, setOrderSummaryRange] = useState("weekly");
  const [orderSummary, setOrderSummary] = useState({});

  const [revenueSummaryRange, setRevenueSummaryRange] = useState("daily");
  const [revenueSummary, setRevenueSummary] = useState([]);

  const [tables, setTables] = useState([]);

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
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num?.toString();
  };

  useEffect(() => {
    getOrderSummary(orderSummaryRange)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setOrderSummary(data.orderSummary);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [orderSummaryRange]);

  useEffect(() => {
    getRevenueSummary(revenueSummaryRange)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setRevenueSummary(data.revenue);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [revenueSummaryRange]);

  useEffect(() => {
    getTable()
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          setTables(data.tables);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const shouldShow = (label) => {
    const query = searchQuery.trim().toLowerCase();

    // Show all if search is empty
    if (!query) return true;

    // Check if section label matches
    if (label.includes(query)) return true;

    // Special case: check chef names
    // if (label === "chef") {
    //   return chefs.some((chef) =>
    //     chef.name.toLowerCase().includes(query)
    //   );
    // }

    return false;
  };

  return (
    <section className={styles.analyticsContainer}>
      <div className={styles.searchBar}>
        <div className={styles.circle}></div>
        <input
          type="text"
          placeholder="Filter...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          className={styles.circle}
          onClick={() => setOpenFilter(!openFilter)}
        >
          <img src={arrowIcon} alt="" />
        </div>

        {openFilter ? (
          <div className={styles.filterOptions}>
            <ul>
              <li
                onClick={() => {
                  setOpenFilter(!openFilter);
                  setSearchQuery("");
                }}
              >
                All
              </li>
              <li
                onClick={() => {
                  setOpenFilter(!openFilter);
                  setSearchQuery("Chef");
                }}
              >
                Chef
              </li>
              <li
                onClick={() => {
                  setOpenFilter(!openFilter);
                  setSearchQuery("Revenue");
                }}
              >
                Revenue
              </li>
              <li
                onClick={() => {
                  setOpenFilter(!openFilter);
                  setSearchQuery("Tables");
                }}
              >
                Tables
              </li>
              <li
                onClick={() => {
                  setOpenFilter(!openFilter);
                  setSearchQuery("Client");
                }}
              >
                Client
              </li>
              <li
                onClick={() => {
                  setOpenFilter(!openFilter);
                  setSearchQuery("Order");
                }}
              >
                Order
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className={styles.content}>
        <h1>Analytics</h1>
        <div className={styles.analytics}>
          <div className={styles.totalData}>
            <div
              className={styles.data}
              data-label="total chef"
              style={{ display: shouldShow("total chef") ? "" : "none" }}
            >
              <img src={chefIcon} alt="Chef" />
              <div className={styles.dataContent}>
                <h3>{chefs.length.toString().padStart(2, "0")}</h3>
                <h4>TOTAL CHEF</h4>
              </div>
            </div>

            <div
              className={styles.data}
              data-label="total revenue"
              style={{ display: shouldShow("total revenue") ? "" : "none" }}
            >
              <img src={moneyIcon} alt="Chef" />
              <div className={styles.dataContent}>
                <h3>{formatNumber(overallSummary?.totalRevenue)}</h3>
                <h4>TOTAL REVENUE</h4>
              </div>
            </div>

            <div
              className={styles.data}
              data-label="total orders"
              style={{ display: shouldShow("total orders") ? "" : "none" }}
            >
              <img src={orderIcon} alt="Chef" />
              <div className={styles.dataContent}>
                <h3>
                  {overallSummary?.totalOrders?.toString().padStart(2, "0")}
                </h3>
                <h4>TOTAL ORDERS</h4>
              </div>
            </div>

            <div
              className={styles.data}
              data-label="total clients"
              style={{ display: shouldShow("total clients") ? "" : "none" }}
            >
              <img src={clientIcon} alt="Chef" />
              <div className={styles.dataContent}>
                <h3>
                  {overallSummary?.totalCustomers?.toString().padStart(2, "0")}
                </h3>
                <h4>TOTAL CLIENTS</h4>
              </div>
            </div>
          </div>

          <div className={styles.charts}>
            <div
              className={styles.chartSummary}
              data-label="order summary"
              style={{ display: shouldShow("order summary") ? "" : "none" }}
            >
              <div
                className={`${styles.chartHeader} ${styles.orderSummaryHeader}`}
              >
                <h2>Order Summary</h2>
                <select
                  name="orderSummary"
                  id=""
                  value={orderSummaryRange}
                  onChange={(e) => setOrderSummaryRange(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className={`${styles.chartBody} ${styles.orderSummaryBody}`}>
                <div className={styles.summaryBoxContainer}>
                  <div className={styles.summaryBox}>
                    <h2>
                      {orderSummary?.servedCount?.toString().padStart(2, "0")}
                    </h2>
                    <h4>Served</h4>
                  </div>
                  <div className={styles.summaryBox}>
                    <h2>
                      {orderSummary?.dineInCount?.toString().padStart(2, "0")}
                    </h2>
                    <h4>Dine in</h4>
                  </div>
                  <div className={styles.summaryBox}>
                    <h2>
                      {orderSummary?.takeAwayCount?.toString().padStart(2, "0")}
                    </h2>
                    <h4>Take Away</h4>
                  </div>
                </div>
                <div className={styles.pieChartContainer}>
                  <div className={styles.pieChart}>
                    <PieChartGraph orderSummary={orderSummary} />
                  </div>
                  <div className={styles.level}>
                    <LevelBarSummary orderSummary={orderSummary} />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={styles.chartSummary}
              data-label="revenue summary"
              style={{ display: shouldShow("revenue summary") ? "" : "none" }}
            >
              <div
                className={`${styles.chartHeader} ${styles.revenueSummaryHeader} `}
              >
                <h2>Revenue</h2>
                <select
                  name="revenueSummary"
                  id=""
                  value={revenueSummaryRange}
                  onChange={(e) => setRevenueSummaryRange(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div
                className={`${styles.chartBody} ${styles.revenueChartBody} `}
              >
                <div className={styles.revenueChart}>
                  <RevenueGrowthChart data={revenueSummary} />
                </div>
              </div>
            </div>

            <div
              className={styles.chartSummary}
              data-label="tables"
              style={{ display: shouldShow("tables") ? "" : "none" }}
            >
              <div
                className={`${styles.chartHeader} ${styles.tableStatusHeader}`}
              >
                <h2> Tables</h2>

                <div className={styles.tableLabels}>
                  <div className={styles.label}>
                    <div
                      className={styles.circleLabel}
                      style={{ backgroundColor: "#3DC35F" }}
                    ></div>
                    <span>Reserved</span>
                  </div>

                  <div className={styles.label}>
                    <div
                      className={styles.circleLabel}
                      style={{ backgroundColor: "#FFF" }}
                    ></div>
                    <span>Available</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.chartBody} ${styles.tableSummary}`}>
                {tables.map((table) => (
                  <div
                    className={styles.table}
                    style={{
                      backgroundColor:
                        table.status === "Reserved" ? "#3DC35F" : "#FFF",
                    }}
                    key={table._id}
                  >
                    <h4>Table</h4>
                    <span>{table.tableId?.toString().padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={styles.chefData}
            data-label="chef data"
            style={{ display: shouldShow("chef data") ? "" : "none" }}
          >
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
