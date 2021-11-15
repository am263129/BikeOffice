
import React, { ReactElement } from 'react';
import Layout from '../../layout/layout';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function SigninPage() {
    return (
        <Layout>
            <div className="w-1/2 my-10 flex flex-col gap-5 m-auto p-20 bg-gray-100 rounded-lg">
                <TextField id="outlined-basic" label="Email" variant="outlined" />
                <TextField id="outlined-basic" label="Password" variant="outlined" />
                <Button variant="contained" color="success" className="h-12">Sign in</Button>
                <div>
                    <h4 className="text-xl text-center">Don't have an account? Create <a href="/signup" className="text-green-600">Account Account</a> Now</h4>
                    <h3 className="text-blue-400 text-center mt-5 text-xl">Forgot Password</h3>
                </div>
            </div>
        </Layout>
    );
}
