const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
  const { username } = req.body;

  try {
      if (await User.findOne({ username }))
        return res.status(400).send({ error: 'Usuário já existente.' });

      const user = await User.create(req.body);

      user.password = undefined;

      return res.send({ 
        user,
        token: generateToken({ id: user.id }),
      });
  } catch (err) {
      return res.status(400).send({ error: 'Cadastro falhou.' });
  }
});

router.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select('+password');
    
    if (!user)
        return res.status(400).send({ error: 'Usuário não encontrado.' });

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Senha inválida.' });

    user.password = undefined;

    res.send({ 
        user, 
        token: generateToken({ id: user.id }),
    });
});

module.exports = app => app.use('/auth', router);