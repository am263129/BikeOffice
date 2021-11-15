
import React, { ReactElement, useState } from 'react';
import Layout from '../../layout/layout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import withReactContent from 'sweetalert2-react-content'
import swal from 'sweetalert2';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

const MySwal = withReactContent(swal)
export default function SigninPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showpassword, setShowpass] = useState(null)
    const handleEmailchange = (event) => {
        setEmail(event.target.value)
    }

    const handlePassowrd = (event) => {
        setPassword(event.target.value)
    }

    const handleClickShowPassword = () => {
        setShowpass(!showpassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const signin = () => {
        if (email === "" || password === "")
            MySwal.fire({
                title: <strong>Error!</strong>,
                html: email === '' ?
                    <i>Please input Email</i> :
                    <i>Please input password</i>, 
                icon: 'error'
            })
        else {
            const data = {
                email: email,
                password: password
            };
            axios.post("/signin", data)
                .then(
                    response => {
                        console.log(response.data)
                        // MySwal.fire({
                        //     title: <strong>{response.data.result == "success" ? "Success" : "Error!"}</strong>,
                        //     html: <i>{response.data.message}</i>,
                        //     icon: response.data.result == "success" ? "success" : "error"
                        // }).then(function () {
                        // }, function (dismiss) {
                        // });
                    }
                )
                .catch(error => {
                    console.log("ERROR:: ", error.response.data);

                });
        }
    }
    return (
        <Layout>
            <div className="w-1/2 my-10 flex flex-col gap-5 m-auto p-20 bg-gray-100 rounded-lg">
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleEmailchange} />
                <FormControl sx={{ width: '100%' }} variant="outlined" className="w-full" color="success">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={showpassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePassowrd}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showpassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button variant="contained" color="success" className="h-12" onClick={signin}>Sign in</Button>
                <div>
                    <h4 className="text-xl text-center">Don't have an account? Create <a href="/signup" className="text-green-600">Account Account</a> Now</h4>
                    <h3 className="text-blue-400 text-center mt-5 text-xl">Forgot Password</h3>
                </div>
            </div>
        </Layout>
    );
}
