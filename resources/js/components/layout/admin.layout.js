import React, { useState } from 'react'
import Sidebar from '../components/sidebar'
import "./layout.scss"
export default function AdminLayout({ children }) {
  const [active, setActive] = useState(0)
  return (
    <div className="bg-gray-100 rounded-lg flex gap-5" >
      <Sidebar />
      <main className="w-full bg-white rounded-l-xl">{children}</main>
    </div>
  )
}