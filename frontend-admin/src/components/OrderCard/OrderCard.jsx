import React, { useEffect, useState } from "react";
import styles from "./OrderCard.module.css";
import spoonImg from "../../assets/Order/spoon.svg";
import timeImg from "../../assets/Order/hourglass.svg";
import dineDone from "../../assets/Order/dine-in-done.svg";
import takeDone from "../../assets/Order/take-away-done.svg";
import {
  getMenuById,
  updateOrderStatus,
  updateTableStatus,
} from "../../services/index";
import ItemCard from "../ItemCard/ItemCard";
export default function OrderCard({ order, index, length }) {
  const createdAt = new Date(order.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const [minutesLeft, setMinutesLeft] = useState(0);
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    const delivery = new Date(order.deliveryTime);

    const updateTimeLeft = () => {
      const now = new Date();
      const diffMs = delivery - now;
      const diffMins = Math.max(0, Math.floor(diffMs / 60000)); // Prevent negative
      if (diffMins == 0 && status === "Processing") {
        const newStatus =
          order.diningType === "Dine in" ? "Served" : "Not Picked Up";
        updateOrderStatus(order._id, newStatus)
          .then(async (response) => {
            const data = await response.json();

            if (response.ok) {
              setStatus(data.updatedOrder.status);
            }
          })
          .catch((error) => {
            console.error(error);
          });

        order.tableBooked.map((table) => {
          updateTableStatus(table, "Available")
            .then(async (response) => {
              const data = await response.json();
            })
            .catch((error) => {
              console.error(error);
            });
        });
      }
      setMinutesLeft(diffMins);
    };

    updateTimeLeft(); // Initial calculation

    const interval = setInterval(updateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className={styles.card}
      style={
        status === "Done" || status === "Served"
          ? { backgroundColor: "#B9F8C9" }
          : status == "Not Picked Up"
          ? { backgroundColor: "#C2D4D9" }
          : { backgroundColor: "#FFE3BC" }
      }
    >
      <div className={styles.details}>
        <div className={styles.orderNumber}>
          <img src={spoonImg} alt="" />
          <h3># {length - index}</h3>
        </div>
        <div className={styles.metaDetail}>
          <div>
            {order.tableBooked.map((table, index) => (
              <span key={index}>Table-{table.toString().padStart(2, "0")}</span>
            ))}
          </div>

          <span>{createdAt}</span>
        </div>

        <span className={styles.totalItem}>{order.items.length} item</span>

        <div
          className={styles.orderDuration}
          style={
            status === "Processing"
              ? { backgroundColor: "#FFE3BC" }
              : status === "Served"
              ? { backgroundColor: "#B9F8C9" }
              : { backgroundColor: "#C2D4D9" }
          }
        >
          <span
            style={
              status === "Processing"
                ? { color: "#FF9500" }
                : status === "Served"
                ? { color: "#34C759" }
                : { color: "#3181A3" }
            }
          >
            {order.diningType}
          </span>
          {minutesLeft == 0 ? (
            <span>{status}</span>
          ) : (
            <span>Ongoing {minutesLeft} Min</span>
          )}
        </div>
      </div>

      <div className={styles.orders}>
        <p>1 x Value Set Meals</p>
        <div className={styles.items}>
          {order.items.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </div>
      </div>

      <div
        className={styles.status}
        style={
          status === "Processing"
            ? { backgroundColor: "#FDC474" }
            : status === "Served"
            ? { backgroundColor: "#31FF65" }
            : { backgroundColor: "#9BAEB3" }
        }
      >
        <span
          style={
            status === "Processing"
              ? { color: "#D87300" }
              : status === "Served"
              ? { color: "#0E912F" }
              : { color: "#3B413D" }
          }
        >
          {status === "Processing" ? "Processing" : "Order Done"}
        </span>
        <img
          src={
            status === "Processing"
              ? timeImg
              : order.status === "Served"
              ? dineDone
              : takeDone
          }
          style={status !== "Processing" ? { width: "10%" } : {}}
          alt=""
        />
      </div>
    </div>
  );
}
