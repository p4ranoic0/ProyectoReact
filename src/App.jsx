import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainFooter from "./common/MainFooter";

import MainNav from "./common/MainNav";
import Inicio from "./pages/Inicio";
import Inversiones from "./pages/Inversiones";
import Proveedores from "./pages/Proveedores";
import Empleados from "./pages/Empleados";
import Tienda from "./pages/Tienda";
import ProductoDetalles from "./pages/ProductoDetalles";
import Carrito from "./pages/Carrito";
import Seleccionados from "./pages/Seleccionados";
import Pedidos from "./pages/pedidos";
import Consultas from "./pages/Consultas";
import Login from "./pages/Login";
import Directores from "./pages/Directores";
import { useState } from "react";
import Escritorio from "./pages/Escritorio";
import ProtectedRoute from "./utils/ProtectedRoute";
import CardDetallePedido from "./pages/CardDetallePedido";
import Nosotros from "./home/Nosotros";
import Noticias from "./home/Noticias";
import Clientes from "./pages/Clientes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const handleLogin = (data) => {
    setIsAuthenticated(true);
    console.log(data);
    setUsuario(data);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("userdata");
    alert("Su sesión ha sido cerrada");
  };

  return (
    <>
      {/* Este es un comentario */}
      <BrowserRouter>
        <MainNav
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          usuario={usuario}
        />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/inversiones"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Inversiones />
              </ProtectedRoute>
            }
          />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/seleccionados" element={<Seleccionados />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route
            path="/detallePedido/:idpedido"
            element={<CardDetallePedido />}
          />

          <Route
            path="/directores"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Directores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productodetalles/:idproducto"
            element={<ProductoDetalles />}
          />
          <Route path="/carrito" element={<Carrito />} />
          <Route
            path="/escritorio"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Escritorio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <Login
                onLogin={(data) => handleLogin(data)}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>

        <MainFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
