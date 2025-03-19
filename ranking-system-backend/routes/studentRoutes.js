const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Создание ученика
router.post('/create', async (req, res) => {
  const { name, class: studentClass } = req.body;

  if (!name || !studentClass) {
    return res.status(400).json({ message: 'ФИО и параллель обязательны' });
  }

  try {
    const user = new User({ name, class: studentClass });
    await user.save();
    res.json({ code: user.code });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
