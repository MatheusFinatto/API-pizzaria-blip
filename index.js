const express = require("express")
const app = express();

const db = []

app.use(express.json())

app.get("/api/pizzas", (req,res) => {
    res.send(db)
})

app.post("/api/pizzas", (req,res) =>{
    const dados = {
        nome: req.body.nome,
        valor: req.body.valor
    }
    db.push(dados)
    res.status(201).send(dados)
})

app.get("/api/pizzas/:id", (req,res) =>{
    let id =  req.params.id - 1
    res.status(200).send(db[id])
})

app.put("/api/pizzas/:id", (req,res) =>{
    let id =  req.params.id - 1
    const dados = {
        nome: req.body.nome,
        valor: req.body.valor
    }
    db[id] = dados
    res.status(200).send(db[id])
})

app.delete("/api/pizzas/:id", (req,res) =>{
    let id =  req.params.id - 1
    db.splice(id,1)
    res.status(200).send("A pizza foi deletada com sucesso")
})


app.listen(process.env.PORT  || 3000)