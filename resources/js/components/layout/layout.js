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
        <div className="rounded-lg p-5 justify-center flex">
            <div className="layout-container gap-5 flex flex-col">
                <div className="layout-header m-auto w-11/12">
                    <img
                        src="/assets/images/top_image.png"
                        className="w-full"
                    />
                </div>
                <main>{children}</main>
                <img src="/assets/images/woman.png" className="m-auto" />
            </div>
        </div>
    );
}
