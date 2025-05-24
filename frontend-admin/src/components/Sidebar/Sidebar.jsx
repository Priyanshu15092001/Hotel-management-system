import React from "react";
import styles from "./Sidebar.module.css";
import analyticsImg from "../../assets/sidebar/analytics.svg";
import menuImg from "../../assets/sidebar/menu.svg";
import orderImg from "../../assets/sidebar/orders.svg";
import seatImg from "../../assets/sidebar/seats.svg";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const links = [
    { path: "/", icon: analyticsImg },
    { path: "/tables", icon: seatImg },
    { path: "/orders", icon: orderImg },
    { path: "/menu", icon: menuImg },
  ];

  return (
    <div className={styles.leftbar}>
      <div className={styles.circle}></div>
      <div className={styles.sidebar}>
        <div className={styles.navlink}>
          {links.map((link, index) => (
            <Link to={link.path} key={index}>
              <div className={styles.icon}>
                <img src={link.icon} alt="" />
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.innerCircle}></div>
      </div>
    </div>
  );
}
