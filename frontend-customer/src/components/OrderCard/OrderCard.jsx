import React, { useState } from "react";
import styles from "./OrderCard.module.css";
import cancelBtn from "../../assets/ConfirmationPage/cancel.svg";
import decreaseBtn from "../../assets/MenuPage/decreaseBtn.svg";
import increaseBtn from "../../assets/MenuPage/increaseBtn.svg";
export default function OrderCard({ item, updateQuantity, removeItem,confirmed  }) {
  

  const handleIncrease = () => {
    updateQuantity(item._id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity >=1) {
      updateQuantity(item._id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item._id);
  };
  return (
    <div className={styles.item}>
      <div className={styles.imgContainer}>
        <img src={item.imageUrl} alt="" />
      </div>
      <div className={styles.orderDetails}>
        <h2>{item.name}</h2>
        <h4>₹ {item.price}</h4>
        <span>{item.description}</span>
        {
          !confirmed?<img src={cancelBtn} onClick={handleRemove} className={styles.cancelBtn} alt="" />:<></>
        }
        
        <div className={styles.btnContainer}>
          <img
            src={decreaseBtn}
            className={styles.actionBtn}
            
            style={item.quantity <= 0 || confirmed ? { opacity: "40%" } : {}}
            onClick={!confirmed?handleDecrease:undefined}
            alt=""
          />
          <span>{item.quantity}</span>
          <img
            src={increaseBtn}
            className={styles.actionBtn}
            style={confirmed?{opacity:"40%"}:{}}
            alt=""
            onClick={!confirmed?handleIncrease:undefined}
          />
        </div>
      </div>
    </div>
  );
}
