const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();

// Начисление баллов
router.post('/score', async (req, res) => {
  const { taskId, score } = req.body;

  if (!taskId || !score) {
    return res.status(400).json({ message: 'ID задания и баллы обязательны' });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Задание не найдено' });
    }

    task.score = score;
    await task.save();

    // Обновляем рейтинг ученика
    const student = await User.findById(task.student);
    student.rating += score;
    await student.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

