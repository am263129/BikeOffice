
import React, { ReactElement } from 'react';
import Layout from '../../../layout/layout';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function HomePage() {

    const [values, setValues] = React.useState({
        age:"",
        disease: '',
        targetplace: '',
        distance: '',
        single: true,
    });

    const handleChange = (prop) => (event) => {
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


    return (
        <Layout>
            <div className="p-5 text-black bg-white rounded-lg">
                <h4 className="text-xl my-5">Qual o seu perfil</h4>
                <h5 className="text-lg mt-3">Lorem ipsum dolor sir amet, conseteur sadipscling elitr,sed diam nonumy eirmod tempor invcidunt ut</h5>
                <div className="flex gap-5 mt-5">
                    <div className="w-full">
                        <InputLabel htmlFor="outlined-adornment-confirmpassword" className="mb-3">Tipologia de doenca</InputLabel>
                        <Box sx={{ minWidth: 120 }} className="bg-gray-100 rounded-lg">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Selecione qual o tipo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue ={1}
                                    label="Selecione qual o tipo"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Tipo 1</MenuItem>
                                    <MenuItem value={2}>Tipo 2</MenuItem>
                                    <MenuItem value={3}>Tipo 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className="min-w-100">
                        <InputLabel htmlFor="outlined-adornment-confirmpassword" className="mb-3">Nao sabe qual e?</InputLabel>
                        <Button variant="contained" color="success" className="h-14 w-60 rounded-lg">Clique e descubra</Button>
                    </div>
                </div>
                <div className="flex gap-5 mt-5">
                    <div className="w-full">
                        <InputLabel htmlFor="outlined-adornment-confirmpassword" className="mb-3">Cidade onde vai caminhar</InputLabel>
                        <Box sx={{ minWidth: 120 }} className="bg-gray-100 rounded-lg">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Selecione a cidade</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={1}
                                    label="Selecione a cidade"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Tipo 1</MenuItem>
                                    <MenuItem value={2}>Tipo 2</MenuItem>
                                    <MenuItem value={3}>Tipo 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>

                <div className="flex gap-5 mt-5">
                    <div className="w-full">
                        <InputLabel htmlFor="outlined-adornment-confirmpassword" className="mb-3">Distancia pretendida</InputLabel>
                        <Box sx={{ minWidth: 120 }} className="bg-gray-100 rounded-lg">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Selecione a distancia</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue = {1}
                                    label="Selecione a distancia"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Tipo 1</MenuItem>
                                    <MenuItem value={2}>Tipo 2</MenuItem>
                                    <MenuItem value={3}>Tipo 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>

                <div className="flex gap-5 mt-5">
                    <div className="w-full">
                        <InputLabel htmlFor="outlined-adornment-confirmpassword" className="mb-3">Percurso unico ou ida e volta</InputLabel>
                        <Box sx={{ minWidth: 120 }} className="bg-gray-100 rounded-lg">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Selecione tipo de percurso</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue = {1}
                                    label="Selecione tipo de percurso"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={true}>single</MenuItem>
                                    <MenuItem value={false}>return</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>

                <div className="min-w-100  mt-5">
                    <Button variant="contained" color="success" className="h-14 w-60 rounded-lg">Avancar</Button>
                </div>
            </div>
        </Layout>
    );
}
