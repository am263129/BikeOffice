
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layout/layout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import withReactContent from 'sweetalert2-react-content'
import swal from 'sweetalert2';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const MySwal = withReactContent(swal)

export default function SignUpPage() {
    const [match, setMatch] = useState(null)
    const [show, setModalShow] = useState(false)
    const navigate = useNavigate();
    
    const [values, setValues] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm: '',
        showPassword: false,
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

    const signUp = () => {
        if (values.firstname === '' && values.lastname === "" || values.email === "" || values.password === "" || values.password !== values.confirm)
            MySwal.fire({
                title: <strong>Error!</strong>,
                html: values.firstname === '' && values.lastname === "" ?
                    <i>Please input Name</i> :
                    values.email === "" ?
                        <i>Please input Email Address</i> :
                        values.password === "" ?
                            <i>Please input Password</i> :
                            values.password !== values.confirm ?
                                <i>Password is not match</i> : <></>,
                icon: 'error'
            })
        else {
            const data = {
                name: values.firstname + " " + values.lastname,
                email: values.email,
                password: values.password
            };
            axios.post("/api/register", data)
                .then(
                    response => {
                        if (response.data.result === "success") {
                            navigate("/signin");
                        }
                        else {
                            MySwal.fire({
                                title: <strong>{response.data.result == "success" ? "Success" : "Error!"}</strong>,
                                html: <i>{response.data.message}</i>,
                                icon: response.data.result == "success" ? "success" : "error"
                            }).then(function () {
                            }, function (dismiss) {
                            });
                        }
                    }
                )
                .catch(error => {
                    console.log("ERROR:: ", error.response.data);

                });
        }

    }


    useEffect(() => {
        setMatch(values.confirm === values.password)
    }, [values.password, values.confirm])

    return (

        <Layout>
            {/* <SweetAlert
                show={show}
                title="Demo"
                text="SweetAlert in React"
                onConfirm={() => setModalShow(false)}
            /> */}
            <div className="w-1/2 my-10 flex flex-col gap-5 m-auto p-20 bg-gray-100 rounded-lg">
                <div className="gap-5 flex">
                    <TextField id="outlined-basic" label="First Name" variant="outlined" className="w-1/2" required color="success" onChange={handleChange('firstname')} />
                    <TextField id="outlined-basic" label="Last Name" variant="outlined" className="w-1/2" required color="success" onChange={handleChange('lastname')} />
                </div>
                <TextField id="outlined-basic" label="Email" variant="outlined" required color="success" onChange={handleChange('email')} />
                <FormControl sx={{ width: '100%' }} variant="outlined" className="w-full" color="success">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <FormControl sx={{ width: '100%' }} variant="outlined" className="w-full" color={`${match ? "success" : "error"}`}>
                    <InputLabel htmlFor="outlined-adornment-confirmpassword" >Confirm-Password</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-confirmpassword"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirm}
                        onChange={handleChange('confirm')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm-Password"
                    />
                </FormControl>
                <Button variant="contained" color="success" className="h-12" onClick={signUp}>Sign Up</Button>
                <div>
                    <h4 className="text-xl text-center">Do you have an account?  <a href="/signin" className="text-green-600">Sign in</a> </h4>
                </div>
            </div>
        </Layout>
    );
}
