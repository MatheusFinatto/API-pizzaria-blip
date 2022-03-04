const axios = require("axios")


async function getAddress(cep) {
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await axios.get(url);
    return response.data;
}

function filtro(data) {
    return {
        cep: data.cep,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
    }
}


module.exports = {getAddress, filtro}
