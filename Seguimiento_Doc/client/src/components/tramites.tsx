import { useState } from "react";
import Search from "./Search";
import Tree from "./Tree";

export default function SeguimientoContainer() {
  const [expediente, setExpediente] = useState("");

  const handleSearch = (query: string) => {
    setExpediente(query);
  };

  return (
    <div className="flex flex-col gap-8 px-4 pt-6 pb-12 max-w-6xl mx-auto">
      <Search onSearch={handleSearch} />
      <Tree expediente={expediente} />
    </div>
  );
}
