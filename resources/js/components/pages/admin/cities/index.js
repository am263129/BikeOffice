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
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content'
import swal from 'sweetalert2';
const MySwal = withReactContent(swal)

export default function CityPage() {
    const [cities, setCities] = useState([])
    const [newData, setNewData] = useState("")

    const addData = () => {
        if (newData !== "" && newData != null)
            axios.post('/city.create', { data: newData })
                .then(
                    response => {
                        console.log(response.data)
                        setCities([...cities, response.data]);
                        setNewData("")
                    }
                ).catch(error => {
                    console.log("ERROR:: ", error.response.data);
                });
        else {
            MySwal.fire({
                title: <strong>Error !</strong>,
                html: <i>Please input typology</i>,
                icon: "info"
            })
        }
    }

    const getData = () => {

        axios.post("/city.get")
            .then(
                response => {
                    console.log(response.data)
                    setCities(response.data)
                }
            )
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
            });

    }

    const deleteTypo = (id) => {
        axios.post('/city.delete', { id: id })
            .then(
                response => {
                    console.log(response.data.result)
                    if (response.data.result === 'success') {
                        console.log("remove")
                        setCities(arrayRemove(cities, id))
                    }
                    console.log(response.data)
                }
            )
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
            });
    }

    function arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele.id != value;
        });
    }

    const handleChange = (event) => {
        setNewData(event.target.value);
    };

    React.useEffect(() => {
        getData();
    }, [])
    return (
        <Layout>
            <div className="xl:w-1/2 w-full m-auto py-10">
                <div className=" flex gap-5 py-5">
                    <TextField id="outlined-basic" label="Nome da Tipologias" variant="outlined" className="bg-white w-full" value={newData} onChange={handleChange} />
                    <Button variant="contained" color="success" className="h-14 w-40" onClick={() => addData()}>  + Acrescentar</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tipologias</TableCell>
                                <TableCell align="right">Apagar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cities.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="error" onClick={() => deleteTypo(row.id)}>Apagar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    );
}