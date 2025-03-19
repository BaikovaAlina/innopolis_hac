const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Отправитель
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Получатель
  text: { type: String, required: true }, // Текст сообщения
  timestamp: { type: Date, default: Date.now }, // Время отправки
});

module.exports = mongoose.model('Message', messageSchema);
