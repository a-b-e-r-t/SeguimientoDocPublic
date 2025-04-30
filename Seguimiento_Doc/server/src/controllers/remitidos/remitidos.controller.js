import { obtenerResumenPorExpediente } from '../../services/remitidos.services.js';

export async function getResumenPorExpediente(req, res) {
  const { expediente } = req.params;

  if (!expediente) {
    return res.status(400).json({ error: 'Falta el parámetro "expediente"' });
  }

  try {
    const resumen = await obtenerResumenPorExpediente(expediente);
    res.status(200).json(resumen);
  } catch (err) {
    console.error('Error al obtener resumen:', err);
    res.status(500).json({ error: 'Error al obtener resumen de remitos' });
  }
}
