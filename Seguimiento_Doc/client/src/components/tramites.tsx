import { useState } from "react";
import Search from "./Search";
import Tree from "./Tree";
import BackCard from "./BackCard";  // Importar el componente BackCard

export default function SeguimientoContainer() {
  const [expediente, setExpediente] = useState("");
  const [esBackCard, setEsBackCard] = useState(false);
  const [dni, setDni] = useState<string>("");  // Estado para el DNI
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("");  // Estado para el código del tipo de documento
  const [numeroDocumento, setNumeroDocumento] = useState<string>("");  // Estado para el N° de Documento

  const handleSearch = (query: string) => {
    setExpediente(query);
    setEsBackCard(false);
  };

  const handleBackCardSearch = (dni: string, tipo: string, numero: string) => {
    setDni(dni);  // Guardar el DNI en el estado
    setTipoSeleccionado(tipo);  // Guardar el código del tipo de documento (cdoc_tipdoc)
    setNumeroDocumento(numero);  // Guardar el N° de documento en el estado
    setEsBackCard(true);  // Indicamos que la búsqueda proviene de BackCard
  };

  return (
    <div className="flex flex-col gap-8 px-4 pt-6 pb-12 max-w-6xl mx-auto">
      {!esBackCard ? (
        <Search onSearch={handleSearch} />
      ) : (
        <BackCard onSearch={handleBackCardSearch} />  // Aquí se pasa el onSearch con los tres parámetros
      )}

      {/* Ahora Tree recibe los tres parámetros */}
      <Tree expediente={expediente} esBackCard={esBackCard} dni={dni} tipoSeleccionado={tipoSeleccionado} numeroDocumento={numeroDocumento} />
    </div>
  );
}
