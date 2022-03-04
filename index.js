const customExpress = require("./config/customExpress")
const app = customExpress()
const axios = require("axios")

async function getAddress(cep) {
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await axios.get(url);
    return response.data;
}

function filtro(data) {
    return {
        cep: data.cep,
        rua: data.logradouro
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
    }
}

app.get("/api/cep/:cep", (req, res) => {
    let cep = req.params;   
    getAddress(cep.cep).then((value) => {
        let resposta = filtro(value);
        res.send(resposta);
    }).catch((err) => console.log("Erro" + err));
});


app.listen(process.env.PORT  || 3000)

