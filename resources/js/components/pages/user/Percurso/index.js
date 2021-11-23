
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../layout/layout';
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
            <div className="p-5 text-black bg-white rounded-lg relative max-w-7xl m-auto">
                <BackButton />
                <h4 className="text-xl my-10">Resultado</h4>
                <div className="lg:flex justify-between grid grid-cols-1 grid-rows-2 items-baseline">
                    <h5 className="text-lg mt-3"><span className="text-primary">Percurso escolhido!</span>Veja o resumo do percurso: </h5>
                    <div className="w-full sm:w-auto sm:flex justiry-around gap-5 grid grid-cols-1 mx-auto lg:w-2/3 w-4/5 lg:mr-0">
                        <PrimaryButton  name="Exportar percurso" selected = {tab == 1 } click={() => { setTab(1)}} className="w-40"/>
                        <PrimaryButton  name="Indicacoes" selected={tab == 2 } click={() => { setTab(2),console.log("KILL")}} className="w-40"/>
                        <PrimaryButton  name="Mapa" selected={tab == 3 } click={() => { setTab(3) }} className="w-40" />
                    </div>
                </div>
                <div className="lg:flex ">
                    <div className="flex items-center justify-center flex-col">
                    <img src="/assets/images/ico_tab2.png" className="w-64" />
                    <h3 className="text-primary text-5xl font-bold">Percurso1</h3>
                    </div>
                    <div className="flex flex-col justify-between pb-5 mt-10">
                        <div className="lg:flex justify-between grid grid-cols-1 gap-10">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <img src="/assets/images/ico_from.png" className="lg:block hidden w-10 h-10" />
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
                                    <img src="/assets/images/ico_to.png" className="lg:block hidden  w-10 h-10" />
                                    <div className="flex flex-col">
                                        <h4 className="text-primary-dark text-lg">Fim no ponto:</h4>
                                        <h4 className="text-primary-dark text-lg font-bold">{course.end?course.end:""}</h4>
                                    </div>
                                </div>

                            </div>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
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
                    {tab == 2 && <div className="flex justify-between items-end">
                        <div className="w-full lg:grid-cols-4 grid-cols-1 grid text-primary-dark"> 
                            <h4 className="col-start-2 ">
                                {course.description}<br/>
                                <span className="font-bold">ALERT:Zona com major declive procure descansar de segulda.</span>
                            </h4>
                        </div>
                        <div className="flex flex-col md:flex-row w-max gap-5">
                            <a href={course.pdf?"/resource/courses/"+course.courseName+"/"+course.pdf:""}>
                                <PrimaryButton name="Print Indications" selected={false} click={handlePrint} className="min-w-max"/>
                            </a>
                            <a className="">
                            <PrimaryButton name="Enviar por email" selected={false} click={handleSendEmail} className="min-w-max"/>
                            </a>
                        </div>
                    </div>}
                    {tab == 3 && <div className="flex  flex-col lg:flex-row justify-between gap-4 p-5">
                        <div className="flex gap-5 flex-col min-w-64 justify-center w-2/5 max-w-md">
                            <div className="grid grid-cols-1 gap-5 md:block hidden">
                                <div className="flex gap-5 mb-5">
                                    <img src="/assets/images/target.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Piso predominate:</h5>
                                        <h5 className="text-primary-dark font-bold">{course.predominant}</h5>
                                    </div>
                                </div>
                                <div className="flex gap-5 mb-5">
                                    <img src="/assets/images/ico_break.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Zonas de descanso:</h5>
                                        <h5 className="text-primary-dark font-bold">{course.restZones}</h5>
                                    </div>
                                </div>
                                <div className="flex gap-5 mb-5">
                                    <img src="/assets/images/ico_declare.png" className="w-16" />
                                    <div>
                                        <h5 className="text-primary-dark">Decilive Medio:</h5>
                                        <h5 className="text-primary-dark font-bold">{course.avslope}%</h5>
                                    </div>
                                </div>
                            </div>
                            <div className=" flex flex-col gap-10"> 
                            <PrimaryButton name="Imprimir Indiacoes" selected={false} />
                            <PrimaryButton name="Enviar por email" selected={false} />

                                </div>
                        </div>
                        <div className="lg:w-3/5 w-full ">
                            <img src={`${serverUrl}/resource/courses/${course.courseName}/${course.routeImage}`} className="w-full" />
                        </div>
                    </div>}
                </div>
            </div>
        </Layout>
    );
}
