// backend/models/studyItem.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyItemSchema = new Schema({
  content: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  flashcard: {
    front: { type: String, required: true },
    back: { type: String, required: true }
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  // Add userId to associate the item directly with a user
  userId: { type: String, required: true, index: true },
}, {
  timestamps: true,
});

const StudyItem = mongoose.model('StudyItem', studyItemSchema);

module.exports = StudyItem;