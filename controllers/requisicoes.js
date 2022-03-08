const { default: axios } = require('axios')
const axiosFunctions = require("../config/customAxios")
const dbConfigs = require('../config/customDatabase')


module.exports = app => {

    app.get("/", (req,res) =>{
        res.send("Para acessar a API de pizzas, use /api/pizzas/. Para acessar a API de CEP, use /api/cep/:cep.")
    })

    app.get("/api/pizzas", async (req, res) => {
        let result = await dbConfigs.getPizzas();
        res.json(result);
    });
    
    app.post("/api/pizzas", (req,res) =>{
        let pizza = req.body;
        dbConfigs.addPizza(pizza);
        res.end();
    })
    
    // app.get("/api/pizzas/:id", (req,res) =>{
    //     let id =  req.params.id - 1
    //     res.send(db[id])
    // })
    
    // app.put("/api/pizzas/:id", (req,res) =>{
    //     let id =  req.params.id - 1
    //     const dados = {
    //         id: req.body.id,
    //         nome: req.body.nome,
    //         valor: req.body.valor,
    //         img: req.body.img,
    //         slogan: req.body.slogan

    //     }
    //     db[id] = dados
    //     res.status(200).send(db[id])
    // })
    
    // app.delete("/api/pizzas/:id", (req,res) =>{
    //     let id =  req.params.id - 1
    //     db.splice(id,1)
    //     res.status(200).send("A pizza foi deletada com sucesso")
    // })

    app.get("/api/cep/:cep", (req, res) => {
        let cep = req.params;   
        axiosFunctions.getAddress(cep.cep)
        .then((value) => {
            let resposta = axiosFunctions.filtro(value)    
            res.send(resposta);
        })
        .catch((err) => console.log("Erro" + err));
    });

}