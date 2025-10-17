const router = require('express').Router();
let StudyItem = require('../models/studyItem.model');

// --- GET ALL STUDY ITEMS FOR A SPECIFIC SUBJECT ---
// The route will look like: /api/studyitems/subject/60c72b2f9b1e8a5f4c8b4567
router.route('/subject/:subjectId').get((req, res) => {
  StudyItem.find({ subjectId: req.params.subjectId })
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

// --- ADD A NEW STUDY ITEM ---
router.route('/add').post((req, res) => {
  const { content, category, flashcard, subjectId } = req.body;

  const newItem = new StudyItem({
    content,
    category,
    flashcard,
    subjectId
  });

  newItem.save()
    .then(savedItem => res.status(201).json(savedItem))
    .catch(err => res.status(400).json('Error: ' + err));
});

// --- DELETE A STUDY ITEM ---
router.route('/:id').delete((req, res) => {
  StudyItem.findByIdAndDelete(req.params.id)
    .then(() => res.json('Study item deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
