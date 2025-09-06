import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";

import Pets from "./Components/Pets/Pets";
import AdoptForm from "./Components/AdoptForm/AdoptForm";
import { useLocation } from "react-router-dom";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import AdminLogin from "./Components/AdminPanel/AdminLogin";
import "./App.css";
import { ThemeContext } from './context/ThemeContext';
import ChatBot from "./Components/ChatBot/ChatBot";

const Layout = ({ children }) => (
  <>
    <Navbar title="Adop.me" />
    {children}
    <Footer title="Adop.me" />
  </>
);

const App = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const showAdminLogin = location.pathname === '/admin' && !isAdmin;
  const onAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const AppRoutes = (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Home description="Asegúrese de estar completamente preparado para brindar el cuidado y la atención adecuados a su mascota antes de darle la bienvenida a su hogar." />
            <ChatBot />
          </>
        }
      />
      <Route
        path="/servicios"
        element={<Services />}
      />
      
      <Route
        path="/mascotas"
        element={<Pets />}
      />
      <Route
        path="/adoptar"
        element={<AdoptForm />}
      />
      <Route
        path="/admin"
        element={isAdmin ? <AdminPanel /> : <Home description="Asegúrese de estar completamente preparado para brindar el cuidado y la atención adecuados a su mascota antes de darle la bienvenida a su hogar." />}
      />
    </Routes>
  );

  return (
    <div className="App">
      {onAdminPage && isAdmin ? (
        AppRoutes
      ) : (
        <Layout>
          {AppRoutes}
        </Layout>
      )}
      {showAdminLogin && <AdminLogin />}
    </div>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
