import React from "react";
import styles from "./FilterCard.module.css";
export default function FilterCard({ item, selected, onClick }) {

    const Image=item.img

  return (
    <div
      className={`${styles.filter} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <Image selected={selected}/>
      <span style={selected ? { color: "#f5f5f5" } : {}}>{item.type}</span>
    </div>
  );
}
