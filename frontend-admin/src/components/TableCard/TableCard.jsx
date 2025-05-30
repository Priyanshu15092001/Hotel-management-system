import React from 'react'
import styles from './TableCard.module.css'
import chairIcon from '../../assets/SeatingArrangement/chair.svg'
import deleteBtn from '../../assets/SeatingArrangement/deleteBtn.svg'
export default function TableCard({table,index,handleDelete}) {
  return (
    <div className={styles.card}>
        <img src={deleteBtn} className={styles.deleteBtn} alt="Delete" onClick={()=>handleDelete(table._id)} />
        <div className={styles.tableName}>
            <h3>Table</h3>
            <span>{index.toString().padStart(2, '0')}</span>
        </div>
        <div className={styles.occupancy}>
            <img src={chairIcon} alt="Chair" />
            <span>{table?.occupancy.toString().padStart(2, '0')}</span>
        </div>
    </div>
  )
}
