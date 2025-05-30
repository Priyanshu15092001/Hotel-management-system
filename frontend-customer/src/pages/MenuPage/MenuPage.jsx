import React, { useEffect, useState } from "react";
import styles from "./MenuPage.module.css";
import FilterCard from "../../components/FilterCard/FilterCard";
import filters from "../../data/filters";
import MenuItemCard from "../../components/MenuItemCard/MenuItemCard";
import Header from "../../components/Header/Header";
import { getMenuItem } from "../../services/index";
import { useNavigate } from "react-router-dom";
export default function MenuPage() {
  const [selectedCard, setSelectedCard] = useState(-1);
  const[menuItems, setMenuItems] = useState([])
  

  const navigate=useNavigate()

  const handleSelect = (index) => {
    setSelectedCard(index);
  };

  useEffect(() => {
    const category=selectedCard==-1?"":filters[selectedCard].type
    getMenuItem(category)
    .then(async(response)=>{
      const data = await response.json()

      if(response.ok){
          setMenuItems(data.item)
      }
    })
    .catch((err)=>{
      console.error(err);
      
    })
  }, [selectedCard]);

  return (
    <div className={styles.menuPage}>
      <Header/>

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

      <div className={styles.menuContainer}>
        <h1>{selectedCard==-1?"All":filters[selectedCard].type}</h1>
        <div className={styles.menuItems}>
          {
            menuItems.map((item,index)=>(
              <MenuItemCard key={index} item={item} />
            ))
          }

        </div>
      </div>
      <div className={styles.nextBtn}>
        <button onClick={()=>navigate('/confirm-page')}>Next</button>
      </div>
    </div>
  );
}
