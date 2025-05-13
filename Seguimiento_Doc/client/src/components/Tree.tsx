import { useEffect, useState } from "react";
import { fetchResumenPorExpediente } from "../../api/remitos";
import { fetchResumenSinExpediente } from "../../api/Seguimiento_SinExp";

interface TreeProps {
  expediente: string;
  dni: string;
  tipoDoc: string;
  numDoc: string;
}

interface DatoResumenExpediente {
  co_dep_emi_ref?: string;
  ti_emi_des?: string;
  co_emp_emi?: string;
  co_emp_des?: string;
  fecha?: string;
  estado_doc?: string;
  nu_expediente?: string;
}

interface DatoResumenSinExpediente {
  co_dep_emi_ref?: string;
  ti_emi_des?: string;
  co_emp_emi?: string;
  co_emp_des?: string;
  hora_recepcion?: string;
  estado_documento?: string;
  nu_expediente?: string;
}

export default function Tree({ expediente, dni, tipoDoc, numDoc }: TreeProps) {
  const [datosExpediente, setDatosExpediente] = useState<DatoResumenExpediente[]>([]);
  const [datosSinExpediente, setDatosSinExpediente] = useState<DatoResumenSinExpediente[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      setCargando(true);
      setError(null);

      try {
        if (expediente) {
          const response = await fetchResumenPorExpediente(expediente);
          setDatosExpediente(response);
          setDatosSinExpediente([]);
        } else if (dni && tipoDoc && numDoc) {
          const response = await fetchResumenSinExpediente(dni, tipoDoc, numDoc);
          setDatosSinExpediente(response.listaDocumentos);
          setDatosExpediente([]);
        } else {
          setDatosExpediente([]);
          setDatosSinExpediente([]);
          setError('Por favor, proporcione un expediente o los parámetros de DNI, tipo de documento y número de documento.');
        }
      } catch (error: any) {
        let errorMessage = 'Ocurrió un error al obtener los datos.';
        if (error.message.includes('Documento no encontrado') || error.message.includes('No se encontraron datos')) {
          errorMessage = 'Documento no encontrado.';
        } else if (error.message.includes('Parámetros inválidos')) {
          errorMessage = 'Los parámetros proporcionados son inválidos.';
        } else if (error.message.includes('Error interno del servidor')) {
          errorMessage = 'Error interno del servidor. Por favor, intenta de nuevo más tarde.';
        }
        setError(errorMessage);
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

  // Renderizado para búsqueda por expediente
  if (expediente) {
    return (
      <div className="w-full">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
          {cargando ? (
            <p className="text-center text-black dark:text-white">Cargando datos...</p>
          ) : error ? (
            <p className="text-center text-red-500 dark:text-red-400">❌ {error}</p>
          ) : datosExpediente.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">❌ No se encontraron registros para esta búsqueda por expediente.</p>
          ) : (
            <ul className="space-y-6 pl-6 text-left text-black dark:text-white max-h-96 overflow-y-auto pr-2 custom-scroll">
              {datosExpediente.map((item, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="border-l-4 pl-4" style={{ borderColor: index === 0 ? "red" : "blue" }}>
                    <div className="font-semibold">
                      {index === 0 ? "Dependencia de Inicio:" : "Derivado a:"}
                    </div>
                    <div>{index === 0 ? item.co_dep_emi_ref || "MESA DE PARTES" : item.ti_emi_des || "CIUDADANO"}</div>
                    <div className="text-sm font-normal">
                      Responsable: {item.co_emp_des || "Sin responsable"}
                    </div>
                    {item.nu_expediente && (
                      <div className="text-sm font-normal">
                        Número de Expediente: {item.nu_expediente}
                      </div>
                    )}
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

  // Renderizado para búsqueda por dni, tipoDoc, numDoc
  if (dni && tipoDoc && numDoc) {
    return (
      <div className="w-full">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
          {cargando ? (
            <p className="text-center text-black dark:text-white">Cargando datos...</p>
          ) : error ? (
            <p className="text-center text-red-500 dark:text-red-400">❌ {error}</p>
          ) : datosSinExpediente.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">❌ Documento no encontrado.</p>
          ) : (
            <ul className="space-y-6 pl-6 text-left text-black dark:text-white max-h-96 overflow-y-auto pr-2 custom-scroll">
              {datosSinExpediente.map((item, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="border-l-4 pl-4" style={{ borderColor: index === 0 ? "red" : "blue" }}>
                    <div className="font-semibold">
                      {index === 0 ? "Dependencia de Inicio:" : "Derivado a:"}
                    </div>
                    <div>{index === 0 ? item.co_dep_emi_ref || "MESA DE PARTES" : item.ti_emi_des || "CIUDADANO"}</div>
                    <div className="text-sm font-normal">
                      Responsable: {item.co_emp_des || "Sin responsable"}
                    </div>
                    {item.nu_expediente && (
                      <div className="text-sm font-normal">
                        Número de Expediente: {item.nu_expediente}
                      </div>
                    )}
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

  // Caso por defecto
  return (
    <div className="w-full">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        {error ? (
          <p className="text-center text-red-500 dark:text-red-400">❌ {error}</p>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300">❌ Por favor, proporcione un expediente o los parámetros de búsqueda.</p>
        )}
      </div>
    </div>
  );
}