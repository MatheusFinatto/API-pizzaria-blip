const path = require("path");
const dbFile = (path.join(__dirname, "pedidosDb.json"))
const {read, write} = require("../helpers/file")

module.exports = {

    async getPedidos() {
        let pedido = await read(dbFile);
        return JSON.parse(pedido);
    },

    async getPedidosCliente(cpf) {
        const pedidos = await this.getPedidos();
        for(let i = 0; i < pedidos.length; i++){
            if(cpf == pedidos[i]){
                let pedidosDoCliente = pedidos[i];
                return pedidosDoCliente;
            }
            else{
                return "CPF não encontrado"
            }
        }
    }

    // async getUltimoPedidoDoCliente(cpf) {
    //     const pedidosDoCliente = await this.getPedidosDoCliente(cpf)
    //     let ultimoPedido = pedidosDoCliente[pedidosDoCliente.length]
    //     return ultimoPedido;
    // },

    // async addPedido(pedido) {
    //     let pedidos = await this.getPedidos();
    //     pedidos.id = pedidos.length + 1
    //     pedidos.push(pedido);
    //     await write(dbFile, JSON.stringify(pedidos));
    // }
};