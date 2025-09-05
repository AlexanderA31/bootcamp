import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";

import Pets from "./Components/Pets/Pets";
import AdoptForm from "./Components/AdoptForm/AdoptForm";
import AdminLogin from "./Components/AdminPanel/AdminLogin";
import "./App.css";
import { ThemeContext } from './context/ThemeContext';

const Layout = ({ children }) => (
  <>
    <Navbar title="Adop.me" />
    {children}
    <Footer title="Adop.me" />
  </>
);

const App = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home description="Asegúrese de estar completamente preparado para brindar el cuidado y la atención adecuados a su mascota antes de darle la bienvenida a su hogar." />
              </Layout>
            }
          />
          <Route
            path="/servicios"
            element={
              <Layout>
                <Services />
              </Layout>
            }
          />
          
          <Route
            path="/mascotas"
            element={
              <Layout>
                <Pets />
              </Layout>
            }
          />
          <Route
            path="/adoptar"
            element={
              <Layout>
                <AdoptForm />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={<AdminLogin />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
