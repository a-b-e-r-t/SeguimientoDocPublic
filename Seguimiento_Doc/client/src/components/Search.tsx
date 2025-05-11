import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import BackCard from "../../src/components/BackCard";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");
  const [rotated, setRotated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleRotateRight = () => setRotated(true);
  const handleRotateLeft = () => setRotated(false);

  return (
    <div className="w-full flex flex-col items-center justify-start gap-8 px-4 sm:px-6 md:px-8 pt-10 sm:pt-12 md:pt-16">
      <div className="relative w-full max-w-4xl min-h-[400px] perspective-[1200px]">
        {/* Flechas */}
        <button
          onClick={handleRotateLeft}
          className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-20"
        >
          <ChevronLeftIcon className="h-8 w-8 text-sky-500 hover:text-sky-700 transition" />
        </button>
        <button
          onClick={handleRotateRight}
          className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-20"
        >
          <ChevronRightIcon className="h-8 w-8 text-sky-500 hover:text-sky-700 transition" />
        </button>

        <div
          className="relative w-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: rotated ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >

          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
            className={`absolute w-full top-0 left-0 p-6 rounded-2xl transition-opacity duration-500 ${rotated ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"} bg-white dark:bg-neutral-800 shadow-md`}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-black dark:text-white mb-4">
              Seguimiento de trámites
            </h1>

            <div className="w-full flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center w-full bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-gray-300 dark:border-gray-600">
                <div className="px-4 py-2">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-white" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="N° expediente Ejm (2025001234)"
                  className="w-full py-3 px-4 text-base sm:text-lg bg-white dark:bg-neutral-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                onClick={handleSearch}
                className="bg-red-500 dark:bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              >
                Buscar
              </button>
            </div>
          </div>

          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className={`absolute w-full top-0 left-0 p-6 rounded-2xl transition-opacity duration-500 ${rotated ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} bg-white dark:bg-neutral-800 shadow-md`}
          >
            {/* En BackCard no pasamos `query`, solo las funciones */}
            <BackCard onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}
