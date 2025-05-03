// src/components/SeguimientoContainer.tsx
import { useState } from "react";
import Search from "./Search";
import Tree from "./Tree";

export default function SeguimientoContainer() {
  const [expediente, setExpediente] = useState("");

  const handleSearch = (query: string) => {
    setExpediente(query);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <Tree expediente={expediente} />
    </div>
  );
}
