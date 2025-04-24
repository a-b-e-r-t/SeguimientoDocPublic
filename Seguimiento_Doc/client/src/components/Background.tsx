const shapes = [
  {
    className: "w-96 h-96 bg-red-400/30 dark:bg-red-600/30 rounded-full top-10 left-10 rotate-6",
    type: "circle",
  },
  {
    className: "w-80 h-80 bg-red-300/30 dark:bg-red-700/30 top-1/4 left-1/3 rotate-12",
    type: "square",
  },
  
  {
    className: "w-80 h-80 bg-red-200/30 dark:bg-red-600/30 rounded-full top-1/3 left-2/3 -rotate-12",
    type: "circle",
  },
  {
    className: "w-96 h-96 bg-red-500/30 dark:bg-red-800/30 top-[75%] left-1/4 rotate-3",
    type: "square",
  },
  {
    className:
      "w-0 h-0 border-l-[90px] border-r-[90px] border-b-[180px] border-l-transparent border-r-transparent border-b-red-400/30 dark:border-b-red-600/30 top-1/5 left-[80%] rotate-[25deg]",
    type: "triangle",
  },
];

export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {shapes.map((shape, index) => {
        const baseClasses = `absolute ${shape.className}`;
        const fullClassName =
          shape.type === "square"
            ? baseClasses
            : `${baseClasses} ${shape.type === "circle" ? "rounded-full" : ""}`;
        return <div key={index} className={fullClassName} />;
      })}
    </div>
  );
}
