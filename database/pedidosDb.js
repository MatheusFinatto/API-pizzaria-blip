const res = require("express/lib/response");
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
    const pedidosDoCliente = await getPedidosCliente(cpf);
    pedido.id = pedidosDoCliente.pedidos.length;
    pedidosDoCliente.pedidos.push(pedido);
    const AllPedidos = await getPedidos();
    for (let i = 0; i < AllPedidos.length; i++) {
        if (cpf == AllPedidos[i].cpf) {
            AllPedidos[i] = pedidosDoCliente.pedidos;
        }
    }
    await write(dbFile, JSON.stringify(AllPedidos));
    return AllPedidos;
}

module.exports = { getPedidos, getPedidosCliente, getUltimoPedidoDoCliente, addPedido };