import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import search from "../../assets/MenuPage/search-icon.svg";
export default function Header() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good evening");
    } else {
      setGreeting("Good night");
    }
  }, []);

  
  return (
    <div className={styles.header}>
      <header className={styles.title}>
        <h1>{greeting}</h1>
        <h3>Place your order here</h3>
      </header>
      <div className={styles.searchbar}>
        <img src={search} alt="Search" />
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}
