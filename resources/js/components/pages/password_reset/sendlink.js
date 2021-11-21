import { InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import Layout from "../../layout/layout";
import Button from "@mui/material/Button";
const SendLink = () => {
    const [email, setEmail] = useState("");

    const handleEmailchange = (e) => {
        setEmail(e.target.value);
    };
    const sendLink = () => {
      axios.post("/api/auth.password.sendlink", {email:email})
      .then(
          response => {
              console.log(response.data.token)
              // props.history.push('/home')
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
    };

    return (
        <Layout>
            <div className="xl:w-1/2 md:w-1/2 w-full my-10 flex flex-col gap-5 m-auto p-20 bg-gray-100 rounded-lg">
                <InputLabel>Please input your email address</InputLabel>
                <TextField
                    type="email"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={handleEmailchange}
                />
                <Button
                    variant="contained"
                    color="success"
                    className="h-12"
                    onClick={sendLink}
                >
                    Send Link
                </Button>
            </div>
        </Layout>
    );
};

export default SendLink;
