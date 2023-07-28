/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";
import { useParams } from "react-router-dom"; // Importar useParams desde react-router-dom
import { BsBox, BsPencilSquare, BsTrash } from "react-icons/bs";

function CardDetallePedido() {
  const { idpedido } = useParams(); // Obtener el valor de "idpedido" desde la URL
  const [itemPedido, setDetallePedido] = useState([]);
  const [cargando, setCargando] = useState(true); // Estado para indicar si los datos se están cargando

  useEffect(() => {
    leerServicio(idpedido); // Usar el valor de "idpedido" obtenido desde useParams
  }, [idpedido]);

  const leerServicio = (idpedido) => {
    const rutaServicio = ApiWebURL + "pedidosdetalle.php?idpedido=" + idpedido;

    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDetallePedido(data);
        setCargando(false); // Se detiene la carga una vez que se han cargado los datos
      })
      .catch((error) => {
        console.error(error);
        setCargando(false); // Se detiene la carga en caso de error
      });
  };

  const dibujarTablaDetalle = () => {
    if (cargando) {
      return <p>Cargando detalle del pedido...</p>;
    }
    return (
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {itemPedido.map((item, index) => (
          <div className="col" key={index}>
            <div className="card">
              <img
                src={ApiWebURL + item.imagenchica}
                className="card-img-top"
                alt="..."
                style={{ height: "150px", objectFit: "cover" }} // Ajustar tamaño de la imagen
              />
              <div className="card-body">
                <h5 className="card-title">{item.nombre}</h5>
                <p className="card-text">{item.detalle}</p>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="card-text">
                      <BsBox size={18} /> Cantidad: {item.cantidad}
                    </p>
                    <p className="card-text">
                      <BsPencilSquare size={18} /> Precio: S/{" "}
                      {Number(item.precio).toFixed(2)}
                    </p>
                    <p className="card-text">
                      <BsTrash size={18} /> Subtotal: S/{" "}
                      {Number(item.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-end">
                    <button className="btn btn-primary">
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <div className="container mb-5 mt-5">{dibujarTablaDetalle()}</div>;
}

export default CardDetallePedido;
