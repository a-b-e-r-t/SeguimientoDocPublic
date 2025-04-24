export default function Tree() {
  return (
    <div className="w-full">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md">
        <ul className="space-y-6 pl-6 text-left text-black dark:text-white">
          <li className="flex items-start space-x-4">
            <div className="border-l-4 border-red-500 pl-4">
              <div className="font-semibold">Dependencia Inicio: </div>
              <div>MESA DE PARTES</div>
              <div className="text-sm font-normal">Responsable:  perico palotes </div>
              <div className="text-sm font-normal">Fecha de Solicitud: 00/00/2000 8:27 AM</div>
            </div>
          </li>

          <li className="flex items-start space-x-4">
            <div className="border-l-4 border-red-500 pl-4">
              <div className="font-semibold">Derivado de: </div>
              <div>MESA DE PARTES a ESCUELA PROFESIONAL DE INGENIERIA </div>
              <div className="text-sm font-normal">Responsable:  perico palotes </div>
              <div className="text-sm font-normal">Fecha: 00/00/2000 8:27 AM</div>
            </div>
          </li>

          <li className="flex items-start space-x-4">
            <div className="border-l-4 border-red-500 pl-4">
              <div className="font-semibold">Trámite Finalizado</div>
              <div className="text-sm font-normal">Fecha de Finalización: 0/00/2000 10:34 AM</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
