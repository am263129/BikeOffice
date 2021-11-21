import React from "react";
import Layout from "../../../layout/layout";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { memo, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { questionData } from "../../../../static/testData";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/backbutton";
const TestPage = () => {
    const [index, setIndex] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const total = 8;
    const answers = ["1", "2", "3", "4", "5"];
    const [selected, setSelected] = useState(-1);
    const [isLast, setIsLast] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [answersum, setAnswerSum] = useState(0);
    const navigate = useNavigate();
    const handleNext = () => {
        if (index < total - 1) {
            if (selected === -1) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please select answer!",
                });
                return;
            }
            setSelected(-1);
            setIndex(index + 1);
        }
    };
    const handlePrevious = () => {
        if (index < 1) {
            return;
        } else {
            setIndex(index - 1);
            setIsLast(false);
        }
    };
    const handleAnswer = (answer) => {
        setSelected(answer);
        setAnswerSum(answersum + answer + 1);
        setPercentage(((index + 1) / total) * 100);
    };

    useEffect(() => {
        if (percentage === 100) {
            setIsLast(true);
        }
    }, [percentage]);
    const handleComplete = () => {
        console.log(answersum);
        setCompleted(true);

        Swal.fire({
            icon: "info",
            title: "Teste completado!",
            text:
                answersum > 20
                    ? "Sou do tipo 1, posso fazer um percurso leve!"
                    : answersum > 10
                    ? "Sou do tipo 3, posso fazer um percurso moderado"
                    : "Sou do tipo 5, posso fazer um percurso difícil",
            showDenyButton: true,
            showDenyButton: false,
            confirmButtonText: `OK`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            navigate("/home", {
                state: {
                    answer: answersum,
                },
            });
        });
    };

    const handleRestart = () => {
        setSelected(-1);
        setIsLast(false);
        setCompleted(false);
        setIndex(0);
        setAnswerSum(0);
        setPercentage(0);
    };
    return (
        <Layout>
            <div className="flex justify-center relative rounded-lg p-5 relative">
                <BackButton />
                <div className="flex justify-center items-center flex-col gap-10">
                    <h3 className="text-3xl font-bold text-center text-white">
                        Teste de Avaliação da DPOC – CAT
                    </h3>
                    <div className="text-lg text-gray-800 text-2xl font-semibold flex items-end font-semibold gap-1">
                        <h3 className="text-3xl text-primary">{index + 1}</h3>/
                        {total}
                    </div>
                    {/* <div className="capitalize text-white m-3 h-20 text-center w-3/4 text-2xl">{questionData[index].question}</div> */}
                    <div className="flex justify-between w-1/2 font-bold text-xl">
                        <div className="w-2/5 text-green-700 p-5 bg-green-100 rounded-md ">
                            {questionData[index].left}
                        </div>
                        <div className="w-2/5 text-red-700 p-5 bg-red-100 rounded-md">
                            {questionData[index].right}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {answers.map((data, idx) => (
                            <Button
                                key={idx}
                                variant={
                                    idx === selected ? "contained" : "outlined"
                                }
                                color={idx === selected ? "success" : "info"}
                                onClick={() => {
                                    handleAnswer(idx);
                                }}
                            >
                                {data}
                            </Button>
                        ))}
                    </div>
                    <div className="w-screen flex justify-center items-center gap-10">
                        <div className="w-1/2 h-1 border-b-2 border-gray-700"></div>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={
                                completed
                                    ? handleRestart
                                    : isLast
                                    ? handleComplete
                                    : handleNext
                            }
                        >
                            {completed
                                ? "Restart"
                                : isLast
                                ? "Complete"
                                : "Next"}
                        </Button>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="w-40 flex justify-center items-center flex-col gap-10">
                            <div className="text-5xl text-green-500 font-semibold top-0 ">
                                {Number.parseFloat(percentage).toFixed(0)}%
                            </div>
                            <CircularProgressbar
                                value={percentage}
                                styles={buildStyles({
                                    rotation: 0.25,
                                    strokeLinecap: "butt",
                                    textSize: "16px",
                                    pathTransitionDuration: 0.5,
                                    textColor: `#DAC1DE`,
                                    pathColor: "#445DC9",
                                    trailColor: "#1D2D6E",
                                    backgroundColor: "#DAC1DE",
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TestPage;
