import React, { useEffect, useState } from "react";
import styles from "./MenuItemCard.module.css";
import addBtn from "../../assets/MenuPage/addBtn.svg";
import decreaseBtn from "../../assets/MenuPage/decreaseBtn.svg";
import increaseBtn from "../../assets/MenuPage/increaseBtn.svg";

export default function MenuItemCard({item,currentQuantity = 0, onQuantityChange}) {
  const [count, setCount] = useState(currentQuantity);

  useEffect(() => {
    setCount(currentQuantity); 
  }, [currentQuantity]);

   const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    onQuantityChange(newCount);
  };

  const handleDecrease = () => {
    const newCount = count - 1;
    setCount(newCount);
    onQuantityChange(newCount);
  };

  return (
    <div className={styles.item}>
      <div className={styles.imgContainer}>
        <img src={item?.imageUrl} alt={item?.name} />

        <div className={styles.overlay}></div>
      </div>
      <div className={styles.description}>
        <h4>{item?.name}</h4>
        <h5>₹ {item?.price}</h5>
        <div className={count==0?styles.zeroBtn:styles.nonZeroBtn}>
          {count == 0 ? (
            <img src={addBtn} alt="" onClick={handleIncrease} />
          ) : (
            <>
              <img src={decreaseBtn} className={styles.actionBtn} onClick={handleDecrease} alt="" />
              <span>{count}</span>
              <img src={increaseBtn} className={styles.actionBtn} alt="" onClick={handleIncrease} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
