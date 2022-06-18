import React from 'react';
import styles from './App.module.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Navbar from './components/Navbar';
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import Login from './pages/login/Login';
import Signup from "./pages/signup/Signup";
import Sidebar from './components/Sidebar';

function App() {
    return (
        <div className={styles.main}>
            <BrowserRouter>
                <div className="fixed w-full">
                    <Navbar/>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 p-3 pt-16 pr-0 bg-slate-200 min-h-screen ">
                        <Sidebar />
                    </div>
                    <div className="col-span-2 p-3 pt-16 bg-gray-100 min-h-screen">
                        <Routes>
                            <Route path="/" element={<Dashboard/>}/>
                            <Route path="/create" element={<Create/>}/>
                            <Route path="/project/:id" element={<Project/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
