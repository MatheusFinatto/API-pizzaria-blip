const express = require("express")
const app = express();

const db = []

app.use(express.json())

app.get("/", (req,res) => {
    res.send(db)
})

app.post("/", (req,res) =>{
    const dados = {
        nome: req.body.nome,
        valor: req.body.valor
    }
    db.push(dados)
    res.status(201).send(dados)
})

app.get("/:id", (req,res) =>{
    let id =  req.params.id - 1
    res.status(200).send(db[id])
})

app.put("/:id", (req,res) =>{
    let id =  req.params.id - 1
    const dados = {
        nome: req.body.nome,
        valor: req.body.valor
    }
    db[id] = dados
    res.status(200).send(db[id])
})

app.delete("/:id", (req,res) =>{
    let id =  req.params.id - 1
    db.splice(id,1)
    res.status(200).send("Objeto deletado com sucesso")
})


app.listen(3000)