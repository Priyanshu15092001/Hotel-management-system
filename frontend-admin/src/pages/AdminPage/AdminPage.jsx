import React from 'react'
import styles from './AdminPage.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
export default function AdminPage() {
  return (
    <div className={styles.admin}>
        <Sidebar/>
        <div className={styles.pages}>
            <Outlet/>
        </div>
    </div>
  )
}
