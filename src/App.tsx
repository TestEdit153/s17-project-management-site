import React from 'react';
import styles from './App.module.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
          <BrowserRouter>
              <nav>
                  <h1>Articles</h1>
              </nav>
              <Routes>
                  <Route path="/" element={<Home />}/>
              </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
