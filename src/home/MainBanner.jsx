import imagenyo from "./../assets/images/yo.png";
import TypewriterEffect from "../utils/TypewriterEffect";

function MainBanner() {
  const texts = ["Developer", "Professional Coder.", "UI/UX Designer."];
  const speed = 100; // Velocidad en milisegundos

  return (
    <>
      <section id="home" className="mt-5 align-items-mid">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <span className="subtitle">Welcome to my world</span>
              <h1 className="title">
                Hola, Yo soy <span className="nombre">Mayra Cruzado</span>
                <br />
                <span className="header-caption">
                  {/* <!-- type headline start--> */}
                  <span className="cd-headline clip is-full-width">
                  una {" "}
                    {/* <!-- ROTATING TEXT --> */}

                    <span className="">
                      {" "}
                      <TypewriterEffect texts={texts} speed={speed} />
                    </span>
                  </span>
                </span>
              </h1>
              <div>
                <p className="description">
                  <span>
                    I use animation as a third dimension by which to simplify
                    experiences and kuiding thro each and every interaction. I’m
                    not adding motion just to spruce things up, but doing it in
                    ways that.
                  </span>
                </p>
              </div>
              <div className="row mt-5">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <div className="card bg-transparent border-0">
                    <div className="card-body">
                      <p className="subtitle">CONTACTAME</p>
                      <div className="card-text iconos">
                        <ul className="lista-iconos">
                          <li className="iconos-items">
                            <a href="">
                              <i
                                className="bi bi-facebook"
                                title="facebook"
                              ></i>
                            </a>
                          </li>
                          <li className="iconos-items">
                            <a href="">
                              <i
                                className="bi bi-twitter "
                                title="facebook"
                              ></i>
                            </a>
                          </li>
                          <li className="iconos-items ">
                            <a href="">
                              <i
                                className="bi bi-facebook "
                                title="facebook"
                              ></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <div className="card bg-transparent border-0">
                    <div className="card-body">
                      <p className="subtitle">mejores skills</p>
                      <div className="card-text iconos">
                        <ul className="lista-iconos">
                          <li className="iconos-items">
                            <a href="">
                              <i
                                className="bi bi-facebook"
                                title="facebook"
                              ></i>
                            </a>
                          </li>
                          <li className="iconos-items">
                            <a href="">
                              <i
                                className="bi bi-twitter "
                                title="facebook"
                              ></i>
                            </a>
                          </li>
                          <li className="iconos-items ">
                            <a href="">
                              <i
                                className="bi bi-facebook "
                                title="facebook"
                              ></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card bg-transparent border-0">
                <img src={imagenyo} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title"></h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainBanner;
