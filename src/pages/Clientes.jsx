/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";

function Clientes() {
  const [listaClientes, setListaClientes] = useState([]);
  const [listaClientesFiltrado, setListaClientesFiltrado] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [columnaAnterior, setColumnaAnterior] = useState("usuario");
  const [textoBuscar, setTextoBuscar] = useState("");
  const [pagina, setPagina] = useState(0);
  const [filasPagina] = useState(20);
  const [numPaginas, setNumPaginas] = useState(0);
  const [ordenAscendente, setOrdenAscendente] = useState(true);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = async () => {
    const rutaServicio = ApiWebURL + "servicioclientes.php";
    const response = await fetch(rutaServicio);
    const data = await response.json();
    setListaClientes(data);
    setListaClientesFiltrado(data);
    setCargando(false);
    setNumPaginas(Math.ceil(data.length / filasPagina));
  };

  const dibujarTabla = () => {
    return (
      <table
        className="table table-dark table-striped table-bordered mt-5"
        id="lista-clientes"
      >
        <thead className="table-success">
          <tr>
            <th
              columna="usuario"
              onClick={(event) => seleccionarColumna(event)}
            >
              Usuario
              {columnaAnterior === "usuario" && (
                <i
                  className={`bi bi-chevron-${ordenAscendente ? "up" : "down"}`}
                />
              )}
            </th>
            <th
              columna="empresa"
              onClick={(event) => seleccionarColumna(event)}
            >
              Empresa
              {columnaAnterior === "empresa" && (
                <i
                  className={`bi bi-chevron-${ordenAscendente ? "up" : "down"}`}
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
                  className={`bi bi-chevron-${ordenAscendente ? "up" : "down"}`}
                />
              )}
            </th>
            <th columna="pais" onClick={(event) => seleccionarColumna(event)}>
              País
              {columnaAnterior === "pais" && (
                <i
                  className={`bi bi-chevron-${ordenAscendente ? "up" : "down"}`}
                />
              )}
            </th>
            <th
              columna="telefono"
              onClick={(event) => seleccionarColumna(event)}
            >
              Teléfono
              {columnaAnterior === "telefono" && (
                <i
                  className={`bi bi-chevron-${ordenAscendente ? "up" : "down"}`}
                />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {listaClientesFiltrado
            .slice(pagina * filasPagina, (pagina + 1) * filasPagina)
            .map((cliente) => (
              <tr key={cliente.idcliente}>
                <td>{cliente.usuario}</td>
                <td>{cliente.empresa}</td>
                <td>{cliente.nombres}</td>
                <td>{cliente.pais}</td>
                <td>{cliente.telefono}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  const seleccionarColumna = (event) => {
    const columnaSeleccionada = event.target.getAttribute("columna");
    setOrdenAscendente(
      columnaSeleccionada === columnaAnterior ? !ordenAscendente : true
    );
    setColumnaAnterior(columnaSeleccionada);

    const listaOrdenada = [...listaClientesFiltrado].sort((a, b) => {
      if (a[columnaSeleccionada] < b[columnaSeleccionada]) {
        return ordenAscendente ? -1 : 1;
      } else if (a[columnaSeleccionada] > b[columnaSeleccionada]) {
        return ordenAscendente ? 1 : -1;
      } else {
        return 0;
      }
    });

    setListaClientesFiltrado(listaOrdenada);
  };

  const buscarTexto = (event) => {
    let textoB = event.target.value;
    setTextoBuscar(textoB);
    const resultado = listaClientes.filter((cliente) =>
      cliente[columnaAnterior]
        .toString()
        .toUpperCase()
        .includes(textoB.toUpperCase())
    );
    setListaClientesFiltrado(resultado);
    setPagina(0); // Resetea la página actual al realizar una nueva búsqueda
    setNumPaginas(Math.ceil(resultado.length / filasPagina));
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

  return (
    <section className="padded">
      <div className="container">
        <h1>Lista de Clientes</h1>
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

export default Clientes;
