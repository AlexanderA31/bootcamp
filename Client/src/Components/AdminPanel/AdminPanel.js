import React from 'react'
import AdminNavBar from "./AdminNavBar";
import AdminFooter from "./AdminFooter";
import AdminScreen from './AdminScreen';
import './Admin.css';
const AdminPanel = () => {
  return (
    <div>
      <AdminNavBar/>
      <AdminScreen/>
      <AdminFooter/>
    </div>
  )
}

export default AdminPanel
