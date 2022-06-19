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
            <BrowserRouter>
                <div className="fixed w-full">
                    <Navbar/>
                </div>
                {user
                    ? (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 p-3 pt-16 pr-0 bg-slate-200 min-h-screen ">
                                <Sidebar />
                            </div>
                            <div className="col-span-2 p-3 pt-16 bg-gray-100 min-h-screen">
                                <Routes>
                                    <Route path="/" element={<Dashboard/>}/>
                                    <Route path="/create" element={<Create/>}/>
                                    <Route path="/project/:id" element={<Project/>}/>
                                    <Route path="/login" element={!user
                                        ? <Login />
                                        : <Navigate to="/" replace={true} />
                                    }/>
                                    <Route path="/signup" element={!user
                                            ? <Signup />
                                            : <Navigate to="/" replace={true} />
                                    }/>
                                </Routes>
                            </div>
                        </div>
                    )
                    : (
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-3 pt-16 min-h-screen">
                                <Routes>
                                    <Route path="*" element={
                                        <Navigate to="/signup" replace={true} />
                                    }/>
                                    {/*<Route path="/create" element={*/}
                                    {/*    <Navigate to="/signup" replace={true} />*/}
                                    {/*}/>*/}
                                    {/*<Route path="/project/:id" element={*/}
                                    {/*    <Navigate to="/signup" replace={true} />*/}
                                    {/*}/>*/}
                                    <Route path="/login" element={<Login/>}/>
                                    <Route path="/signup" element={<Signup/>}/>
                                </Routes>
                            </div>
                        </div>
                    )
                }

            </BrowserRouter>
        </div>
    );
}

export default App;
