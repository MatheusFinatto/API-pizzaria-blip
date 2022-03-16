const path = require("path");
const dbFile = (path.join(__dirname, "pedidosDb.json"))
const { read, write } = require("../helpers/file")

async function getPedidos() {
    let pedido = await read(dbFile);
    return JSON.parse(pedido);
}

async function getPedidosCliente(cpf) {
    const pedidos = await getPedidos();
    for (let i = 0; i < pedidos.length; i++) {
        if (cpf.cpf == pedidos[i].cpf) {
            let pedidosDoCliente = pedidos[i];
            return pedidosDoCliente;
        }
    }
    return "CPF não encontrado";
}

async function getUltimoPedidoDoCliente(cpf) {
    const pedidosDoCliente = await getPedidosCliente(cpf);
    let ultimoPedido = pedidosDoCliente.pedidos[pedidosDoCliente.pedidos.length -1];
    return ultimoPedido;
}

async function addPedido(pedido, cpf) {
    let pedidos = await getPedidosCliente(cpf);
    pedidos.push(pedido);
    await write(dbFile, JSON.stringify(pedidos));
}

module.exports = { getPedidos, getPedidosCliente, getUltimoPedidoDoCliente, addPedido };