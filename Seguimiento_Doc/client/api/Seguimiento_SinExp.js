import axios from 'axios';

export const fetchResumenSinExpediente = async (dni, tipoDoc, numDoc) => {
  try {
    // Validar parámetros
    if (!dni || !tipoDoc || !numDoc) {
      throw new Error('Faltan parámetros requeridos: DNI, tipo de documento o número de documento.');
    }

    const response = await axios.get(`http://localhost:3001/api/seguimiento/${numDoc}/${dni}/${tipoDoc}`);
    const data = response.data;

    // Si no hay documentos, lanzar error
    if (!data.documentos || data.documentos.length === 0) {
      throw new Error('Documento no encontrado.');
    }

    return {
      numeroExpediente: data.expediente,
      listaDocumentos: data.documentos
    };
  } catch (error) {
    let errorMessage = 'Error al obtener el resumen';
    if (error.response?.status === 400) {
      errorMessage = error.response.data.error || 'Parámetros inválidos proporcionados.';
    } else if (error.response?.status === 404) {
      errorMessage = error.response.data.error || 'No se encontraron datos para los parámetros proporcionados.';
    } else if (error.response?.status === 500) {
      errorMessage = error.response.data.error || 'Error interno del servidor.';
    } else {
      errorMessage = error.message || 'Error desconocido';
    }
    throw new Error(errorMessage);
  }
};