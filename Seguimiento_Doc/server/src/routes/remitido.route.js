import express from 'express';
import { getResumenPorExpediente } from '../controllers/remitidos/remitidos.controller.js';

const router = express.Router();

router.get('/remitos/resumen/:expediente', getResumenPorExpediente);

export default router;
