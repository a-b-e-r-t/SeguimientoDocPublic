import React, { useState, useEffect } from "react";
import { fetchTiposDocumento } from "../../api/nom_doc";

// Tipo para los props si deseas reutilizar búsqueda aquí también
interface BackCardProps {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

// Tipo para los objetos que vienen de la API
interface TipoDocumento {
  cdoc_coddoc: string;
  cdoc_desdoc: string;
}

const BackCard: React.FC<BackCardProps> = ({ query, onChange, onSearch }) => {
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");

  useEffect(() => {
    const obtenerTiposDocumento = async () => {
      setCargando(true);
      try {
        const documentos: TipoDocumento[] = await fetchTiposDocumento();
        setTiposDocumento(documentos);
      } catch (error) {
        console.error("Error al obtener los tipos de documento:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerTiposDocumento();
  }, []);

  const handleTipoSeleccionado = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoSeleccionado(event.target.value);
  };

  return (
    <div className="text-center text-black dark:text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Seguimiento de trámites profesionales</h1>

      {/* Formulario de búsqueda */}
      <div className="space-y-4">
        <div className="flex justify-center space-x-4">
          {/* Input: DNI */}
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={onChange}
              placeholder="DNI"
              className="w-full py-3 px-4 text-lg bg-white dark:bg-neutral-800 text-black dark:text-white rounded-xl shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Select: tipo de documento */}
          <div className="flex-1">
            <select
              value={tipoSeleccionado}
              onChange={handleTipoSeleccionado}
              className="w-full py-3 px-4 text-lg bg-white dark:bg-neutral-800 text-black dark:text-white rounded-xl shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Seleccionar opción</option>
              {cargando ? (
                <option value="">Cargando...</option>
              ) : (
                tiposDocumento.map((tipo) => (
                  <option key={tipo.cdoc_coddoc} value={tipo.cdoc_desdoc}>
                    {tipo.cdoc_desdoc}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Input: número de documento */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="N° de documento"
              className="w-full py-3 px-4 text-lg bg-white dark:bg-neutral-800 text-black dark:text-white rounded-xl shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botón de búsqueda */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onSearch}
            className="bg-red-500 dark:bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackCard;
