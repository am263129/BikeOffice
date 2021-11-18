
import React, { ReactElement, useState } from 'react';
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

export default function PercursoPage() {

    const [tab, setTab] = useState(null)

    return (
        <Layout>
            <div className="p-5 text-black bg-white rounded-lg relative">
                <BackButton />
                <h4 className="text-xl my-10">Resultado</h4>
                <div className="flex justify-between">
                    <h5 className="text-lg mt-3"><span className="text-primary">Percurso escolhido!</span>Veja o resumo do percurso: </h5>
                    <div className="flex justiry-around gap-5 ">
                        <PrimaryButton props={{ name: "Exportar percurso", selected: tab == 1 }} click={() => { setTab(1)}} className="w-40"/>
                        <PrimaryButton props={{ name: "Indicacoes", selected: tab == 2 }} click={() => { setTab(2),console.log("KILL")}} className="w-40"/>
                        <PrimaryButton props={{ name: "Mapa", selected: tab == 3 }} click={() => { setTab(3) }} className="w-40" />
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
                                        <h4 className="text-primary-dark text-lg">Inicio no ponto:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">Estadio Municipal</h4>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        <h4 className="text-primary-dark text-lg">Inicio no ponto:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">Estadio Municipal</h4>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        <h4 className="text-primary-dark text-lg">Inicio no ponto:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">Estadio Municipal</h4>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img src="/assets/images/ico_to.png" className="w-10 h-10" />
                                    <div className="flex flex-col">
                                        <h4 className="text-primary-dark text-lg">Inicio no ponto:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">Estadio Municipal</h4>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                        <h4 className="text-primary-dark text-lg">Inicio no ponto:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">Estadio Municipal</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex gap-5">
                                    <img src="/assets/images/target.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Piso predominate:</h5>
                                        <h5 className="text-primary-dark font-bold">Estrada</h5>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <img src="/assets/images/ico_break.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Zonas de descanso:</h5>
                                        <h5 className="text-primary-dark font-bold">6</h5>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <img src="/assets/images/ico_declare.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Decilive Medio:</h5>
                                        <h5 className="text-primary-dark font-bold">5%</h5>
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
                                Comece a partir do sinal X.<br/>
                                Caminhe ate ao ponto de referencia Y.<br/>
                                Tera um passeio durante 700.<br/>
                                <span className="font-bold">ALERT:Zona com major declive procure descansar de segulda.</span>
                            </h4>
                            <h4 className="col-start-3 ">
                                Aos 1.8Km encontrara um banco.<br/>
                                Tera um passeio durante 700m.<br/>
                                Finalize no ponto onde comecou.<br/>
                            </h4>
                        </div>
                        <div className="flex flex-col w-64 gap-5">
                            <PrimaryButton props={{ name: "Enviar por email", selected: false }} />
                            <PrimaryButton props={{ name: "Enviar por email", selected: false }} />
                        </div>
                    </div>}
                    {tab == 3 && <div className="flex  flex-col lg:flex-row justify-between gap-4 p-5">
                        <div className="flex gap-5 flex-col w-64 justify-center w-2/5 max-w-md">
                            <div className="grid grid-cols-1 gap-5">
                                <div className="flex gap-5">
                                    <img src="/assets/images/target.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Piso predominate:</h5>
                                        <h5 className="text-primary-dark font-bold">Estrada</h5>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <img src="/assets/images/ico_break.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Zonas de descanso:</h5>
                                        <h5 className="text-primary-dark font-bold">6</h5>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <img src="/assets/images/ico_declare.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Decilive Medio:</h5>
                                        <h5 className="text-primary-dark font-bold">5%</h5>
                                    </div>
                                </div>
                            </div>
                            <PrimaryButton props={{ name: "Imprimir Indiacoes", selected: false }} />
                            <PrimaryButton props={{ name: "Enviar por email", selected: false }} />
                        </div>
                        <div className="w-3/5">
                            <img src="/assets/images/img_map.png" className="w-full" />
                        </div>
                    </div>}
                </div>
            </div>
        </Layout>
    );
}
