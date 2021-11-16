import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from '../../../layout/layout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content'
import swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import AdminLayout from '../../../layout/admin.layout';
const MySwal = withReactContent(swal)

export default function ManageCoursePage() {
    const [cities, setCities] = useState([])
    const [typos, setTypos] = useState([])
    const navigate = useNavigate();

    const getData = () => {
        axios.post("/api/city.get")
            .then(
                response => {
                    console.log(response.data)
                    setCities(response.data)
                }
            )
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
            });
        axios.post("/api/typo.get")
            .then(
                response => {
                    console.log(response.data)
                    setTypos(response.data)
                }
            )
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
            });
    }


    React.useEffect(() => {
        getData();
    }, [])

    const [values, setValues] = React.useState({
        courseName: "",
        type: 1,
        city: '',
        start: '',
        end: '',
        typology: '',
        predominant: '',
        routeImage: '',
        avslope: '',
        pgw: '',
        restZones: '',
        pdf: '',
        description: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    const confirm = () =>{
        navigate("/admin.course");
    }

    return (
        <AdminLayout>
            <div className="w-full h-screen py-2 px-10 overflow-y-scroll ">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 bg-white rounded-lg p-10">
                    <TextField id="outlined-basic" label="Nome do percurso" variant="outlined" className="bg-white w-full" value={values.courseName} onChange={handleChange} />
                    <Box sx={{ minWidth: 120 }} className="bg-gray-100 rounded-lg">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Selecione qual o tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={1}
                                value={values.type}
                                label="Tipo percurso Único ou Ida e volta"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Único</MenuItem>
                                <MenuItem value={2}>Ida e volta</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }} className="bg-gray-100 rounded-lg">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Selecionar cidade</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={1}
                                label="Selecionar cidade"
                                onChange={handleChange}
                            >
                                {cities.map((data, idx) => (
                                    <MenuItem value={data.id}>{data.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>
                    <div className="flex gap-5">
                        <TextField id="outlined-basic" label="Início" variant="outlined" className="bg-white w-full" value={values.start} onChange={handleChange} />
                        <TextField id="outlined-basic" label="Fim" variant="outlined" className="bg-white w-full" value={values.end} onChange={handleChange} />
                    </div>
                    <Box sx={{ minWidth: 120 }} className="bg-gray-100 rounded-lg">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipologias acessíveis</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={1}
                                label="Tipologias acessíveis"
                                onChange={handleChange}
                            >
                                {typos.map((data, idx) => (
                                    <MenuItem value={data.id}>{data.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField id="outlined-basic" label="Piso predominante" variant="outlined" className="bg-white w-full" value={values.predominant} onChange={handleChange} />
                    <TextField id="outlined-basic" label="Upload de imagem do percurso" variant="outlined" className="bg-white w-full" value={values.routeImage} onChange={handleChange} />
                    <TextField id="outlined-basic" label="Declive médio" variant="outlined" className="bg-white w-full" value={values.avslope} onChange={handleChange} />
                    <TextField id="outlined-basic" label="Upload de pgw" variant="outlined" className="bg-white w-full" value={values.pgw} onChange={handleChange} />
                    <TextField id="outlined-basic" label="Zonas de descanso" variant="outlined" className="bg-white w-full" value={values.restZones} onChange={handleChange} />
                    <TextField id="outlined-basic" label="Upload de pdf para impressão" variant="outlined" className="bg-white w-full" value={values.pdf}  onChange={handleChange} />
                    <textarea className="px-3 py-3 h-20 border border-gray-300 rounded-md" placeholder="Escreva aqui as indicações do percurso" value={values.description} onChange={handleChange} />
                    <Button variant="contained" color="success" className="h-14 w-40" onClick={() => confirm()}>Confirmar</Button>
                </div>
            </div>
        </AdminLayout>
    );
}