const path = require("path");
const dbFile = (path.join(__dirname, "db.json"))
const { read, write } = require("../helpers/file")

module.exports = {
    async getPizzas() {
        let pizzas = await read(dbFile);
        return JSON.parse(pizzas);
    },

    async getPizzaById(i) {
        const pizzas = await this.getPizzas();
        let pizza = pizzas[i];
        return pizza;
    },

    async addPizza(pizza) {
        let pizzas = await this.getPizzas();
        pizza.id = pizzas.length + 1
        pizzas.push(pizza);
        await write(dbFile, JSON.stringify(pizzas));
    },

    async changePizza(pizza, id) {
        const pizzas = await this.getPizzas();
        pizzas.splice(id, 1, pizza);
        await write(dbFile, JSON.stringify(pizzas));
    },

    async deletePizza(id) {
        const pizzas = await this.getPizzas();
        pizzas.splice(id, 1);
        await write(dbFile, JSON.stringify(pizzas));
    }
};