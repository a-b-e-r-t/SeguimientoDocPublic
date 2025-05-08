import { useState, useEffect } from "react";
import { fetchTiposDocumento } from "../../api/nom_doc";  // Asegúrate de importar correctamente la función

export default function BackCard() {
  const [tiposDocumento, setTiposDocumento] = useState<any[]>([]);  // Cambié el tipo a 'any[]' para manejar objetos
  const [cargando, setCargando] = useState<boolean>(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  useEffect(() => {
    const obtenerTiposDocumento = async () => {
      setCargando(true);
      try {
        const documentos = await fetchTiposDocumento();  // Llamada a la API
        setTiposDocumento(documentos);  // Suponiendo que documentos es un array de objetos
      } catch (error) {
        console.error("Error al obtener los tipos de documento:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerTiposDocumento();  // Llamada a la API cuando el componente se monta
  }, []);

  const handleTipoSeleccionado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoSeleccionado(event.target.value);  // Actualiza el valor seleccionado
  };

  return (
    <div className="text-center text-black dark:text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Seguimiento de trámites profesionales</h1>

      {/* Formulario de búsqueda */}
      <div className="space-y-4">
        {/* Contenedor para inputs en línea */}
        <div className="flex justify-center space-x-4">

          {/* Tercer input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="DNI"
              className="w-full py-3 px-4 text-lg bg-white dark:bg-neutral-800 text-black dark:text-white rounded-xl shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Primer input (dropdown) */}
          <div className="flex-1">
            <select
              value={tipoSeleccionado}  // Establecer el valor seleccionado
              onChange={handleTipoSeleccionado}  // Manejar el cambio
              className="w-full py-3 px-4 text-lg bg-white dark:bg-neutral-800 text-black dark:text-white rounded-xl shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Seleccionar opción</option>
              {cargando ? (
                <option value="">Cargando...</option>  // Mientras cargan los datos
              ) : (
                tiposDocumento.map((tipo, index) => (
                  <option key={index} value={tipo.cdoc_desdoc}>{tipo.cdoc_desdoc}</option>  // Extraer la propiedad correcta
                ))
              )}
            </select>
          </div>

          {/* Segundo input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="N° de documento"
              className="w-full py-3 px-4 text-lg bg-white dark:bg-neutral-800 text-black dark:text-white rounded-xl shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botón de búsqueda (rojo) */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-red-500 dark:bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
