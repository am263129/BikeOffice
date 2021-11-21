import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "../../../layout/layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import swal from "sweetalert2";
import AdminLayout from "../../../layout/admin.layout";
const MySwal = withReactContent(swal);

export default function TypologyPage() {
    const [typos, setTypos] = useState([]);
    const [newData, setNewData] = useState("");

    const addData = () => {
        if (newData !== "" && newData != null)
            axios
                .post("/api/typo.create", { data: newData })
                .then((response) => {
                    console.log(response.data);
                    setTypos([...typos, response.data]);
                    setNewData("");
                })
                .catch((error) => {
                    console.log("ERROR:: ", error.response.data);
                });
        else {
            MySwal.fire({
                title: <strong>Error !</strong>,
                html: <i>Please input Graus</i>,
                icon: "info",
            });
        }
    };

    const getData = () => {
        axios
            .post("/api/typo.get")
            .then((response) => {
                console.log(response.data);
                setTypos(response.data);
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
    };

    const deleteTypo = (id) => {
        MySwal.fire({
            title: <strong>Info !</strong>,
            html: <i>Are you sure to delete this city?</i>,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Delete",
            preConfirm: () => {
                axios
                    .post("/api/typo.delete", { id: id })
                    .then((response) => {
                        console.log(response.data.result);
                        if (response.data.result === "success") {
                            console.log("remove");
                            setTypos(arrayRemove(typos, id));
                        }
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log("ERROR:: ", error.response.data);
                    });
            },
        });
    };

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
    }, []);
    return (
        <AdminLayout>
            <div className={`w-full py-10 px-10 overflow-auto `}>
                <div className=" flex gap-5 py-5">
                    <TextField
                        id="outlined-basic"
                        label="Nome do Grau"
                        variant="outlined"
                        className="bg-white w-full"
                        value={newData}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        color="success"
                        className="h-14 w-40"
                        onClick={() => addData()}
                    >
                        {" "}
                        + Acrescentar
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Graus</TableCell>
                                <TableCell align="right">Apagar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typos.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => deleteTypo(row.id)}
                                        >
                                            Apagar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </AdminLayout>
    );
}
