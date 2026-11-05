import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM jogadores ORDER BY id";
    conexao.query(sql, callback);
}

export function buscarPorId(id, callback) {
    const sql = "SELECT * FROM jogadores WHERE id = ?";
    conexao.query(sql, [id], callback);
}

export function criar(dados, callback) {
    const sql = "INSERT INTO jogadores (nome, email, nickname) VALUES (?, ?, ?)";
    conexao.query(sql, [dados.nome, dados.email, dados.nickname], callback);
}

export function atualizar(id, dados, callback) {
    const sql = "UPDATE jogadores SET nome = ?, email = ?, nickname = ? WHERE id = ?";
    conexao.query(sql, [dados.nome, dados.email, dados.nickname, id], callback)
}

export function deletar(id, callback) {
    const sql = "DELETE FROM jogadores WHERE id = ?";
    conexao.query(sql, [id], callback);
}