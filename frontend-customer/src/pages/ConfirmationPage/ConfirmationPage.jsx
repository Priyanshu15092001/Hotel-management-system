import React, { useEffect, useRef, useState } from "react";
import styles from "./ConfirmationPage.module.css";
import Header from "../../components/Header/Header";
import OrderCard from "../../components/OrderCard/OrderCard";
import { InstructionModal, InputModal } from "../../components/Modal/Modal";
import rightArrow from "../../assets/ConfirmationPage/rightArrow.svg";
import locationImg from "../../assets/ConfirmationPage/location.svg";
import timeImg from "../../assets/ConfirmationPage/time.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrder } from "../../services/index";
import { toast } from "react-toastify";
export default function ConfirmationPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInputModal, setIsOpenInputModal] = useState(false);
  const [swipeText, setSwipeText] = useState("Swipe to Order");

  const [confirmed, setConfirmed] = useState(
    localStorage.getItem("orderConfirmed" || false)
  );
  const [selected, setSelected] = useState(
    localStorage.diningType || "Dine in"
  );

  const location = useLocation();
  const navigate = useNavigate();
  // const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem('customer'))||{name:'',phone:'',address:'',count:1});

  const [totalPrice, setTotalPrice] = useState(
    JSON.parse(localStorage.getItem("totalPrice")) || {
      itemsPrice: 0,
      tax: 0,
      totalPrice: 0,
    }
  ); //[itemsPrice,tax,totalPrice]
  const [duration, setDuration] = useState(
    localStorage.getItem("orderDuration") || 0
  );
  const [instructions, setInstructions] = useState(
    localStorage.getItem("instructions") || ""
  );

  useEffect(() => {
    if (cartItems.length == 0) {
      navigate("/");
    }
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, cartItems.quantity]);

  useEffect(() => {
    localStorage.setItem("diningType", selected);
  }, [selected]);

  useEffect(() => {
    if (duration <= 0) return;
    if (confirmed) {
      const interval = setInterval(() => {
        setDuration((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          localStorage.setItem("orderDuration", prev - 1);
          return prev - 1;
        });
      }, 60000); // 60000 ms = 1 minute

      return () => clearInterval(interval); // Cleanup
    }
  }, [duration, confirmed]);

  useEffect(() => {
    setTotalPrice(calculatePrice());
    // console.log('total price', calculatePrice());

    localStorage.setItem("totalPrice", JSON.stringify(calculatePrice()));
   
    setDuration(calculateCookingTime());
    localStorage.setItem(
      "orderDuration",
      JSON.stringify(calculateCookingTime())
    );
  }, [cartItems, cartItems.quantity, selected]);

  const confirmOrder = () => {
    const details = {};
    // console.log(customer);

    details.customer = JSON.parse(localStorage.getItem("customer"));
    if (localStorage.getItem('diningType') === "Take Away") {
      delete details.customer.count;
    } else {
      delete details.customer.address;
    }

    const items = [];

    cartItems.map((item) => {
      const itemDetails = {};
      if (item.quantity > 0) {
        itemDetails.menuItem = item._id;
        itemDetails.quantity = item.quantity;

        items.push(itemDetails);
      }
    });
    details.items = items;
    details.instructions = localStorage.getItem("instructions");
    details.totalPrice = JSON.parse(
      localStorage.getItem("totalPrice")
    ).totalPrice;
    details.diningType = localStorage.getItem('diningType');
    
    details.duration = localStorage.getItem("orderDuration");
    console.log(details);

    addOrder(details)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          toast.success(data.message);
          setConfirmed(true);
          localStorage.setItem("orderDuration", duration);
          localStorage.setItem("orderConfirmed", true);
          setSwipeText("Order Confirmed");
        } else {
          toast.error(data.message);
          setDragX(16);
        }
      })
      .catch((error) => {
        console.error(error);

        toast.error(error);
      });
  };

  const calculateCookingTime = () => {
    let cookingTime = cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity * item.duration,
      0
    );
    return cookingTime;
  };

  const calculatePrice = () => {
    let itemsPrice = cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    ); //total food price excl. tax

    let tax = (15 / 100) * itemsPrice;

    let totalPrice = itemsPrice + tax; //incl. tax

    if (selected === "Take Away") {
      totalPrice += 40; //delivery charge
    }

    return { itemsPrice, tax, totalPrice };
    // return [itemsPrice, tax, totalPrice];
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );
  };

  const options = ["Dine in", "Take Away"];

  const [dragX, setDragX] = useState(16);
  const dragXRef = useRef(16);
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const isDragging = useRef(false);
  const maxX = useRef(0);

  const handleStart = (e) => {
    isDragging.current = true;
    const container = containerRef.current;
    const circle = circleRef.current;

    const padding = 16;
    maxX.current = container.offsetWidth - circle.offsetWidth - padding;
  };

  const handleMove = (e) => {
    if (!isDragging.current || confirmed) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const padding = 16;

    let x = clientX - containerLeft - circleRef.current.offsetWidth / 2;

    x = Math.max(padding, Math.min(x, maxX.current));
    setDragX(x);
    dragXRef.current = x;
  };

  const handleEnd = () => {
    isDragging.current = false;
    const padding = 16;
    if (dragXRef.current >= maxX.current - 10) {
      setDragX(maxX.current);
      dragXRef.current = maxX.current;
      !confirmed ? confirmOrder() : undefined;
    } else {
      setDragX(padding);
      dragXRef.current = padding;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        handleMove(e);
      }
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        handleEnd();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    localStorage.clear();
    // localStorage.removeItem("orderConfirmed");
    navigate("/");
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();

    if (customer.name == "" || customer.phone == "") {
      toast.error("Fill in all details");
    }

    if (selected === "Take Away") {
      if (customer.address == "") toast.error("Fill in all details");
    }

    localStorage.setItem("customer", JSON.stringify(customer));

    setIsOpenInputModal(false);
  };

  const handleInstructionSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("instructions", instructions);
    setIsOpen(false);
  };

  return (
    <div className={styles.confirmPage}>
      <Header />
      <div className={styles.orders}>
        <div className={styles.orderList}>
          {cartItems.map((item, index) => {
            return (
              <OrderCard
                item={item}
                key={index}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                confirmed={confirmed}
              />
            );
          })}
        </div>
        <span
          className={styles.instructions}
          onClick={() => (!confirmed ? setIsOpen(true) : undefined)}
        >
          Add cooking instructions (optional)
        </span>

        <div className={styles.orderOption}>
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.option} ${
                selected === option ? styles.selectedOption : ""
              }`}
              onClick={() => (!confirmed ? setSelected(option) : undefined)}
            >
              {option}
            </div>
          ))}
        </div>
        <div className={styles.orderDetails}>
          <div className={styles.paymentDetails}>
            <div className={styles.charge}>
              <span>Item Total</span>
              <span>₹ {totalPrice.itemsPrice}.00</span>
            </div>
            {selected === "Take Away" ? (
              <div className={styles.charge}>
                <span
                  style={{
                    textDecoration: "underline dotted",
                    textUnderlineOffset: "4px",
                  }}
                >
                  Delivery Charge
                </span>
                <span>₹ 40</span>
              </div>
            ) : (
              <></>
            )}

            <div className={styles.charge}>
              <span>Taxes</span>
              <span>₹ {totalPrice.tax}</span>
            </div>
            <div className={styles.chargeTotal}>
              <span>Grand Total</span>
              <span>₹ {totalPrice.totalPrice}</span>
            </div>
          </div>
          <div
            className={styles.userDetails}
            onClick={() => (!confirmed ? setIsOpenInputModal(true) : undefined)}
          >
            <h2>Your details</h2>
            {customer.phone == "" ? (
              <span>Click here to enter your details</span>
            ) : (
              <div className={styles.details}>
                <span>{customer.name}</span>, &nbsp;
                <span>{customer.phone}</span>
              </div>
            )}
          </div>

          <div className={styles.deliveryDetails}>
            {selected === "Take Away" ? (
              <div className={styles.address}>
                <img src={locationImg} alt="" />
                <span>
                  Delivery at Home -{" "}
                  <span className={styles.ellipsis}>{customer.address}</span>
                </span>
              </div>
            ) : (
              <></>
            )}

            <div className={styles.time}>
              <img src={timeImg} alt="" />
              {duration == 0 ? (
                <span>Order is ready to pickup</span>
              ) : (
                <span>
                  Preparing in{" "}
                  <span style={{ fontWeight: "600" }}>{duration} mins</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.confirmBtn}>
        {!confirmed ? (
          <div
            className={styles.swipeBody}
            ref={containerRef}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            <span>{swipeText}</span>
            <div
              className={styles.circle}
              ref={circleRef}
              onMouseDown={handleStart}
              onTouchStart={handleStart}
              style={{ transform: `translateX(${dragX}px)` }}
            >
              <img src={rightArrow} alt="" />
            </div>
          </div>
        ) : (
          <>
            <button onClick={handleBack}>Back To Menu</button>
          </>
        )}
      </div>
      <InputModal
        isOpen={isOpenInputModal}
        onClose={() => setIsOpenInputModal(false)}
        customer={customer}
        setCustomer={setCustomer}
        onSubmitDetails={handleUserSubmit}
        selected={selected}
      />
      <InstructionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmitInstructions={handleInstructionSubmit}
        instructions={instructions}
        setInstructions={setInstructions}
      />
    </div>
  );
}
