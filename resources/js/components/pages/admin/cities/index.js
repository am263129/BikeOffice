import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import swal from "sweetalert2";
import AdminLayout from "../../../layout/admin.layout";
const MySwal = withReactContent(swal);

export default function CityPage() {
    const [cities, setCities] = useState([]);
    const [filter, setFilter] = useState("");

    const addData = () => {
        MySwal.fire({
            title: "Insira o novo nome da cidade",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
            },
            confirmButtonText: "Adicionar",
            showLoaderOnConfirm: true,
            preConfirm: (city) => {
                if (city !== "" && city != null)
                    axios
                        .post("/api/city.create", { data: city })
                        .then((response) => {
                            console.log(response.data);
                            setCities([...cities, response.data]);
                            setFilter("");
                            MySwal.fire({
                                title: <strong>sucesso !</strong>,
                                html: <i>Nova cidade adicionada</i>,
                                icon: "success",
                            });
                        })
                        .catch((error) => {
                            console.log("ERROR:: ", error.response.data);
                        });
                else {
                    MySwal.fire({
                        title: <strong>Erro !</strong>,
                        html: <i>Insira a Cidade</i>,
                        icon: "info",
                    });
                }
            },
            allowOutsideClick: () => !MySwal.isLoading(),
        }).then((result) => {
            console.log(result);
        });
    };

    const getData = () => {
        axios
            .post("/api/city.get",{filter:filter})
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
    };

    const deleteTypo = (id) => {
        MySwal.fire({
            title: <strong>Informações !</strong>,
            html: <i>Tem certeza que deseja deletar esta cidade?</i>,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                axios
                    .post("/api/city.delete", { id: id })
                    .then((response) => {
                        console.log(response.data.result);
                        if (response.data.result === "success") {
                            console.log("remove");
                            setCities(arrayRemove(cities, id));
                        }
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
        setFilter(event.target.value);
    };

    useEffect(()=>{
        getData();
    },[filter])

    return (
        <AdminLayout>
            <div className="w-full py-10 px-10 overflow-auto ">
                <div className=" flex gap-5 py-5">
                    <TextField
                        id="outlined-basic"
                        label="Nome da Cidade"
                        variant="outlined"
                        className="bg-white w-full"
                        value={filter}
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
                                <TableCell>Cidade</TableCell>
                                <TableCell align="right">Apagar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cities.map((row, index) => (
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
