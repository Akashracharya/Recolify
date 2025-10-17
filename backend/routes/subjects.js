const router = require('express').Router();
let Subject = require('../models/subject.model');
let StudyItem = require('../models/studyItem.model'); // <-- We need to import the StudyItem model

// GET all subjects
router.route('/').get((req, res) => {
  Subject.find()
    .then(subjects => res.json(subjects))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ADD a new subject
router.route('/add').post((req, res) => {
  const { name, color } = req.body;
  const newSubject = new Subject({ name, color });

  newSubject.save()
    .then(savedSubject => res.status(201).json(savedSubject))
    .catch(err => res.status(400).json('Error: ' + err));
});

// --- UPDATED DELETE LOGIC ---
router.route('/:id').delete(async (req, res) => {
  const subjectId = req.params.id;

  try {
    // Step 1: Delete all study items associated with the subject
    await StudyItem.deleteMany({ subjectId: subjectId });

    // Step 2: Delete the subject itself
    const deletedSubject = await Subject.findByIdAndDelete(subjectId);

    if (!deletedSubject) {
      return res.status(404).json('Error: Subject not found.');
    }

    res.json('Subject and all associated study items deleted.');
    
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;

