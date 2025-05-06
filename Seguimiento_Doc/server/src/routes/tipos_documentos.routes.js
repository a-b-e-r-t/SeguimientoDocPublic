import express from "express";
import { listarTiposDocumento } from "../controllers/remitidos/tipos_docmuentos.controller.js";

const router = express.Router();

router.get("/tipos-doc", listarTiposDocumento);

export default router;
