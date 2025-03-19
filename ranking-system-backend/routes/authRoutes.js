const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Авторизация по коду
router.post('/login', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Код обязателен' });
  }

  try {
    const user = await User.findOne({ code });
    if (!user) {
      return res.status(400).json({ message: 'Неверный код' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token, role: user.role, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
