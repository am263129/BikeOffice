
import React, { ReactElement, useState } from 'react';
import Layout from '../../../layout/layout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import withReactContent from 'sweetalert2-react-content'
import swal from 'sweetalert2';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import AdminLayout from '../../../layout/admin.layout';

const MySwal = withReactContent(swal)
export default function AdminPage({props}) {
    const navigate = useNavigate();
    const handleNavigate =(prop)  =>{
        navigate(prop);
    }
    return (
        <AdminLayout>
            <div className="w-1/2 my-10 flex flex-col gap-5 m-auto p-20 bg-gray-100 rounded-lg">
                <Button variant="contained" color="success" className="h-12" onClick={()=>{handleNavigate("/admin.graus")}} >Lista de Tipologias</Button>
                <Button variant="contained" color="success" className="h-12" onClick={()=>{handleNavigate("/admin.city")}} >Lista de cidades</Button>
                <Button variant="contained" color="success" className="h-12" onClick={()=>{handleNavigate("/admin.course")}} >Lista de percursos</Button>
            </div>
        </AdminLayout>
    );
}
