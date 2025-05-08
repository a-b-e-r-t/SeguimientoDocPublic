import express from "express";
import { listarSeguimiento } from "../controllers/seguimiento_NumDoc/seguimiento_numDoc.controller.js";

const router = express.Router();

router.get("/seguimiento/:numeroDocumento/:usuario/:tipoDocumento", listarSeguimiento);

export default router;
