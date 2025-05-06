import { useEffect, useState } from "react";
import { fetchResumenPorExpediente } from "../../api/remitos";

interface TreeProps {
  expediente: string;
}

export default function Tree({ expediente }: TreeProps) {
  const [datos, setDatos] = useState<any[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      if (!expediente) return;
      setCargando(true);
      try {
        const response = await fetchResumenPorExpediente(expediente);
        setDatos(response);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setDatos([]);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [expediente]);

  const formatearFechaHora = (fechaISO: string) => {
    if (!fechaISO) return "Fecha no disponible";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        {cargando ? (
          <p className="text-center text-black dark:text-white">Cargando datos...</p>
        ) : datos.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            ❌ No se encontraron registros para esta búsqueda.
          </p>
        ) : (
          <ul className="space-y-6 pl-6 text-left text-black dark:text-white max-h-96 overflow-y-auto pr-2 custom-scroll">
            {datos.map((item, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div
                  className="border-l-4 pl-4"
                  style={{ borderColor: index === 0 ? "red" : "blue" }}
                >
                  <div className="font-semibold">
                    {index === 0 ? "Dependencia de Inicio:" : "Derivado a:"}
                  </div>
                  <div>
                    {index === 0
                      ? item.co_dep_emi_ref || "MESA DE PARTES"
                      : item.ti_emi_des || "CIUDADANO"}
                  </div>

                  <div className="text-sm font-normal">
                    Responsable:{" "}
                    {index === 0 ? item.co_emp_emi : item.co_emp_des}
                  </div>

                  <div className="text-sm font-normal">
                    Fecha de Solicitud: {formatearFechaHora(item.fecha)}
                  </div>

                  <div className="text-sm font-normal">
                    Estado: {item.estado_doc || "Sin estado"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
