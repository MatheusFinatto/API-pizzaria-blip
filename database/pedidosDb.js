const path = require("path");
const dbFile = (path.join(__dirname, "pedidosDb.json"))
const { read, write } = require("../helpers/file")

async function getPedidos() {
    let pedido = await read(dbFile);
    return JSON.parse(pedido);
}

async function getPedidosCliente(cpf) {
    const pedidos = await getPedidos()

    for (let i = 0; i < pedidos.length; i++) {
        if (cpf == pedidos[i].cpf) {
            return pedidos[i];
        }
    }

    return "CPF não encontrado";
}

async function getUltimoPedidoDoCliente(cpf) {
    const pedidosDoCliente = await getPedidosCliente(cpf);
    let ultimoPedido = pedidosDoCliente.pedidos[pedidosDoCliente.pedidos.length - 1];
    return ultimoPedido;
}

async function addPedido(pedido, cpf) {
    let pedidosDoCliente = await getPedidosCliente(cpf);
    pedido.id = pedidosDoCliente.pedidos.length
    pedidosDoCliente.pedidos.push(pedido)

    const pedidos = await getPedidos()

    for (let i = 0; i < pedidos.length; i++) {
        if (cpf == pedidos[i].cpf) {
            pedidos[i] = pedidosDoCliente.pedidos;
        }
    }

    console.log(pedidos)


    // await write(dbFile, JSON.stringify(pedidos));
}

module.exports = { getPedidos, getPedidosCliente, getUltimoPedidoDoCliente, addPedido};