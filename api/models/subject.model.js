// backend/models/subject.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: String, required: true, trim: true },
  color: { type: String, required: true },
  // Add userId to associate the subject with a user
  userId: { type: String, required: true, index: true },
}, {
  timestamps: true,
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;