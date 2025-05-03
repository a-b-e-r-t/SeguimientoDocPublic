// src/components/Search.tsx
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchProps {
  onSearch: (query: string) => void; 
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value); 
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);;
    } else {
      console.error("onSearch no está definida.");
    }
  };

  return (
    <div className="relative w-full flex justify-center items-center z-10 mt-4">
      <div className="flex flex-col justify-center items-center w-full px-4 bg-transparent">
        <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-4">
          Seguimiento de trámites
        </h1>

        <div className="w-full max-w-4xl flex items-center space-x-4">
          <div className="flex items-center w-full bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-600">
            <div className="px-4 py-2">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-white" />
            </div>

            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="N° expediente Ejm ()"
              className="w-full py-4 px-6 text-lg sm:text-xl bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-red-500 dark:bg-red-600 text-white py-4 px-6 rounded-xl hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            Buscar
          </button>
        </div>

        <div className="mt-8 w-full max-w-4xl"></div>
      </div>
    </div>
  );
}
