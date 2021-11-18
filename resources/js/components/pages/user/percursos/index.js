import React, { ReactElement, useEffect, useState } from "react";
import Layout from "../../../layout/layout";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../../../components/backbutton";
import axios from "axios";

export default function PercursosPage() {
    let location = useLocation();
    let graus = "";
    let city = "";
    let type = true;
    const [courses, setCourses] = useState([]);

    const getData = () => {
        console.log("ss");
        axios
            .post("/api/course.get", {
                graus: graus,
                city: city,
                type: type,
            })
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
    };

    // if (location.state.answer !== undefined) answer = location.state.answer;
    const navigate = useNavigate();
    const handleSelect = (id) => {
        navigate("/percurso",{
            state:{
                id:id
            }
        });
    };

    useEffect(() => {
        if (location.state !== null) {
            if (location.state.graus !== undefined) {
                graus = location.state.graus;
            }
            if (location.state.city !== undefined) {
                city = location.state.city;
            }
            if (location.state.type !== undefined) {
                type = location.state.type;
            }
            getData();
        }
    }, []);

    const TablistItem = ({ data }) => {
        return (
            <div className="flex flex-col gap-1">
                <h5 className="text-gray-200 text-sm">{data.title}</h5>
                <h3
                    className={`text-lg font-bold ${
                        data.type == 0 ? "text-green-700" : "text-primary"
                    }`}
                >
                    {data.content}
                </h3>
            </div>
        );
    };

    return (
        <Layout>
            <div className="p-5 text-black bg-white rounded-lg relative">
                <h4 className="text-xl my-5">Resultados</h4>
                <BackButton />
                <h5 className="text-lg mt-3">
                    Parabens! Temos 3 sugestoes para si em{" "}
                    <span className="text-primary">Estarreja!</span>
                </h5>
                <div className="flex flex-between gap-5 grid grid-cols-3 ">
                    {courses.map((data, idx) => (
                        <div
                            className="bg-green-600 rounded-xl p-4 cursor-pointer"
                            onClick={() => {
                                handleSelect(data.id);
                            }}
                            key={idx}
                        >
                            <div className="flex gap-4 items-center">
                                <img
                                    src="/assets/images/ico_tab.png"
                                    className="w-32"
                                />
                                <h3 className="text-4xl text-white font-bold">
                                    {data.courseName}
                                </h3>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <TablistItem
                                        data={{
                                            title: "Inicio no panta",
                                            content: data.start,
                                            type: 1,
                                        }}
                                    />
                                    <TablistItem
                                        data={{
                                            title: "Firm no ponto",
                                            content: data.end,
                                            type: 1,
                                        }}
                                    />
                                </div>
                                <img
                                    src="/assets/images/ico_hand.png"
                                    className="w-16"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
