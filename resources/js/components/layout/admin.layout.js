import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalState } from "../store/store";
import "./layout.scss";
export default function AdminLayout({ children }) {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const [user] = useGlobalState("user");
    let location = useLocation();
    useEffect(() => {
        if (!user.auth && (location.pathname!=="/signin" && location.pathname!=="/signup" && location.pathname!=="/sendlink")) {
            navigate("/signin");
        }
        else if(user.role!=="admin"){
            navigate("/home");
        }
    });
    return (
        <div className="bg-green-100 rounded-lg flex gap-5">
            <Sidebar />
            <div className="flex flex-col gap-5">
                <NavBar />
                <main className="w-full bg-white rounded-l-xl">{children}</main>
            </div>
        </div>
    );
}
