/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";
import { useNavigate } from "react-router-dom";

function Consultas() {
  const [listaPedidos, setListaPedidos] = useState([]);
  const [listaPedidosFiltrado, setListaPedidosFiltrado] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ascendente] = useState(1);
  const [columnaAnterior, setColumnaAnterior] = useState("usuario");
  const [textoBuscar, setTextoBuscar] = useState("");
  const [pagina, setPagina] = useState(0);
  const [filasPagina] = useState(25);
  const [numPaginas, setNumPaginas] = useState(0);
  const [ordenAscendente, setOrdenAscendente] = useState({
    idpedido: true,
    usuario: true,
    fechapedido: true,
    nombres: true,
    total: true,
  });

  const navigate = useNavigate(); // Obtiene el objeto history para redirigir

  const redirigirDetallePedido = (idpedido) => {
    // Redirige a la página de detalle del pedido utilizando el ID del pedido
    navigate(`/detallePedido/${idpedido}`);
  };

  useEffect(() => {
    leerServicio();
  });

  const leerServicio = async () => {
    const rutaServicio = ApiWebURL + "pedidos.php";
    const response = await fetch(rutaServicio);
    const data = await response.json();
    setListaPedidos(data);
    setListaPedidosFiltrado(data);
    setCargando(false);
    setNumPaginas(Math.ceil(data.length / filasPagina));
  };

  const dibujarTabla = () => {
    return (
      <table
        className="table table-dark table-striped table-bordered mt-5"
        id="lista-pedidos"
      >
        <thead className="table-success">
          <tr>
            <th
              columna="idpedido"
              onClick={(event) => seleccionarColumna(event)}
            >
              Código
              {columnaAnterior === "idpedido" && (
                <i
                  className={`bi bi-chevron-${ascendente > 0 ? "up" : "down"}`}
                />
              )}
            </th>
            <th
              columna="usuario"
              onClick={(event) => seleccionarColumna(event)}
            >
              Usuario
              {columnaAnterior === "usuario" && (
                <i
                  className={`bi bi-chevron-${ascendente > 0 ? "up" : "down"}`}
                />
              )}
            </th>
            <th
              columna="fechapedido"
              onClick={(event) => seleccionarColumna(event)}
            >
              Fecha
              {columnaAnterior === "fechapedido" && (
                <i
                  className={`bi bi-chevron-${ascendente > 0 ? "up" : "down"}`}
                />
              )}
            </th>
            <th
              columna="nombres"
              onClick={(event) => seleccionarColumna(event)}
            >
              Nombres
              {columnaAnterior === "nombres" && (
                <i
                  className={`bi bi-chevron-${ascendente > 0 ? "up" : "down"}`}
                />
              )}
            </th>
            <th columna="total" onClick={(event) => seleccionarColumna(event)}>
              Total
              {columnaAnterior === "total" && (
                <i
                  className={`bi bi-chevron-${ascendente > 0 ? "up" : "down"}`}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {listaPedidosFiltrado
            .slice(pagina * filasPagina, (pagina + 1) * filasPagina)
            .map((item) => (
              // Utiliza el componente Link para redirigir al detalle del pedido
              <tr key={item.idpedido} title={item.idpedido}>
                <td
                  onClick={() => redirigirDetallePedido(item.idpedido)}
                  className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                >
                  {item.idpedido}
                </td>
                <td>{item.usuario}</td>
                <td>{item.fechapedido}</td>
                <td>{item.nombres}</td>
                <td>S/ {Number(item.total).toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  const seleccionarColumna = (event) => {
    const columnaSeleccionada = event.target.getAttribute("columna");
    const ordenAnterior = ordenAscendente[columnaSeleccionada];

    setOrdenAscendente({
      ...ordenAscendente,
      [columnaSeleccionada]: -ordenAnterior,
    });
    setColumnaAnterior(columnaSeleccionada);

    setListaPedidosFiltrado((lista) =>
      [...lista].sort((a, b) => {
        if (a[columnaSeleccionada] < b[columnaSeleccionada]) {
          return -1 * ordenAnterior;
        } else if (a[columnaSeleccionada] > b[columnaSeleccionada]) {
          return 1 * ordenAnterior;
        } else {
          return 0;
        }
      })
    );
  };

  const dibujarPrecarga = () => {
    return (
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  };

  const buscarTexto = (event) => {
    let textoB = event.target.value;
    setTextoBuscar(textoB);
    const resultado = listaPedidos.filter((item) =>
      item[columnaAnterior].toUpperCase().includes(textoB.toUpperCase())
    );
    setListaPedidosFiltrado(resultado);
  };

  const avanzar = () => {
    if (pagina < numPaginas - 1) {
      setPagina(pagina + 1);
    }
  };
  const retroceder = () => {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  };

  const dibujarPaginacion = () => {
    const botones = [];
    for (let i = 0; i < numPaginas; i++) {
      botones.push(
        <li key={i} className={`page-item ${pagina === i ? "active" : ""}`}>
          <a className="page-link" onClick={() => irAPagina(i)}>
            {i + 1}
          </a>
        </li>
      );
    }
    return botones;
  };

  const irAPagina = (numeroPagina) => {
    setPagina(numeroPagina);
  };

  return (
    <section className="padded">
      <div className="container">
        <h1>Lista Pedidos</h1>
        <div className="mb-3">
          <input
            type="text"
            value={textoBuscar}
            onChange={buscarTexto}
            className="form-control"
            placeholder={`Buscar por ${columnaAnterior}`}
          />
        </div>

        {cargando ? dibujarPrecarga() : dibujarTabla()}
        <div> {pagina + 1 + " de " + numPaginas}</div>
        <nav
          aria-label="Paginacion"
          class="navbar bg-dark border-bottom border-bottom-dark"
          data-bs-theme="dark"
        >
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" onClick={retroceder}>
                Previous
              </a>
            </li>
            {dibujarPaginacion()}
            <li className="page-item">
              <a className="page-link" onClick={avanzar}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Consultas;
