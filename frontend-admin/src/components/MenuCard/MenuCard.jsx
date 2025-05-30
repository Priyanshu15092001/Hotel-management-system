import React from "react";
import styles from "./MenuCard.module.css";
export default function MenuCard({item}) {
  return (
    <div className={styles.menuCard}>
      <div className={styles.imgContainer}>
        <img src={item?.imageUrl} alt={item?.name} />

        <div className={styles.overlay}></div>
      </div>
      <div className={styles.description}>
        <h4>{item?.name}</h4>
        <h5>₹ {item?.price}</h5>
      </div>
    </div>
  );
}
