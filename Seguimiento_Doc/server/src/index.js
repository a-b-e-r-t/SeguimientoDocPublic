import 'dotenv/config';
import express from "express";
import cors from "cors";
import remitoRoutes from "./routes/remitido.route.js";
import tiposDocumentosRoutes from "./routes/tipos_documentos.routes.js";
import seguimientoRoutes from "./routes/seguimiento_numDoc.routes.js";
import { query } from "./db/db.js";
import { ddosProtection } from "./middleware/SecuriyDDoS.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(ddosProtection);

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.json({ success: true, time: result[0].now });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).json({ success: false, error: "Error conectando a la base de datos" });
  }
});

app.use("/api", remitoRoutes);  
app.use("/api", tiposDocumentosRoutes);  
app.use("/api", seguimientoRoutes);  

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
