/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";

function DetallePedido(props) {
  const [itemPedido, setDetallePedido] = useState([]);
  const [setCargando] = useState(true); // Estado para indicar si los datos se están cargando

  useEffect(() => {
    leerServicio(props.detallePedidos);
  }, [props.detallePedidos]);

  const leerServicio = (idpedido) => {
    console.log(idpedido);
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
    if (itemPedido === null) {
      return <p>Cargando detalle del pedido...</p>;
    }
    return (
      <table
        className="table table-dark table-bordered border-success"
        id="lista-pedidos"
      >
        <thead className="table-success">
          <tr>
            <th></th>
            <th>Producto</th>
            <th>Detalle</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {itemPedido.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={ApiWebURL + item.imagenchica}
                  className="imagen-chiquita"
                  alt="..."
                />
              </td>
              <td>{item.nombre}</td>
              <td>{item.detalle}</td>
              <td>{item.cantidad}</td>
              <td className="text-end">S/ {Number(item.precio).toFixed(2)}</td>

              <td className="text-end">
                S/ {Number(item.precio * item.cantidad).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return <div className="container mb-5 mt-5">{dibujarTablaDetalle()}</div>;
}

export default DetallePedido;
