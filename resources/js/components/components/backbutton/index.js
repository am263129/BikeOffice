import React from 'react'
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const BackButton = () => {
    const navigate = useNavigate();

    return(
        <div className="rounded-md text-gray-500 text-md font-bold absolute top-10 right-10 cursor-pointer border-2 border-white px-3 py-2" onClick={()=>{navigate(-1)}}> <ArrowBackIcon /> Back</div>
    )
}


export default BackButton