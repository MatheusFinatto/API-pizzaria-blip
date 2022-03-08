const fs = require("fs");


module.exports = {
    getPizzas() {
        let result = fs.readFileSync("../database/db.json", { encoding: "utf-8" });
        return JSON.parse(result);
    },
    async addPizza(pizza) {
        let result = await this.getPizzas();
        result.push(pizza);
        fs.writeFileSync("../database/db.json", JSON.stringify(result));
    },
};