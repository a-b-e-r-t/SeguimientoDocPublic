import axios from "axios";
import BASE_URL from "./config";

export const fetchResumenSinExpediente = async (nuDocEmi, coUseCre, coTipDocAdm) => {
  try {
    const response = await axios.get(`${BASE_URL}/seguimiento/${coTipDocAdm}/${nuDocEmi}/${coUseCre}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el resumen:", error);
    throw error;
  }
};
