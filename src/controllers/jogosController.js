import * as jogosModel from "../models/jogosModel.js";
import { textoValido } from "../utils/validacoes.js";


export function listar(req, res, next) {
    jogosModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    jogosModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Jogo não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { titulo, ano_lancamento, estudio_id } = req.body ?? {};
    if (!textoValido(titulo, 150) || !ano_lancamento || !estudio_id) {
        return res.status(400).json({ erro: "Informe título (até 150 caracteres), ano de lancamento e id do estúdio" });
    }
    const dados = { titulo: titulo.trim(), ano_lancamento: ano_lancamento, estudio_id: estudio_id };

    jogosModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Jogo cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { titulo, ano_lancamento, estudio_id } = req.body ?? {};
    if (!textoValido(titulo, 100) || !ano_lancamento || !estudio_id) {
        return res.status(400).json({ erro: "Informe título (até 150 caracteres), ano de lancamento e id do estúdio" });
    }
    const dados = { titulo: titulo.trim(), ano_lancamento: ano_lancamento, estudio_id: estudio_id };

    // Consulta didática para confirmar que o registro existe antes de editar.
    jogosModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Jogo não encontrado" });
        }
        jogosModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Jogo atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    jogosModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Jogo não encontrado" });
        }
        return res.status(200).json({ mensagem: "Jogo excluído com sucesso" });
    });
}