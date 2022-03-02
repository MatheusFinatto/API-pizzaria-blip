const express = require("express")
const app = express();

const db = [
    {
     "nome": "Quatro queijos",
     "valor": 50,
     "img": "https://www.comidaereceitas.com.br/img/sizeswp/1200x675/2007/12/Pizza_quatro_queijossss.jpg",
     "slogan":"A mais vendida!"
    },

    {
     "nome":"Margherita",
     "valor": 40,
     "img":"https://i0.wp.com/descobrindoasicilia.com/wp-content/uploads/2020/11/amirali-mirhashemian-zTxiTnTag78-unsplash.jpg?ssl=1",
     "slogan":"Um clássico atemporal!"
    },

    {
     "nome":"Lombo com abacaxi",
     "valor": 35,
     "img":"https://receitinhas.s3-sa-east-1.amazonaws.com/wp-content/uploads/2017/06/iStock-504427632-848x477.jpeg",
     "slogan":"Uma blasfêmia, mas há quem goste."      
    }
]

app.use(express.json())

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