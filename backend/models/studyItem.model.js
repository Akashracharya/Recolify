const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyItemSchema = new Schema({
  content: { type: String, required: true, trim: true },
  category: { type: String, required: true }, // e.g., 'Tricky Words', 'Formulas'
  flashcard: {
    front: { type: String, required: true },
    back: { type: String, required: true }
  },
  // This is the link back to the parent Subject document.
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject', // This tells Mongoose it's a reference to our 'Subject' model
    required: true
  }
}, {
  timestamps: true,
});

const StudyItem = mongoose.model('StudyItem', studyItemSchema);

module.exports = StudyItem;
