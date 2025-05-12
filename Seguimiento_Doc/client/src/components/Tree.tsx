import { useEffect, useState } from "react";
import { fetchResumenPorExpediente } from "../../api/remitos";
import { fetchResumenSinExpediente } from "../../api/Seguimiento_SinExp";

interface TreeProps {
  expediente: string;
  dni: string;
  tipoDoc: string;
  numDoc: string;
}

// Interfaz para datos devueltos por fetchResumenPorExpediente (búsqueda por expediente)
interface DatoResumenExpediente {
  co_dep_emi_ref?: string;
  ti_emi_des?: string;
  co_emp_emi?: string;
  co_emp_des?: string;
  fecha?: string;
  estado_doc?: string;
}

// Interfaz para datos devueltos por fetchResumenSinExpediente (búsqueda por dni, tipoDoc, numDoc)
interface DatoResumenSinExpediente {
  co_dep_emi_ref?: string;
  ti_emi_des?: string;
  co_emp_emi?: string;
  co_emp_des?: string;
  hora_recepcion?: string;
  estado_documento?: string;
}

export default function Tree({ expediente, dni, tipoDoc, numDoc }: TreeProps) {
  const [datosExpediente, setDatosExpediente] = useState<DatoResumenExpediente[]>([]);
  const [datosSinExpediente, setDatosSinExpediente] = useState<DatoResumenSinExpediente[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      setCargando(true);

      try {
        if (expediente) {
          const response = await fetchResumenPorExpediente(expediente);
          setDatosExpediente(response);
          setDatosSinExpediente([]); 
        } else if (dni && tipoDoc && numDoc) {
          const response = await fetchResumenSinExpediente(dni, tipoDoc, numDoc);
          setDatosSinExpediente(response);
          setDatosExpediente([]);
        } else {
          setDatosExpediente([]);
          setDatosSinExpediente([]);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setDatosExpediente([]);
        setDatosSinExpediente([]);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [expediente, dni, tipoDoc, numDoc]); 

  const formatearFechaHora = (fechaISO?: string) => {
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

  // Renderizado condicional para búsqueda por expediente
  if (expediente) {
    return (
      <div className="w-full">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
          {cargando ? (
            <p className="text-center text-black dark:text-white">Cargando datos...</p>
          ) : datosExpediente.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">
              ❌ No se encontraron registros para esta búsqueda por expediente.
            </p>
          ) : (
            <ul className="space-y-6 pl-6 text-left text-black dark:text-white max-h-96 overflow-y-auto pr-2 custom-scroll">
              {datosExpediente.map((item, index) => (
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

  // Renderizado condicional para búsqueda por dni, tipoDoc, numDoc
  if (dni && tipoDoc && numDoc) {
    return (
      <div className="w-full">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
          {cargando ? (
            <p className="text-center text-black dark:text-white">Cargando datos...</p>
          ) : datosSinExpediente.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">
              ❌ No se encontraron registros para esta búsqueda por DNI.
            </p>
          ) : (
            <ul className="space-y-6 pl-6 text-left text-black dark:text-white max-h-96 overflow-y-auto pr-2 custom-scroll">
              {datosSinExpediente.map((item, index) => (
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
                      Fecha de Solicitud: {formatearFechaHora(item.hora_recepcion)}
                    </div>

                    <div className="text-sm font-normal">
                      Estado: {item.estado_documento || "Sin estado"}
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

  // Caso por defecto (sin parámetros válidos)
  return (
    <div className="w-full">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-500 dark:text-gray-300">
          ❌ No se encontraron registros para esta búsqueda.
        </p>
      </div>
    </div>
  );
}