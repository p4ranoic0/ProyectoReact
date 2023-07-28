import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";

function Directores() {
  const [listaDirectores, setListaDirectores] = useState([]);
  const [iddirector, setIddirector] = useState("");
  const [nombres, setNombres] = useState("");
  const [peliculas, setPeliculas] = useState("");

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = ApiWebURL + "directores.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListaDirectores(data);
      });
  };

  const dibujarTabla = () => {
    return (
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombres</th>
            <th>Películas</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listaDirectores.map((item) => (
            <tr key={item.iddirector}>
              <td>{item.iddirector}</td>
              <td>{item.nombres}</td>
              <td>{item.peliculas}</td>
              <td>
                <i
                  className="bi bi-pencil-fill"
                  title="Editar"
                  onClick={() => llenarCampos(item)}
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                ></i>
              </td>
              <td>
                <i
                  className="bi bi-x-lg"
                  title="Eliminar"
                  onClick={() => itemEliminar(item)}
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const llenarCampos = (item) => {
    setIddirector(item.iddirector);
    setNombres(item.nombres);
    setPeliculas(item.peliculas);
  };
  const itemEliminar = (item) => {
    setIddirector(item.iddirector);
    setNombres(item.nombres);
  };

  const insertDirector = (event) => {
    event.preventDefault();
    //console.log(nombres + " -----  " + peliculas);

    document.querySelector("#insertModal .btn-close").click();

    const rutaServicio = ApiWebURL + "directoresinsert.php";
    let formData = new FormData();
    formData.append("nombres", nombres);
    formData.append("peliculas", peliculas);

    fetch(rutaServicio, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        leerServicio();
        setNombres("");
        setPeliculas("");
      });
  };

  const updateDirector = (event) => {
    event.preventDefault();
    //console.log(nombres + " -----  " + peliculas);
    document.querySelector("#updateModal .btn-close").click();

    const rutaServicio = ApiWebURL + "directoresupdate.php";
    let formData = new FormData();
    formData.append("iddirector", iddirector);
    formData.append("nombres", nombres);
    formData.append("peliculas", peliculas);

    fetch(rutaServicio, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then(() => {
        leerServicio();
        setNombres("");
        setPeliculas("");
      });
  };

  const deleteDirector = (event) => {
    event.preventDefault();
    document.querySelector("#deleteModal .btn-close").click();

    const rutaServicio = ApiWebURL + "directoresdelete.php";
    let formData = new FormData();
    formData.append("iddirector", iddirector);

    fetch(rutaServicio, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then(() => {
        leerServicio();
      });
  };

  const showInsertModal = () => {
    return (
      <div
        className="modal fade"
        id="insertModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Nuevo director
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={(event) => insertDirector(event)}>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombres del director"
                    required
                    minLength="5"
                    value={nombres}
                    onChange={(event) => setNombres(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Películas"
                    required
                    minLength="10"
                    value={peliculas}
                    onChange={(event) => setPeliculas(event.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const showUpdateModal = () => {
    return (
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Actualizar director
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={(event) => updateDirector(event)}>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={iddirector}
                    onChange={(event) => setIddirector(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombres del director"
                    required
                    minLength="5"
                    value={nombres}
                    onChange={(event) => setNombres(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Películas"
                    required
                    minLength="10"
                    value={peliculas}
                    onChange={(event) => setPeliculas(event.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const showDeleteModal = () => {
    return (
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Eliminar director
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={(event) => deleteDirector(event)}>
              <div className="modal-body">
                ¿Está seguro que desea eliminar el director {nombres}?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Eliminar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="padded">
      <div className="container">
        <h2>Directores</h2>
        <div className="mb-3">
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#insertModal"
          >
            Nuevo director
          </button>
        </div>
        {dibujarTabla()}
        {showInsertModal()}
        {showUpdateModal()}
        {showDeleteModal()}
      </div>
    </section>
  );
}

export default Directores;
