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
    <div className="relative w-full flex justify-center items-start z-10 py-40 sm:py-52 md:py-64 perspective-[1200px]">
      <div className="relative w-full max-w-4xl max-h-[80vh]">
        {/* Flechas */}
        <button
          onClick={handleRotateLeft}
          className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-20"
        >
          <ChevronLeftIcon className="h-8 w-8 text-sky-500 hover:text-sky-700 transition" />
        </button>
        <button
          onClick={handleRotateRight}
          className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-20"
        >
          <ChevronRightIcon className="h-8 w-8 text-sky-500 hover:text-sky-700 transition" />
        </button>

        {/* 3D container */}
        <div
          className={`w-full relative transition-transform duration-700`}
          style={{
            transformStyle: "preserve-3d",
            transform: rotated ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front face */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
            className={`absolute w-full top-0 left-0 flex flex-col items-center justify-center p-6 rounded-2xl ${
              rotated ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
            } transition-opacity duration-500`}
          >
            <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-6">
              Seguimiento de trámites
            </h1>

            <div className="w-full flex items-center space-x-4">
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
          </div>

          {/* Back face */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className={`absolute w-full top-0 left-0 p-6 rounded-2xl overflow-y-auto max-h-[80vh] ${
              rotated ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            } transition-opacity duration-500`}
          >
            <BackCard />
          </div>
        </div>
      </div>
    </div>

  );
}
