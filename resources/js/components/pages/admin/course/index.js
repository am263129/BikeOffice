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
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content'
import swal from 'sweetalert2';
const MySwal = withReactContent(swal)

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CoursePage() {
    const [courses, setCourses] = useState([])
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [edit, setEdit] = useState(null)
    const addData = () => {
        handleClose();
        if (city !== "" && city != null && description !== "" && description != null) {
            if(edit!=null){
                axios.post('/course.update', { id:edit, description: description, city: city })
                .then(
                    response => {
                        console.log(response.data)
                        setCourses(response.data.data);
                        setCity("")
                        setDescription("")
                        setEdit(null)
                    }
                ).catch(error => {
                    console.log("ERROR:: ", error.response.data);
                });
            }
            else{
            axios.post('/course.create', { description: description, city: city })
                .then(
                    response => {
                        console.log(response.data)
                        setCourses([...courses, response.data]);
                        setCity("")
                    }
                ).catch(error => {
                    console.log("ERROR:: ", error.response.data);
                });
            }
        }
        else {
            MySwal.fire({
                title: <strong>Error !</strong>,
                html: <i>Please input typology</i>,
                icon: "info"
            })
        }
    }

    const getData = () => {

        axios.post("/course.get")
            .then(
                response => {
                    console.log(response.data)
                    setCourses(response.data)
                }
            )
            .catch(error => {
                console.log("ERROR:: ", error.response.data);
            });

    }

    const deleteTypo = (id) => {
        axios.post('/course.delete', { id: id })
            .then(
                response => {
                    console.log(response.data.result)
                    if (response.data.result === 'success') {
                        console.log("remove")
                        setCourses(arrayRemove(courses, id))
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

    const handleCity = (event) => {
        setCity(event.target.value);
    };

    const handleDescription = (event) => {
        setDescription(event.target.value)
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setEdit(null)
        setOpen(false)
    };

    const editCourse = (course) => {
        setEdit(course.id)
        setDescription(course.description)
        setCity(course.city)
        console.log(course.description)
        handleOpen();
    }

    React.useEffect(() => {
        getData();
    }, [])
    return (
        <Layout>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex flex-col gap-5">
                        <TextField id="outlined-basic" value={description} label="Description" variant="outlined" className="w-full" required color="success" onChange={handleDescription} />
                        <TextField id="outlined-basic" value={city} label="City" variant="outlined" className="w-full" required color="success" onChange={handleCity} />
                        <Button variant="contained" color="success" className="h-14 w-full" onClick={addData}>  + Acrescentar</Button>
                    </div>
                </Box>
            </Modal>

            <div className="xl:w-1/2 w-full m-auto py-10">
                <div className=" flex gap-5 py-5 justify-end">
                    <Button variant="contained" color="success" className="h-14 w-40" onClick={handleOpen}>  + Acrescentar</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Descrição</TableCell>
                                <TableCell >Cidade</TableCell>
                                <TableCell align="right">Editar</TableCell>
                                <TableCell align="right">Apagar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.description}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.city}
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        <Button variant="contained" color="info" onClick={() => editCourse(row)}>Editar</Button>
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