import * as jogadoresModel from "../models/jogadoresModel.js";
import { textoValido } from "../utils/validacoes.js";


export function listar(req, res, next) {
    jogadoresModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
}

export function buscarPorId(req, res, next) {
    jogadoresModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
}

export function criar(req, res, next) {
    const { nome, email, nickname } = req.body ?? {};
    if (!textoValido(nome, 100) || !textoValido(email, 100) || !textoValido(nickname, 50)) {
        return res.status(400).json({ erro: "Informe nome (até 100 caracteres), email (até 100 caracteres) e nickname (até 50 caracteres)" });
    }
    const dados = { nome: nome.trim(), email: email.trim(), nickname: nickname.trim() };

    jogadoresModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Jogador cadastrado com sucesso",
            id: resultado.insertId
        });
    });
}

export function atualizar(req, res, next) {
    const { nome, email, nickname } = req.body ?? {};
    if (!textoValido(nome, 100) || !textoValido(email, 100) || !textoValido(nickname, 50)) {
        return res.status(400).json({ erro: "Informe nome (até 100 caracteres), email (até 100 caracteres) e nickname (até 50 caracteres)" });
    }
    const dados = { nome: nome.trim(), email: email.trim(), nickname: nickname.trim() };

    // Consulta didática para confirmar que o registro existe antes de editar.
    jogadoresModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }
        jogadoresModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Jogador atualizado com sucesso" });
        });
    });
}

export function excluir(req, res, next) {
    jogadoresModel.deletar(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }
        return res.status(200).json({ mensagem: "Jogador excluído com sucesso" });
    });
}