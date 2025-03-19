const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ФИО
  class: { type: String, required: true }, // Параллель
  code: { type: String, unique: true, default: () => nanoid(8) }, // Уникальный код
  rating: { type: Number, default: 0 }, // Рейтинг
  role: { type: String, enum: ['student', 'teacher'], default: 'student' }, // Роль
});

module.exports = mongoose.model('User', userSchema);
