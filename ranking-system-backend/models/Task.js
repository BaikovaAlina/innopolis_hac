const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true }, // Описание задания
  file: { type: String }, // Путь к файлу
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Ученик
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' }, // Игра
  score: { type: Number, default: 0 }, // Баллы
  comments: { type: String }, // Комментарии учителя
});

module.exports = mongoose.model('Task', taskSchema);

