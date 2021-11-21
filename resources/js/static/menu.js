import React from 'react'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
export const SideMenu = [
  {
    id:0,
    name:"Graus",
    route:"/admin.graus",
    icon:<LocationCityIcon />
  },
  {
    id:1,
    name:"Cidades",
    route:"/admin.city",
    icon:<DeviceHubIcon />
  },
  {
    id:3,
    name:"Percursos",
    route:"/admin.course",
    icon:<GolfCourseIcon />
  },
]