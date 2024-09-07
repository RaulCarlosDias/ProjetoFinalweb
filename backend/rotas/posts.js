
var express = require('express');
var router = express.Router();
var Post = require('./../entidades/post')
const { authenticateToken } = require('./../auth');
const { Op } = require('sequelize'); // Importante para usar operadores de busca

router.get('/posts/busca', async (req, res) => {
    const searchTerm = req.query.q; // Obtém o termo de busca da query string
  
    try {
      const posts = await Post.findAll({
        where: {
          conteudo: {
            [Op.like]: `%${searchTerm}%` // Busca por posts que contenham o termo de busca em qualquer parte do conteúdo
          }
        }
      });
  
      res.json(posts); // Retorna os posts encontrados como JSON
    } catch (error) {
      console.error('Erro na busca:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
router.get('/posts', authenticateToken, async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
});

router.get('/posts/:id', authenticateToken, async (req, res) => {
    const user = await Post.findByPk(req.params.id);
    res.json(user);
});

router.post('/posts', authenticateToken, async (req, res) => {
    const user = await Post.create(req.body);
    res.json(user);
});

router.put('/posts/:id', authenticateToken, async (req, res) => {
    const user = await Post.findByPk(req.params.id);
    if (user) {
        await user.update(req.body);
        res.json(user);
    } else {
        res.status(404).json({ message: 'Post não encontrado.' });
    }
});



module.exports = router;