import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Menu, SideMenu } from '../../../static/menu';
import SideMenuItem from '../menuitem';
const Sidebar = () => {
  const navigate = useNavigate();
  const handleNavigate = (prop) => {
    navigate(prop.route);
  }
  return (
    <div className="h-screen w-200 flex flex-col bg-white rounded-r-xl pl-5 py-8">
      {SideMenu.map((data,idx)=>(
        <SideMenuItem data={data} onClick={()=>{handleNavigate(data)}} key={idx} />
      ))}
    </div>
  )
}

export default Sidebar

