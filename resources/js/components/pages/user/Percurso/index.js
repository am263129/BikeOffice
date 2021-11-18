
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../layout/layout';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import PrimaryButton from '../../../components/primarybtn';
import BackButton from '../../../components/backbutton';
import { useLocation } from 'react-router-dom';

export default function PercursoPage() {
    const serverUrl = "http://localhost:8000"
    let location = useLocation();
    const [tab, setTab] = useState(null)
    const [course, setCourse] = useState({})
    let id = 0;

    const getData = () => {
        axios
            .post("/api/course.get", {
                id: id,
            })
            .then((response) => {
                setCourse(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log("ERROR:: ", error.response.data);
            });
    }

    const handlePrint = () =>{
        console.log("print")
    }

    const handleSendEmail = () => {
        console.log("send email")
    }

    useEffect(() => {
        if (location.state !== null) {
            if (location.state.id !== undefined) {
                id = location.state.id;
            }
            getData();
        }
    }, []);

    useEffect(()=>{
        console.log(tab)
    },[tab])

    return (
        <Layout>
            <div className="p-5 text-black bg-white rounded-lg relative">
                <BackButton />
                <h4 className="text-xl my-10">Resultado</h4>
                <div className="flex justify-between">
                    <h5 className="text-lg mt-3"><span className="text-primary">Percurso escolhido!</span>Veja o resumo do percurso: </h5>
                    <div className="flex justiry-around gap-5 ">
                        <PrimaryButton  name="Exportar percurso" selected = {tab == 1 } click={() => { setTab(1)}} className="w-40"/>
                        <PrimaryButton  name="Indicacoes" selected={tab == 2 } click={() => { setTab(2),console.log("KILL")}} className="w-40"/>
                        <PrimaryButton  name="Mapa" selected={tab == 3 } click={() => { setTab(3) }} className="w-40" />
                    </div>
                </div>
                <div className="flex ">
                    <img src="/assets/images/ico_tab2.png" className="w-64" />
                    <div className="flex flex-col justify-between pb-5">
                        <h3 className="text-primary text-5xl font-bold">Percurso1</h3>
                        <div className="flex justify-between">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex items-center gap-2">
                                    <img src="/assets/images/ico_from.png" className="w-10 h-10" />
                                    <div className="flex flex-col">
                                        <h4 className="text-primary-dark text-lg">Início no ponto:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">{course.start!==null?course.start:""}</h4>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        <h4 className="text-primary-dark text-lg">Distância total:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">{course.distance?course.distance:""}Km</h4>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        <h4 className="text-primary-dark text-lg">Nº voltas:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">{course.turns?course.turns:""}</h4>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src="/assets/images/ico_to.png" className="w-10 h-10" />
                                    <div className="flex flex-col">
                                        <h4 className="text-primary-dark text-lg">Fim no ponto:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">{course.end?course.end:""}</h4>
                                    </div>
                                </div>
                                {/* <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        <h4 className="text-primary-dark text-lg">Inicio no ponto:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">Estadio Municipal</h4>
                                    </div>
                                </div> */}
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex gap-5">
                                    <img src="/assets/images/target.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Piso predominate:</h5>
                                        <h5 className="text-primary-dark font-bold">{course.predominant}</h5>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <img src="/assets/images/ico_break.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Zonas de descanso:</h5>
                                        <h5 className="text-primary-dark font-bold">{course.restZones}</h5>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <img src="/assets/images/ico_declare.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Decilive Medio:</h5>
                                        <h5 className="text-primary-dark font-bold">{course.avslope}%</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {tab == 2 && <div className="flex justify-between">
                        <div className="w-full grid-cols-4 grid text-primary-dark"> 
                            <h4 className="col-start-2 ">
                                {course.description}<br/>
                                <span className="font-bold">ALERT:Zona com major declive procure descansar de segulda.</span>
                            </h4>
                            
                        </div>
                        <div className="flex flex-col w-64 gap-5">
                            <a href={course.pdf?"/resource/courses/"+course.courseName+"/"+course.pdf:""}>
                                <PrimaryButton name="Print Indications" selected={false} click={handlePrint}/>
                            </a>
                            <PrimaryButton name="Enviar por email" selected={false} click={handleSendEmail}/>
                        </div>
                    </div>}
                    {tab == 3 && <div className="flex  flex-col lg:flex-row justify-between gap-4 p-5">
                        <div className="flex gap-5 flex-col w-64 justify-center w-2/5 max-w-md">
                            <div className="grid grid-cols-1 gap-5">
                                <div className="flex gap-5">
                                    <img src="/assets/images/target.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Piso predominate:</h5>
                                        <h5 className="text-primary-dark font-bold">{course.predominant}</h5>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <img src="/assets/images/ico_break.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Zonas de descanso:</h5>
                                        <h5 className="text-primary-dark font-bold">{course.restZones}</h5>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <img src="/assets/images/ico_declare.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Decilive Medio:</h5>
                                        <h5 className="text-primary-dark font-bold">{course.avslope}%</h5>
                                    </div>
                                </div>
                            </div>
                            <PrimaryButton name="Imprimir Indiacoes" selected={false} />
                            <PrimaryButton name="Enviar por email" selected={false} />
                        </div>
                        <div className="w-3/5">
                            <img src={`${serverUrl}/resource/courses/${course.courseName}/${course.routeImage}`} className="w-full" />
                        </div>
                    </div>}
                </div>
            </div>
        </Layout>
    );
}
