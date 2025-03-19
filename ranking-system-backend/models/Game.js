const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Название игры
  description: { type: String }, // Описание
  class: { type: String, required: true }, // Параллель
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // Задания
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Участники
});

module.exports = mongoose.model('Game', gameSchema);
