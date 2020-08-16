import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import './app.css';

function App() {

  //State de la app
  const [busqueda, guardarBusqueda] = useState('');

  useEffect(() => {

    const consultarApi = async () => {
      if(busqueda.trim() === '') return;
    
      const imagenesPagina = 30;
      const key = '17927841-75e7f21108e99e559f7987f3d';
      const url = `
        https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPagina}
      `;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarBusqueda(resultado.hits);
    }
    consultarApi();

  }, [busqueda]);

  return (
    <div className="contenedor">
      <div className="jumbotron">
        <h1 className="lead text-muted text-center">Buscador de Imagenes</h1>
        <Formulario 
          guardarBusqueda={ guardarBusqueda }
        />
      </div>
    </div>
  );
}

export default App;
