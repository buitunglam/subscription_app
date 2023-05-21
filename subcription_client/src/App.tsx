import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Hero from "./components/Hero/Hero";
import LandingPages from "./Pages/LandingPages";

function App() {
    return (
        <div>
            <Nav />
            <Routes>
              <Route path="/" element={<LandingPages/>} />
            </Routes>
        </div>
    );
}

export default App;
