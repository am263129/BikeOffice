import React from 'react'
import { useLocation } from 'react-router-dom'

const SideMenuItem = ({ onClick, data }) => {
  const location = useLocation();
  const active = location.pathname === data.route;
  return (
    <div className={`${active ? "bg-green-100 text-green-400 font-bold" : "bg-white"} rounded-l-full px-10 gap-5 py-5 cursor-pointer flex `} onClick={onClick}>
      {data.icon}
      <h3>{data.name}</h3>
    </div>
  )
}

export default SideMenuItem