const { exec } = require("child_process");

console.log("🚀 Iniciando en modo desarrollo...\n");

const concurrently = exec(
  'npx concurrently --raw "npm --prefix client run dev" "npm --prefix server run dev"'
);

concurrently.stdout.on("data", (data) => {
  const str = data.toString();

  if (str.includes("localhost:5173") && !str.includes("use --host to expose")) {
    console.log("🌐 Frontend disponible en http://localhost:5173");
  }
  if (str.includes("Servidor corriendo")) {
    console.log("🚀 Backend disponible en http://localhost:3001");
  }
});

concurrently.stderr.on("data", (data) => {
  console.error(data.toString());
});


/*
const { exec } = require("child_process");

console.log("⏳ Compilando frontend...");
exec("npm --prefix client run build", (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Error al compilar el frontend:", stderr);
    process.exit(1);
  }

  console.log("✅ Frontend compilado.\n");

  const backend = exec("npm --prefix server run start");

  backend.stdout.on("data", (data) => {
    console.log(data.toString());
    if (data.toString().includes("Servidor corriendo")) {
      console.log("🚀 Backend disponible en http://localhost:3001");
    }
  });

  backend.stderr.on("data", (data) => {
    console.error(data.toString());
  });
});
*/