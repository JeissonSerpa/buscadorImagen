import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import './app.css';

function App() {

  //State de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {

    const consultarApi = async () => {
      if(busqueda.trim() === '') return;
    
      const imagenesPagina = 30;
      const key = '17927841-75e7f21108e99e559f7987f3d';
      const url = `
        https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPagina}&page=${paginaactual}
      `;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);

      //Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits/ imagenesPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //Mover pantalla al inicio
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });

    }
    consultarApi();

  }, [busqueda, paginaactual]);

  //Definir pagina anterio
  const paginaAnterior = () => {
    const nuevapaginaactual = paginaactual - 1;

    if(nuevapaginaactual === 0) return;

    guardarPaginaActual(nuevapaginaactual);
  }

  //Definir pagina Siguiente
  const paginaSiguiente = () => {
    const nuevapaginaactual = paginaactual + 1;

    if(nuevapaginaactual > totalpaginas) return;

    guardarPaginaActual(nuevapaginaactual);
  }

  return (
    <div className="contenedor">
      <div className="jumbotron">
        <h1 className="lead text-muted text-center">Buscador de Imagenes</h1>
        <Formulario 
          guardarBusqueda={ guardarBusqueda }
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={ imagenes }
        />

        {
          (paginaactual === 1) ? null :
            <button
              type="button"
              className="btn btn-info mr-1 mb-5"
              onClick={paginaAnterior}
            >
              &laquo; Anterior
            </button>
        }

        {
          (paginaactual === totalpaginas) ? null :
            <button
              type="button"
              className="btn btn-info mb-5"
              onClick={paginaSiguiente}
            >
              Siguiente &raquo;
            </button>
        }
      </div>
    </div>
  );
}

export default App;
