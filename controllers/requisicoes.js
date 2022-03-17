const customAxios = require("../config/customAxios")
const db = require("../database/db")
const pedidosDb = require("../database/pedidosDb")

module.exports = app => {

    //requisições de pizza

    app.get("/", (req, res) => {
        res.status(200).send("Para acessar a API de pizzas, use /api/pizzas/. Para acessar a API de CEP, use /api/cep/:cep. Para mais informações, acesse /instrucoes")
    })

    app.get("/api/pizzas", async (req, res) => {
        let pizzas = await db.getPizzas();
        res.status(200).json(pizzas);
    });

    app.get("/api/pizzas/:id", async (req, res) => {
        let id = req.params.id - 1
        let pizzas = await db.getPizzaById(id);
        res.status(200).json(pizzas);
    });

    app.post("/api/pizzas", async (req, res) => {
        let pizza = req.body;
        await db.addPizza(pizza);
        let pizzas = await db.getPizzas();
        res.status(201).send(pizzas)
    })

    app.put("/api/pizzas/:id", async (req, res) => {
        let id = req.params.id - 1
        await db.changePizza(req.body, id)
        let pizzas = await db.getPizzas();
        res.status(200).send(pizzas)
    })

    app.delete("/api/pizzas/:id", async (req, res) => {
        let id = req.params.id - 1
        await db.deletePizza(id)
        let pizzas = await db.getPizzas();
        res.status(200).send(pizzas)
    })

    //requisição de cep

    app.get("/api/cep/:cep", (req, res) => {
        let cep = req.params.cep;
        customAxios.getAddress(cep)
            .then((value) => {
                let resposta = customAxios.filtro(value)
                res.send(resposta);
            })
            .catch((err) => res.send(err.message));
    });

    //requisição de historico

    app.get("/api/pedidos", async (req, res) => {
        let pedidos = await pedidosDb.getPedidos();
        res.status(200).json(pedidos);
    })

    app.get("/api/pedidos/:cpf", async (req, res) => {
        let cpf = req.params.cpf;
        let pedidos = await pedidosDb.getPedidosCliente(cpf)
        res.status(200).json(pedidos);        
    })

    app.get("/api/pedidos/ultimo/:cpf", async (req, res) => {
        let cpf = req.params.cpf;
        let pedido = await pedidosDb.getUltimoPedidoDoCliente(cpf);
        res.status(200).json(pedido);
    })

    app.post("/api/pedidos/:cpf", async (req, res) => {
        let cpf = req.params.cpf;
        let pedido = req.body;
        let pedidos = await pedidosDb.addPedido(pedido,cpf);
        // let AllPedidos = await pedidosDb.getPedidos();
        // res.status(201).send(AllPedidos)
        res.send(pedidos)

    })
}