import { Router } from "express";
import * as jogadoresModel from "../controllers/jogadoresModel.js";
import { validarId } from "../middlewares/validarId.js";


const router = Router();

router.get("/", jogadoresModel.listar);
router.get("/:id", validarId, jogadoresModel.buscarPorId);
router.post("/", jogadoresModel.criar);
router.put("/:id", validarId, jogadoresModel.atualizar);
router.delete("/:id", validarId, jogadoresModel.excluir);

export default router;
export function textoValido(valor, limite) {
    return typeof valor === "string"
        && valor.trim().length > 0
        && valor.trim().length <= limite;
}

export function inteiroPositivo(valor) {
    return typeof valor === "number"
        && Number.isSafeInteger(valor)
        && valor > 0;
}