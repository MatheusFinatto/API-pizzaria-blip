
A presente API possui duas funções:

1. A primeira função, e principal, é acessar (via os métodos GET, POST, PUT e DELETE) um array de objetos que simula uma base de dados contendo um cardápio com três sabores de pizza.

Para acessar esta funcionalidade, deve-se usar o caminho /api/pizzas/ para os métodos GET e POST e para os métodos PUT e DELETE (ou para acessar especificamente um dos elementos do array com GET) o caminho /api/pizzas/:id. 


2. A segunda função é acessar, via axios, a api "Viacep", a qual retorna através de um método GET algumas informações sobre o endereço do CEP passado como parâmetro na URL.


Com tais funções definidas, esta API foi implementada em um chatbot na plataforma Blip, o qual serve a uma pizzaria fictícia, e tem como funcionalidades apresentar um cardápio (que utiliza da primeira função descrita) e consultar um endereço de entrega via CEP (que utiliza da segunda função descrita).

O chatbot citado pode ser acessado pelo seguinte link: https://matheus-fenando-finatto-77nu4.chat.blip.ai/?appKey=cGl6emFyaWFtYXRoZXVzZmluYXR0bzoxMTQwOTcxOS1mMmQyLTRiNGEtYjE1ZS03YTY2NzllOGEwZGQ=

Já a API, pode ser acessada pela URL:
https://pizzaria-matheus-finatto.herokuapp.com/

(Obs: a API pode vir a estar offline, pela utilização do plano gratuito do Heroku.)

