const Usuario = require('../entidades/usuario');
const { registerUser, loginUser, hashPassword  } = require('./../auth');

var express = require('express');
var router = express.Router();

router.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

router.get('/usuarios/:id', async (req, res) => {
    const user = await Usuario.findByPk(req.params.id);
    res.json(user);
});

router.post('/usuarios/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const token = await loginUser(email, senha);
        res.json({ accessToken: token });
    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.post('/usuarios', async (req, res) => {
    try {
        let {email, senha, nome} = req.body;
        senha = await hashPassword(senha);
        const user = await Usuario.create({nome, email, senha});
        res.status(201).send('Usuário registrado com sucesso');
    } catch (error) {
        res.status(400).send(error.message);
    }
});



module.exports = router;