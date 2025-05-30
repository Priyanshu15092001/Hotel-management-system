import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import search from "../../assets/MenuPage/search-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
export default function Header({initialSearchText}) {
  const [greeting, setGreeting] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
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

  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState(initialSearchText||"");

  useEffect(() => {
    if (hasTyped) {
      const delayDebounce = setTimeout(() => {
      
         if (location.pathname !== '/') {
          navigate(`/?search=${encodeURIComponent(searchText.trim())}`);
          // setSearchText(searchText)
        } else {
          navigate(`?search=${encodeURIComponent(searchText.trim())}`, { replace: true });
        }
      }, 300); // debounce

      return () => clearTimeout(delayDebounce);
    }
  }, [searchText, navigate, location.pathname]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
    setHasTyped(true);
  };

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <h1>{greeting}</h1>
        <h3>Place your order here</h3>
      </div>
      <div className={styles.searchbar}>
        <img src={search} alt="Search" />
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
