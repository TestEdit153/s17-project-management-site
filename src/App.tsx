import React from 'react';
import styles from './App.module.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from './components/Navbar';
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import Login from './pages/login/Login';
import Signup from "./pages/signup/Signup";
import Sidebar from './components/Sidebar';
import {useAuthContext} from "./hooks/useAuthContext";

function App() {
    //@ts-ignore
    const {user, authIsReady} = useAuthContext()

    return (
        <div className={styles.main}>
            {/* 1. Render app only if authIsReady */}
            {authIsReady
                ? (
                    <BrowserRouter>
                        <div className="fixed w-full"> <Navbar/> </div>
                        {user
                            ? (
                                // user != null, - show 2 col layout with sidebar
                                <div className={styles["grid-3-cols"]}>
                                    <div className={styles["sidebar"]}>
                                        <Sidebar />
                                    </div>
                                    <div className={styles["page-content"]}>
                                        <Routes>
                                            <Route path="/" element={<Dashboard/>}/>
                                            <Route path="/create" element={<Create/>}/>
                                            <Route path="/project/:id" element={<Project/>}/>
                                            <Route path="/login" element={
                                                <Navigate to="/" replace={true} />
                                            }/>
                                            <Route path="/signup" element={
                                                <Navigate to="/" replace={true} />
                                            }/>
                                        </Routes>
                                    </div>
                                </div>
                            )
                            : (
                                // user == null - do not show sidebar
                                <div className={styles["grid-1-cols"]}>
                                    <div className="p-3 pt-16 min-h-screen">
                                        <Routes>
                                            <Route path="*" element={
                                                <Navigate to="/signup" replace={true} />
                                            }/>
                                            <Route path="/login" element={<Login/>}/>
                                            <Route path="/signup" element={<Signup/>}/>
                                        </Routes>
                                    </div>
                                </div>
                            )
                        }
                    </BrowserRouter>
                )
                : (
                    <div>Checking Authentication</div>
                )
            }
        </div>
    );
}

export default App;