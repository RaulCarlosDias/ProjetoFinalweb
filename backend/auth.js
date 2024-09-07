// auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('./entidades/usuario');
const SECRET_KEY = 'sua_chave_secreta_muito_segura';

const  hashPassword = async (senha) => {
  return hashedPassword = bcrypt.hash(senha, 10);
};

const loginUser = async (email, senha) => {
  if (!email || !senha) {
    throw new Error('Email e senha são obrigatórios');
  }
  
  const usuario = await Usuario.findOne({where: {email: email}});

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }
  console.log(senha, usuario.senha)
  if (await bcrypt.compare(senha, usuario.senha)) {
    
    return jwt.sign({ email: usuario.email }, SECRET_KEY);
  } else {
    throw new Error('Senha incorreta');
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) return res.sendStatus(403);
    req.usuario = usuario;
    next();
  });
};

module.exports = {
  hashPassword,
  loginUser,
  authenticateToken
};