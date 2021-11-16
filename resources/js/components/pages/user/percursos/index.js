
import React, { ReactElement } from 'react';
import Layout from '../../../layout/layout';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import {useNavigate} from 'react-router-dom';


export default function PercursosPage() {
    const navigate = useNavigate();
    const handleSelect = () => {
        navigate("/percurso");
    }


    const TablistItem = ({ data }) => {
        return (
            <div className="flex flex-col gap-1">
                <h5 className="text-gray-200 text-sm">{data.title}</h5>
                <h3 className={`text-lg font-bold ${data.type == 0 ? "text-green-700" : "text-primary"}`}>{data.content}</h3>
            </div>
        )
    }


    return (
        <Layout>
            <div className="p-5 text-black bg-white rounded-lg">
                <h4 className="text-xl my-5">Resultados</h4>
                <h5 className="text-lg mt-3">Parabens! Temos 3 sugestoes para si em <span className="text-primary">Estarreja!</span></h5>
                <div className="flex flex-between gap-5 " >
                    <div className="bg-primary rounded-xl w-1/3 p-4 cursor-pointer" onClick={handleSelect} >
                        <div className="flex gap-4 items-center">
                            <img src="/assets/images/ico_tab2.png" className="w-32" />
                            <h3 className="text-4xl text-white font-bold">Persurso 1</h3>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <TablistItem data={{
                                    title: "Inicio no panta",
                                    content: "Estadio Municipal",
                                    type: 0
                                }
                                } />
                                <TablistItem data={{
                                    title: "Firm no ponto",
                                    content: "Auditorio Muncipal",
                                    type: 0
                                }
                                } />
                            </div>
                            <img src="/assets/images/ico_hand.png" className="w-16" />
                        </div>
                    </div>
                    <div className="bg-green-600 rounded-xl w-1/3 p-4 cursor-pointer" onClick={handleSelect}>
                        <div className="flex gap-4 items-center">
                            <img src="/assets/images/ico_tab.png" className="w-32" />
                            <h3 className="text-4xl text-white font-bold">Persurso 2</h3>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <TablistItem data={{
                                    title: "Inicio no panta",
                                    content: "Estadio Municipal",
                                    type: 1
                                }
                                } />
                                <TablistItem data={{
                                    title: "Firm no ponto",
                                    content: "Auditorio Muncipal",
                                    type: 1
                                }
                                } />
                            </div>
                            <img src="/assets/images/ico_hand.png" className="w-16" />
                        </div>

                    </div>
                    <div className="bg-green-900 rounded-xl w-1/3 p-4 cursor-pointer" onClick={handleSelect}>
                        <div className="flex gap-4 items-center">
                            <img src="/assets/images/ico_tab.png" className="w-32" />
                            <h3 className="text-4xl text-white font-bold">Persurso 3</h3>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <TablistItem data={{
                                    title: "Inicio no panta",
                                    content: "Estadio Municipal",
                                    type: 2
                                }
                                } />
                                <TablistItem data={{
                                    title: "Firm no ponto",
                                    content: "Auditorio Muncipal",
                                    type: 2
                                }
                                } />
                            </div>
                            <img src="/assets/images/ico_hand.png" className="w-16" />
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}
