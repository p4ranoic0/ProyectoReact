import { useEffect } from "react";
import { useState } from "react";
import { ApiWebURL } from "../utils";

function Seleccionados() {
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    leerDatosCarrito();
  }, []);

  const leerDatosCarrito = async () => {
    let datosCarrito = await JSON.parse(
      sessionStorage.getItem("seleccionEmpleado")
    );
    //console.log(datosCarrito);
    setItemsCarrito(datosCarrito);
    if (datosCarrito !== null) {
      calcularTotal(datosCarrito);
    }
  };

  const calcularTotal = (datosCarrito) => {
    let suma = datosCarrito.reduce(
      (acumular, fila) => acumular + fila["cantidad"],
      0
    );
    setTotal(suma);
  };

  const dibujarTabla = () => {
    return (
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th></th>
            <th className="text-end">Nombres</th>
            <th className="text-end">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {itemsCarrito === null ? (
            <></>
          ) : (
            itemsCarrito.map((item, index) => (
              <tr key={item.idempleado}>
                <td>{item.idempleado}</td>
                <td>
                  <img
                    src={ApiWebURL + "fotos/" + item.foto}
                    className="img-thumbnail imagen-chiquita"
                    alt="..."
                  />
                </td>
                <td>
                  {item.nombres} {item.apellidos}
                </td>

                <td className="text-end">
                  <input
                    type="number"
                    className="form-control text-end cantidad-carrito"
                    min="0"
                    value={item.cantidad}
                    onChange={(event) =>
                      actualizarCantidad(event.target.value, index)
                    }
                  />
                </td>

                <td>
                  <i
                    className="bi bi-x-lg botonEliminar"
                    title="Eliminar"
                    onClick={() => eliminarItem(item)}
                  ></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="3" className="text-end">
              Total
            </th>
            <th className="text-end">{Number(total).toFixed(2)}</th>
          </tr>
        </tfoot>
      </table>
    );
  };

  const actualizarCantidad = (cantidad, index) => {
    let carritoCantidad = [...itemsCarrito];
    carritoCantidad[index].cantidad = cantidad;
    setItemsCarrito(carritoCantidad);
    calcularTotal(carritoCantidad);
    sessionStorage.setItem(
      "seleccionEmpleado",
      JSON.stringify(carritoCantidad)
    );
  };

  const eliminarItem = (item) => {
    let carritoMenos = itemsCarrito.filter(
      (itemCarrito) => itemCarrito.idempleado !== item.idempleado
    );
    setItemsCarrito(carritoMenos);
    sessionStorage.setItem("seleccionEmpleado", JSON.stringify(carritoMenos));
    calcularTotal(carritoMenos);
  };

  const vaciarCarrito = () => {
    sessionStorage.removeItem("seleccionEmpleado");
    setItemsCarrito([]);
    setTotal(0);
  };

  return (
    <section className="padded">
      <div className="container">
        <h1>Carrito de Empleado</h1>
        <div className="row">
          <div className="col-md-10">{dibujarTabla()}</div>
          <div className="col-md-2">
            <button className="btn btn-danger" onClick={() => vaciarCarrito()}>
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Seleccionados;
