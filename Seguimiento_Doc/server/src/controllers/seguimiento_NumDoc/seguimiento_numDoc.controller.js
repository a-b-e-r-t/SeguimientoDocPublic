import { obtenerResumenPorExpediente } from "../../services/seguimiento_NumDoc.services.js";

export const listarSeguimiento = async (req, res) => {
  const { numeroDocumento, usuario, tipoDocumento } = req.params;  

  try {
    const seguimiento = await obtenerResumenPorExpediente(numeroDocumento, usuario, tipoDocumento);
    res.json(seguimiento);  
  } catch (error) {
    console.error("Error al obtener el seguimiento:", error);
    res.status(500).json({ error: "Error al obtener el seguimiento" });
  }
};
