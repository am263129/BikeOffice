import React, { useState } from "react";
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "./layout.scss";
export default function AdminLayout({ children }) {
    const [active, setActive] = useState(0);
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
