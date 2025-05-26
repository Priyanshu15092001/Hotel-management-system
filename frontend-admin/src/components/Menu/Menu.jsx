import React from "react";
import styles from "./Menu.module.css";
import { useEffect } from "react";
import { getMenuItem } from "../../services/index";
import { useState } from "react";
import MenuCard from "../MenuCard/MenuCard";
import filters from '../../data/filters'
import FilterCard from "../FilterCard/FilterCard";
import { toast } from "react-toastify";

export default function Menu() {
  const [items, setItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(-1);

  const [searchedMenu, setSearchedMenu] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");



  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchedMenu(items);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = items.filter(
        (item) =>
          item?.name.toLowerCase().includes(query) ||
            item?.type.toLowerCase().includes(query)
      );
      setSearchedMenu(filtered);
    }
  }, [searchQuery, items]);


 

  useEffect(() => {
    const category = selectedCard == -1 ? "" : filters[selectedCard].type;
    getMenuItem(category)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setItems(data.item);
          setSearchedMenu(data.item)
        }
        else{
          toast.error(data.message)
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error)
      });
  }, [selectedCard]);

  const handleSelect = (index) => {
    setSelectedCard(index);
  };

  return (
    <section className={styles.menuContainer}>
      <div className={styles.searchBar}>
        <div className={styles.circle}></div>
        <input type="text" placeholder="Search" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
      </div>

      

      <div className={styles.content}>
        <h1>Menu</h1>

         <div className={styles.filters}>
        {filters.map((item, index) => (
          <FilterCard
            item={item}
            key={index}
            selected={selectedCard === index}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>

        <div className={styles.menu}>
          {searchedMenu.map((item, index) => (
            <MenuCard item={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
