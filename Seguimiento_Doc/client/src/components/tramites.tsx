import { useState } from "react";
import Search from "./Search";
import Tree from "./Tree";

export default function SeguimientoContainer() {
  const [expediente, setExpediente] = useState(""); // Estado para el número de expediente (cara frontal)
  const [dni, setDni] = useState(""); // Estado para el DNI (cara trasera)
  const [tipoDoc, setTipoDoc] = useState(""); // Estado para tipo de documento
  const [numDoc, setNumDoc] = useState(""); // Estado para número de documento

  // Manejar búsqueda desde la cara frontal (solo expediente)
  const handleSearchFromFront = (query: string) => {
    setExpediente(query); // Actualizamos solo el expediente
    setDni(""); // Limpiamos DNI para que no se mezcle
    setTipoDoc(""); // Limpiamos tipoDoc
    setNumDoc(""); // Limpiamos numDoc
  };

  // Manejar búsqueda desde la cara trasera (tres parámetros)
  const handleSearchFromBack = (dni: string, tipoDoc: string, numDoc: string) => {
    setDni(dni); // Actualizamos DNI
    setTipoDoc(tipoDoc); // Actualizamos tipo de documento
    setNumDoc(numDoc); // Actualizamos número de documento
    setExpediente(""); // Limpiamos expediente para que no se mezcle
  };

  // Manejar cambio en el input de la cara frontal (expediente)
  const handleFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpediente(e.target.value);
  };

  // Manejar cambio en el input de la cara trasera (DNI)
  const handleBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDni(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8 px-4 pt-6 pb-12 max-w-6xl mx-auto">
      <Search
        onSearch={handleSearchFromFront} // Búsqueda por expediente
        onBackSearch={handleSearchFromBack} // Búsqueda por los tres parámetros
        frontQuery={expediente} // Valor del expediente (cara frontal)
        backQuery={dni} // Valor del DNI (cara trasera)
        onFrontChange={handleFrontChange} // Cambio en la cara frontal
        onBackChange={handleBackChange} // Cambio en la cara trasera
      />
      <Tree
        dni={dni}
        tipoDoc={tipoDoc}
        numDoc={numDoc}
        expediente={expediente}
      />
    </div>
  );
}