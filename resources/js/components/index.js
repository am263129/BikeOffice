import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import HomePage from "./pages/user/home";
import LandingPage from "./pages/landing";
import SigninPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import PercursosPage from "./pages/user/percursos";
import PercursoPage from "./pages/user/Percurso";
import TypologyPage from "./pages/admin/typology";
import CityPage from "./pages/admin/cities";
import CoursePage from "./pages/admin/course";
import AdminPage from "./pages/admin/home";
import ManageCoursePage from "./pages/admin/editcourse";
import TestPage from "./pages/user/test";
import SendLink from "./pages/password_reset/sendlink";
import NoComponentPage from "./pages/404";
import { useGlobalState } from "./store/store";

function Example() {
    const [token, setToken] = useState();
    return (
        <div className="mx-auto">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SigninPage />} />
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/sendlink" element={<SendLink />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/percursos" element={<PercursosPage />} />
                    <Route path="/percurso" element={<PercursoPage />} />
                    <Route path="/admin.home" element={<AdminPage />} />
                    <Route path="/admin.graus" element={<TypologyPage />} />
                    <Route path="/admin.city" element={<CityPage />} />
                    <Route path="/admin.course" element={<CoursePage />} />
                    <Route
                        path="/admin.course.manage"
                        element={<ManageCoursePage />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Example;

if (document.getElementById("root")) {
    ReactDOM.render(<Example />, document.getElementById("root"));
}
