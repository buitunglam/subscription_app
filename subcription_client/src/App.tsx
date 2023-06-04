import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import LandingPages from "./Pages/LandingPages";
import Articles from "./Pages/Articles";
import { UserContext } from "./context";
import ProtectedRoute from "./routes/ProtectedRoute";
import ArticlePlans from "./Pages/ArticlePlans";

function App() {
  const [user, setUser] = useContext(UserContext);

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/article-plans" element={<ArticlePlans />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
