import React from 'react'
import { useLocation } from 'react-router-dom'

const SideMenuItem =({onClick, data})=>{
  const location = useLocation();
  const active = location.pathname === data.route;
  return(
    <div className={`${active?"bg-gray-100":"bg-white"} rounded-l-full px-20 py-5 cursor-pointer`} onClick={onClick}>{data.name}</div>
  )
}

export default SideMenuItem