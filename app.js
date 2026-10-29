require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conexao = require("./db.js");

const app = express();
const PORTA = Number(process.env.PORTA || 3000);

app.use(cors());
app.use(express.json());

app.use((req,res, next) =>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/",(req, res) =>{
    res.status(200).json({msg: "API GameHub funcionando"});
});

app.get("/estudios", (req, res, next) =>{
    conexao.query("SELECT * FROM estudios ORDER BY id",(erro, resultado)=>{
        if(erro) next(erro);
       return res.status(200).json(resultado);
    })
});

app.get("/estudios/:id", (req, res, next) =>{});

function textoValido(valor, limite){
    return typeof valor === "string"
     && valor.trim().length > 0 
     && valor.trim().length < limite;
}

app.post("/estudios", (req, res, next) =>{
    const {nome, pais} = req.body ?? {};

    if(!textoValido(nome, 100) || !textoValido(pais, 60)){
        return res.status(400).json({
            erro : "Informe nome (ate 100 caracteres) e pais (ate 60 caracteres)"
        })
    }

    const dados = {nome: nome.trim(), pais: pais.trim()};
    const sql = "INSERT INTO estudios (nome, pais) VALUES (?, ?)";
    conexao.query(sql, [dados.nome, dados.pais], (erro, resultado) =>{
        if(erro) return next(erro);
        return res.status(201).json({
            mensagem: "Estúdio cadastrado com sucesso",
            id: resultado.insertId
        });
    });
   
});



app.put("/estudios/:id", (req, res, next) =>{
    const {nome, pais} = req.body ?? {};

    if(!textoValido(nome, 100) || !textoValido(pais, 60)){
        return res.status(400).json({
            erro : "Informe nome (ate 100 caracteres) e pais (ate 60 caracteres)"
        })
    }

    conexao.query("SELECT * FROM estudios WHERE id = ?",[req.id], (erro, resultado)=>{
        if(erro) return next(erro);
        if(resultado.length === 0){
            return res.status(400).json({mensagem : "Estudio não encontrado"});
        }
        
    })
});

app.delete("/estudios/:id", (req, res, next) =>{});

app.use((req,res) =>{
    res.status(404).json({erro: "Rota não encontrada"});
});



conexao.connect((erro) =>{
    if(erro){
        console.error("Erro ao conectar ao banco:", erro.code || erro.message);
        process.exit(1);
    }
    console.log("Conectado ao banco gamehub_db");

    const servidor = app.listen(PORTA, ()=>{
        console.log(`Servidor funcionando em http://localhost:${PORTA}`);
    });
    servidor.on("error", (erro) =>{
        console.error("Erro ao iniciar servidor:", erro.code || erro.message);
        conexao.end(() => process.exit(1));
    })

});