import { Router } from "express";
import * as estudioController from "../controllers/estudioController.js";
import { validarId } from "../middlewares/validarId.js";


const router = Router();

router.get("/", estudioController.listar);
router.get("/:id", validarId, estudioController.buscarPorId);
router.post("/", estudioController.criar);
router.put("/:id", validarId, estudioController.atualizar);
router.delete("/:id", validarId, estudioController.excluir);

export default router;import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM estudios ORDER BY id";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM estudios WHERE id = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO estudios (nome, pais) VALUES (?, ?)";
    conexao.query(sql, [dados.nome, dados.pais], callback)
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE estudios SET nome = ?, pais = ? WHERE id = ?";
    conexao.query(sql, [dados.nome, dados.pais, id], callback)
}

export function deletar(id, callback) {
    const sql = "DELETE FROM estudios WHERE id = ?";
    conexao.query(sql, [id], callback);
}