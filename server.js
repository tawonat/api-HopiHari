const http = require('http');
const app = require('./index');

const server = http.createServer(app); //função pra criar e rodar um server, escutar na porta 3000
server.listen(3000, () => {
    console.log('API rodando na porta 3000');
});