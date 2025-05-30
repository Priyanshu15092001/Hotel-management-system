import React, { useEffect, useState } from "react";
import styles from "./MenuPage.module.css";
import FilterCard from "../../components/FilterCard/FilterCard";
import filters from "../../data/filters";
import MenuItemCard from "../../components/MenuItemCard/MenuItemCard";
import Header from "../../components/Header/Header";
import { getMenuItem } from "../../services/index";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function MenuPage() {
  const [selectedCard, setSelectedCard] = useState(-1);
  const [menuItems, setMenuItems] = useState([]);
  const [searchedMenu,setSearchedMenu] = useState([])
  
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems'))||[]);

  const navigate = useNavigate();

  const handleSelect = (index) => {
    setSelectedCard(index);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (cartItems.length == 0) {
      toast.error("No items added in cart!");
    } else
      // navigate("/confirm-order", {
      //   state: {
      //     cartItems
      //   },
      // });
      navigate('/confirm-order')
  };

  const updateCartItem = (item, quantity) => {
    setCartItems((prevCart) => {
      const index = prevCart.findIndex((i) => i._id === item._id);
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return prevCart.filter((i) => i._id !== item._id);
      }
      if (index === -1) {
        // Add item if it's not in the cart
        return [...prevCart, { ...item, quantity }];
      } else {
        // Update quantity
        const updated = [...prevCart];
        updated[index].quantity = quantity;
        return updated;
      }
    });

    // localStorage.setItem("cartItems",JSON.stringify(cartItems))

  };

  useEffect(() => {
    const category = selectedCard == -1 ? "" : filters[selectedCard].type;
    getMenuItem(category)
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          setMenuItems(data.item);
          setSearchedMenu(data.item)
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedCard]);


  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  

   useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchedMenu(menuItems);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = menuItems.filter((item, index) => {
        const name = item?.name?.toLowerCase() || "";
        const type = item?.type?.toLowerCase() || "";

        return (
          name.includes(query) ||
          type.includes(query) 
        );
      });
      setSearchedMenu(filtered);
    }
  }, [searchQuery, menuItems]);

  useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems,cartItems.quantity]);


  return (
    <div className={styles.menuPage}>
      <Header initialSearchText={searchQuery}/>

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
        <h1>{selectedCard == -1 ? "All" : filters[selectedCard].type}</h1>
        <div className={styles.menuItems}>
          {searchedMenu.map((item, index) => (
            <MenuItemCard
              key={index}
              item={item}
              onQuantityChange={(quantity) => updateCartItem(item, quantity)}
              currentQuantity={
                cartItems.find((i) => i._id === item._id)?.quantity || 0
              }
            />
          ))}
        </div>
      </div>
      <div className={styles.nextBtn}>
        <button onClick={handleClick}>Next</button>
      </div>
    </div>
  );
}
