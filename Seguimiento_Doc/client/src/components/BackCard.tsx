export default function BackCard() {
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
              className="w-full py-3 px-4 text-lg bg-white dark:bg-neutral-800 text-black dark:text-white rounded-xl shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>Seleccionar opción</option>
              <option value="campo1">INFORME</option>
              <option value="campo2">CARTA</option>
              <option value="campo3"></option>
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
