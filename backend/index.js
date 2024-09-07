const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 3030;
const postsRouter = require('./rotas/posts.js')
const usuariosRouter = require('./rotas/usuarios.js')
const sequelize = require('./entidades/config.js');


let whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000'];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Request não permitida'))
    }
  },
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
// Middleware que trata o corpo da requisição
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(postsRouter)
app.use(usuariosRouter)
// Cria tabelas
sequelize.sync();

// Roda o index.js
app.listen(port, () => {
  console.log(`API rodando em ${port}`);
});