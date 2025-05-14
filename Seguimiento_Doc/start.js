const { exec } = require("child_process");

console.log("🚀 Iniciando en modo producción...\n");

const backend = exec("npm --prefix server run start --port=8080");

backend.stdout.on("data", (data) => {
  const str = data.toString();
  if (str.includes("Servidor corriendo")) {
    console.log("🚀 Backend disponible en http://localhost:8080 (Puerto para la API)");
  }
});

backend.stderr.on("data", (data) => {
  console.error("❌ Error en el backend:", data.toString());
});

const frontend = exec("cd client && npm run serve:prod");

frontend.stdout.on("data", (data) => {
  console.log("Frontend (serve):", data.toString());
});

frontend.stderr.on("data", (data) => {
  console.error("❌ Error en el frontend (serve):", data.toString());
});


