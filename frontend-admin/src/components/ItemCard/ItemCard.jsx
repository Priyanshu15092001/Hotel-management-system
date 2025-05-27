import React, { useEffect, useState } from "react";
import { getMenuById } from "../../services";
import styles from './ItemCard.module.css'
export default function ItemCard({ item }) {
  const [menuItem, setMenuItem] = useState();

  useEffect(() => {
    getMenuById(item.menuItem)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setMenuItem(data.menuItem);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <span className={styles.item}>
      {item.quantity} x {menuItem?.name} ({menuItem?.type})
    </span>
  );
}
