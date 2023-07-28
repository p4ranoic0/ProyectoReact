import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";

function Escritorio() {
  // Obtener el navigate para redirigir al usuario si no ha iniciado sesión
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos del usuario del localStorage
    const userData = JSON.parse(localStorage.getItem("userdata"));

    // Verificar si el usuario ha iniciado sesión
    if (!userData) {
      // Si no ha iniciado sesión, redirigir al componente Login (o cualquier otra página de inicio de sesión)
      navigate("/login");
    }
  }, [navigate]);

  // Obtener los datos del usuario del localStorage
  const userData = JSON.parse(localStorage.getItem("userdata"));

  return (
    <section className="padded">
      <div className="container">
        <h2>Escritorio</h2>
        {userData ? (
          <div>
            <div>
              <BsPerson size={30} /> {userData[0].nombres}
            </div>
            <div>Usuario: {userData[0].usuario}</div>
            <div>Empresa: {userData[0].empresa}</div>
            <div>Cargo: {userData[0].cargo}</div>
            <div>Dirección: {userData[0].direccion}</div>
            {/* Mostrar otros datos del usuario si están disponibles */}
          </div>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
      </div>
    </section>
  );
}

export default Escritorio;
