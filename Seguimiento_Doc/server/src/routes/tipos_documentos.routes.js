import express from "express";
import { listarTiposDocumento } from "../controllers/tipos_docs/tipos_docmuentos.controller.js";

const router = express.Router();

router.get("/tipos-doc", listarTiposDocumento);

export default router;
