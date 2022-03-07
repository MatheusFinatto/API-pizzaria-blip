const fs = require("fs");
const database = require("./db.json")

module.exports = {
    getPizzas() {
        let result = fs.readFileSync("./db.json", { encoding: "utf-8" });
        return JSON.parse(result);
    },
    async addPizza(pizza) {
        let result = await this.getPizzas();
        result.push(pizza);
        fs.writeFileSync("./db.json", JSON.stringify(result));
    },
};