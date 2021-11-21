import React, { useEffect, useState } from "react";
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
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layout/admin.layout";
import { useLocation } from "react-router-dom";
import CustomInput from "../../../components/input";
const MySwal = withReactContent(swal);

export default function ManageCoursePage(props) {
    const location = useLocation();
    const [cities, setCities] = useState([]);
    const [typos, setTypos] = useState([]);

    const [values, setValues] = useState({
        courseName: "",
        type: 1,
        city: "",
        start: "",
        end: "",
        graus: "",
        predominant: "",
        routeImage: null,
        avslope: "",
        pgw: null,
        restZones: "",
        pdf: null,
        distance: "",
        turns: "",
        description: "",
    });
    let id = null;
    const navigate = useNavigate();

    const getinitData = () => {
        if (id != null)
            axios
                .post("/api/course.get", { id, id })
                .then((response) => {
                    console.log(response.data);
                    setValues(response.data);
                })
                .catch((error) => {
                    console.log("ERROR:: ", error.response.data);
                });
    };
    const getData = () => {
        axios
            .post("/api/city.get")
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
        axios
            .post("/api/typo.get")
            .then((response) => {
                setTypos(response.data);
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
    };

    useEffect(() => {
        
        if (location.state !== null && location.state.id !== undefined) {
            id = location.state.id;
            console.log(id);
            getinitData();
        }
        else{
            console.log("render");
            getData();
        }
    }, []);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleFileChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.files[0] });
    };

    const confirm = () => {
        let postdata = new FormData();
        postdata.append("courseName", values.courseName);
        postdata.append("type", values.type);
        postdata.append("city", values.city);
        postdata.append("start", values.start);
        postdata.append("end", values.end);
        postdata.append("graus", values.graus);
        postdata.append("predominant", values.predominant);
        postdata.append("routeImage", values.routeImage);
        postdata.append("avslope", values.avslope);
        postdata.append("pgw", values.pgw);
        postdata.append("restZones", values.restZones);
        postdata.append("pdf", values.pdf);
        postdata.append("distance", values.distance);
        postdata.append("turns", values.turns);
        postdata.append("description", values.description);
        console.log(values);
        if (id !== null) {
            postdata.append("id", id);
            axios
                .post("/api/course.update", postdata, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log("ERROR:: ", error.response.data);
                });
        } else {
            axios
                .post("/api/course.create", postdata, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log("ERROR:: ", error.response.data);
                });
        }
    };

    return (
        <AdminLayout>
            <div className="w-full py-2 px-10 ">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 bg-white rounded-lg p-10">
                    <TextField
                        id="outlined-basic"
                        label="Nome do percurso"
                        variant="outlined"
                        className="bg-white w-full"
                        value={values.courseName}
                        onChange={handleChange("courseName")}
                    />
                    <Box
                        sx={{ minWidth: 120 }}
                        className="bg-gray-100 rounded-lg"
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Selecione qual o tipo
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={1}
                                value={values.type}
                                label="Tipo percurso Único ou Ida e volta"
                                onChange={handleChange("type")}
                            >
                                <MenuItem value={1}>Único</MenuItem>
                                <MenuItem value={2}>Ida e volta</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        sx={{ minWidth: 120 }}
                        className="bg-gray-100 rounded-lg"
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Selecionar cidade
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={1}
                                label="Selecionar cidade"
                                value={values.city}
                                onChange={handleChange("city")}
                            >
                                {cities.map((data, idx) => (
                                    <MenuItem value={data.id} key={idx}>
                                        {data.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <div className="flex gap-5">
                        <TextField
                            id="outlined-basic"
                            label="Início"
                            variant="outlined"
                            className="bg-white w-full"
                            value={values.start}
                            onChange={handleChange("start")}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Fim"
                            variant="outlined"
                            className="bg-white w-full"
                            value={values.end}
                            onChange={handleChange("end")}
                        />
                    </div>
                    <Box
                        sx={{ minWidth: 120 }}
                        className="bg-white rounded-lg flex items-end"
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Graus de doença
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={1}
                                label="Graus de doença"
                                value={values.graus}
                                onChange={handleChange("graus")}
                            >
                                {typos.map((data, idx) => (
                                    <MenuItem value={data.id} key={idx}>
                                        {data.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <div>
                        <InputLabel id="demo-simple-select-label">
                            Piso predominante
                        </InputLabel>
                        <CustomInput
                            id="outlined-basic"
                            label="Piso predominante"
                            variant="outlined"
                            className="bg-white w-full"
                            value={values.predominant}
                            onChange={handleChange("predominant")}
                        />
                    </div>
                    <div>
                        <InputLabel id="demo-simple-select-label">
                            Upload de imagem do percurso
                        </InputLabel>
                        <CustomInput
                            type="file"
                            id="outlined-basic"
                            label="Upload de imagem do percurso"
                            variant="outlined"
                            type="file"
                            className="bg-white border border-bray-200 border-gray-400 h-12 h-14 p-3 rounded-md w-full"
                            onChange={handleFileChange("routeImage")}
                        />
                    </div>
                    <div>
                        <InputLabel id="demo-simple-select-label">
                            Declive médio
                        </InputLabel>
                        <CustomInput
                            id="outlined-basic"
                            label="Declive médio"
                            variant="outlined"
                            className="bg-white w-full"
                            value={values.avslope}
                            onChange={handleChange("avslope")}
                        />
                    </div>
                    <div>
                        <InputLabel id="demo-simple-select-label">
                            Upload de pgw
                        </InputLabel>
                        <CustomInput
                            id="outlined-basic"
                            label="Upload de pgw"
                            variant="outlined"
                            type="file"
                            className="bg-white w-full"
                            onChange={handleFileChange("pgw")}
                        />
                    </div>
                    <div>
                        <InputLabel id="demo-simple-select-label">
                            Zonas de descanso
                        </InputLabel>
                        <CustomInput
                            id="outlined-basic"
                            label="Zonas de descanso"
                            variant="outlined"
                            className="bg-white w-full"
                            value={values.restZones}
                            onChange={handleChange("restZones")}
                        />
                    </div>
                    <div>
                        <InputLabel id="demo-simple-select-label">
                            Upload de pdf para impressão
                        </InputLabel>
                        <CustomInput
                            id="outlined-basic"
                            label="Upload de pdf para impressão"
                            variant="outlined"
                            type="file"
                            className="bg-white w-full"
                            onChange={handleFileChange("pdf")}
                        />
                    </div>
                    <div>
                        <InputLabel id="demo-simple-select-label">
                            Distancia Total
                        </InputLabel>
                        <CustomInput
                            id="outlined-basic"
                            label="Distancia Total"
                            variant="outlined"
                            className="bg-white w-full"
                            value={values.distance}
                            onChange={handleChange("distance")}
                        />
                    </div>
                    <div>
                        <InputLabel id="demo-simple-select-label">
                            Voltas
                        </InputLabel>
                        <CustomInput
                            id="outlined-Voltas"
                            label="Voltas"
                            variant="outlined"
                            className="bg-white w-full"
                            value={values.turns}
                            onChange={handleChange("turns")}
                        />
                    </div>
                    <textarea
                        className="px-3 py-3 h-20 border border-gray-300 rounded-md"
                        placeholder="Escreva aqui as indicações do percurso"
                        value={values.description}
                        onChange={handleChange("description")}
                    />
                    <Button
                        variant="contained"
                        color="success"
                        className="h-14 w-40"
                        onClick={() => confirm()}
                    >
                        Confirmar
                    </Button>
                </div>
            </div>
        </AdminLayout>
    );
}
