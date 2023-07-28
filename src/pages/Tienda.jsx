import { useEffect, useState } from "react";
import Productos from "../components/Productos";
import { ApiWebURL } from "../utils";

function Tienda() {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = ApiWebURL + "categorias.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setListaCategorias(data);
      });
  };

  const seleccionarCategoria = (event, item) => {
    //console.log(item);
    setCategoriaSeleccionada(item);

    let itemsLista = document.querySelectorAll("#lista-categorias li");
    itemsLista.forEach((item) => {
      item.classList.remove("active");
    });

    event.currentTarget.classList.add("active");
    //event.currentTarget hace referencia al objeto que recibió el evento
    //classList.add("active") añade la clase active a la lista de clases
  };

  const dibujarLista = () => {
    return (
      <ul className="list-group " id="lista-categorias">
        {listaCategorias.map((item) => (
          <li
            className="list-group-item"
            key={item.idcategoria}
            title={item.descripcion}
            onClick={(event) => seleccionarCategoria(event, item)}
          >
            {item.nombre}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="padded">
      <div className="container">
        <h2>Tienda</h2>
        <div className="row">
          <div className="col-xl-2 col-md-3">{dibujarLista()}</div>
          <div className="col-xl-10 col-md-9">
            <h3>{categoriaSeleccionada.nombre}</h3>
            <small>{categoriaSeleccionada.descripcion}</small>
            <Productos categoriaProductos={categoriaSeleccionada.idcategoria} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tienda;
