import React, { useEffect, useState } from 'react'
import styles from './Orders.module.css'
import OrderCard from '../OrderCard/OrderCard'
import { getOrders } from '../../services/index';
import { toast } from "react-toastify";
export default function Orders() {

  const [orders,setOrders]= useState([])

  useEffect(() => {
    getOrders()
    .then(async(response)=>{
      const data = await response.json()

      if(response.ok){
        setOrders(data.orders)
      }
      else{
        toast.error(data.message)
      }
    })
    .catch((error)=>{
      console.error(error);
      
    })
  }, []);

  return (
    <section className={styles.orderContainer}>
        <h1>Order Line</h1>

        <div className={styles.orders}>
          {
            orders.map((order,index)=>(
              <OrderCard key={order._id} order={order} index={index} length={orders.length} />
            ))
          }
        </div>
    
    </section>
  )
}
