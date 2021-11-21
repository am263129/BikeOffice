import React, { useEffect } from "react";
import "./layout.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalState } from "../store/store";
export default function Layout({ children }) {
    const navigate = useNavigate();
    const [user] = useGlobalState("user");
    let location = useLocation();
    useEffect(() => {
        if (!user.auth && (location.pathname!=="/signin" && location.pathname!=="/signup" && location.pathname!=="/sendlink")) {
            navigate("/signin");
        }
    });
    return (
        <div className="rounded-lg p-5 justify-center flex">
            <div className="layout-container gap-5 flex flex-col">
                <div className="layout-header">
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
