import React, { ReactElement, useEffect, useState } from "react";
import Layout from "../../../layout/layout";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import TestResult from "../../../components/testresult";
import axios from "axios";
import { useGlobalState } from "../../../store/store";

export default function HomePage({ route, navigation }) {
    const [cities, setCities] = useState([]);
    const [graus, setGarus] = useState([]);

    let answer = 0;
    let location = useLocation();
    if (location.state !== null && location.state.answer !== undefined)
        answer = location.state.answer;
    const navigate = useNavigate();
    const [selectedGraus, setSelectedGraus] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [selectedType, setSelectedType] = useState();
    const [user] = useGlobalState("user");

    const handleChange = (prop) => (event) => {
        console.log(event.target.value);
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleCofirm = () => {
        navigate("/percursos", {
            state: {
                graus: selectedGraus,
                city: selectedCity,
                type: selectedType,
            },
        });
    };

    const handleTest = () => {
        navigate("/test");
    };

    const getData = () => {
        axios
            .post("/api/city.get")
            .then((response) => {
                console.log(response.data);
                setCities(response.data);
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
        axios
            .post("/api/typo.get")
            .then((response) => {
                console.log(response.data);
                setGarus(response.data);
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
    };

    useEffect(() => {
        if (!user.auth) {
            console.log("redirect");
            navigate("/signin");
        }
    });

    useEffect(() => {
        getData();
    }, []);
    return (
        <Layout>
            <div className="p-5 text-black bg-white rounded-lg">
                <h4 className="text-xl my-5">Qual o seu perfil</h4>
                <h5 className="text-lg mt-3">
                    Lorem ipsum dolor sir amet, conseteur sadipscling elitr,sed
                    diam nonumy eirmod tempor invcidunt ut
                </h5>
                <div className="flex gap-5 mt-5">
                    <div className="flex gap-5 w-full items-end">
                        <div className="w-1/2">
                            <InputLabel
                                htmlFor="outlined-adornment-confirmpassword"
                                className="mb-3"
                            >
                                Tipologia de doenca
                            </InputLabel>
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
                                        label="Selecione qual o tipo"
                                        onChange={(e) => {
                                            setSelectedGraus(e.target.value);
                                        }}
                                        disabled={answer !== 0}
                                    >
                                        {graus.map((data, idx) => (
                                            <MenuItem value={data.id} key={idx}>
                                                {data.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div>
                            {answer !== 0 && <TestResult answer={answer} />}
                        </div>
                    </div>
                    <div className="min-w-100">
                        <InputLabel
                            htmlFor="outlined-adornment-confirmpassword"
                            className="mb-3"
                        >
                            Nao sabe qual e?
                        </InputLabel>
                        <Button
                            variant="contained"
                            color="success"
                            className="h-14 w-60 rounded-lg"
                            onClick={handleTest}
                        >
                            Clique e descubra
                        </Button>
                    </div>
                </div>
                <div className="flex gap-5 mt-5">
                    <div className="w-full">
                        <InputLabel
                            htmlFor="outlined-adornment-confirmpassword"
                            className="mb-3"
                        >
                            Cidade onde vai caminhar
                        </InputLabel>
                        <Box
                            sx={{ minWidth: 120 }}
                            className="bg-gray-100 rounded-lg"
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Selecione a cidade
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={1}
                                    label="Selecione a cidade"
                                    onChange={(e) => {
                                        setSelectedCity(e.target.value);
                                    }}
                                >
                                    {cities.map((data, idx) => (
                                        <MenuItem value={data.id} key={idx}>
                                            {data.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div className="flex gap-5 mt-5">
                    <div className="w-full">
                        <InputLabel
                            htmlFor="outlined-adornment-confirmpassword"
                            className="mb-3"
                        >
                            Percurso unico ou ida e volta
                        </InputLabel>
                        <Box
                            sx={{ minWidth: 120 }}
                            className="bg-gray-100 rounded-lg"
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Selecione tipo de percurso
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={true}
                                    label="Selecione tipo de percurso"
                                    onChange={(e) => {
                                        setSelectedType(e.target.value);
                                    }}
                                >
                                    <MenuItem value={1}>Único</MenuItem>
                                    <MenuItem value={2}>Ida e volta</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>

                <div className="min-w-100  mt-5">
                    <Button
                        variant="contained"
                        color="success"
                        className="h-14 w-60 rounded-lg"
                        onClick={() => handleCofirm()}
                    >
                        Avancar
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
