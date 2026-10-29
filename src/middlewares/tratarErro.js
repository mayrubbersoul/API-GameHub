export function tratarErro(erro, req, res, next) {
    if (res.headersSent) return next(erro);

    if (erro.type === "entity.parse.failed") {
        return res.status(400).json({ erro: "JSON inválido no corpo da requisição" });
    }

    if (erro.code === "ER_DUP_ENTRY" || erro.errno === 1062) {
        return res.status(409).json({ erro: "Este nickname já está em uso" });
    }

    if (erro.code === "ER_NO_REFERENCED_ROW_2" || erro.errno === 1452) {
        return res.status(400).json({ erro: "O estudio informado não existe" });
    }

    if (erro.code === "ER_ROW_IS_REFERENCED_2" || erro.errno === 1451) {
        return res.status(409).json({
            erro: "Este registro possui vínculos. Exclua primeiro os registros dependentes"
        });
    }

    if (Number.isInteger(erro.status) && erro.status >= 400 && erro.status < 500) {
        return res.status(erro.status).json({ erro: "Corpo da requisição inválido" });
    }

    console.error("Erro na API:", erro.code || erro.message);
    return res.status(500).json({ erro: "Não foi possível concluir a operação" });
}