import React, { useEffect } from "react";
import "./layout.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalState } from "../store/store";
export default function Layout({ children }) {
    // const navigate = useNavigate();
    // const [user] = useGlobalState("user");
    // let location = useLocation();
    // useEffect(() => {
    //     if (!user.auth && (location.pathname.includes("admin"))) {
    //         navigate("/signin");
    //     }
    // });
    console.log("K")
    return (
        <div className="rounded-lg p-5 flex justify-center">
            <div className="layout-container gap-5 flex flex-col xl:w-custom-full">
                <div className="layout-header m-auto w-full h-52 rounded-xl flex flex-col items-start justify-center px-20">
                    <img src="/assets/images/logo.png" alt="top logo"/>
                    <p className="text-white lg:w-1/2 text-center sm:text-left">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut</p>
                </div>
                <main>{children}</main>
                <img src="/assets/images/woman.png" className="m-auto" />
            </div>
        </div>
    );
}
