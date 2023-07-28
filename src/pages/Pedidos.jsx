import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";
import DetallePedido from "./DetallePedido";

function Pedidos() {
  const [listaPedidos, setListaPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);

  const seleccionarPedido = (event, item) => {
    setPedidoSelecionado(item);
  };

  const leerServicio = () => {
    const rutaServicio = ApiWebURL + "pedidos.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListaPedidos(data);
      });
  };

  const dibujarTabla = () => {
    return (
      <table className="table table-dark table-striped table-bordered" id="lista-pedidos">
        <thead className="table-info">
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Nombres</th>
          </tr>
        </thead>
        <tbody>
          {listaPedidos.map((item) => (
            <tr
              key={item.idpedido}
              title={item.idpedido}
              onClick={(event) => seleccionarPedido(event, item)}
            >
              <td>{item.idpedido}</td>
              <td>{item.fechapedido}</td>
              <td>{item.nombres}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <section className="padded">
      <div className="container">
        <h1>Lista Pedidos</h1>
        <div className="row">
          <div className="col-md-4">{dibujarTabla()}</div>
          <div className="col-md-8">
            <h2>
              Cod : {pedidoSelecionado.idpedido} {pedidoSelecionado.nombres}
            </h2>
            <small>Fecha: {pedidoSelecionado.fechapedido}</small>
            <DetallePedido detallePedidos={pedidoSelecionado.idpedido} />
            <table className="table table-dark mt-0">
              <tfoot>
                <tr>
                  <th colSpan="4" className="text-end">
                    Total
                  </th>
                  <th className="text-end">
                    S/ {Number(pedidoSelecionado.total).toFixed(2)}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pedidos;
