const customAxios = require("../config/customAxios")
const { changePizza } = require("../database/db")
const db = require("../database/db")

module.exports = app => {

    app.get("/", (req, res) => {
        res.send("Para acessar a API de pizzas, use /api/pizzas/. Para acessar a API de CEP, use /api/cep/:cep. Para mais informações, acesse /instrucoes")
    })

    app.get("/api/pizzas", async (req, res) => {
        let pizzas = await db.getPizzas();
        res.json(pizzas);
    });

    app.get("/api/pizzas/:id", async (req, res) => {
        let id =  req.params.id - 1
        let pizzas = await db.getPizzaById(id);
        res.json(pizzas);
    });

    app.post("/api/pizzas", async (req, res) => {
        let pizza = req.body;
        await db.addPizza(pizza);
        let pizzas = await db.getPizzas();
        res.status(200).send(pizzas)
    })

    app.put("/api/pizzas/:id", async (req, res) => {
        let id =  req.params.id - 1
        await db.changePizza(req.body, id)
        let pizzas = await db.getPizzas();
        res.status(200).send(pizzas)
    })

    app.delete("/api/pizzas/:id", async (req,res) =>{
        let id =  req.params.id - 1
        await db.deletePizza(id)
        let pizzas = await db.getPizzas();
        res.status(201).send(pizzas)
    })

    app.get("/api/cep/:cep", (req, res) => {
        let cep = req.params;
        getAddress(cep.cep)
            .then((value) => {
                let resposta = filtro(value)
                res.send(resposta);
            })
            .catch((err) => console.log("Erro" + err));
    });
}