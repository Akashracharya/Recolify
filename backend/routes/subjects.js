const router = require('express').Router();
let Subject = require('../models/subject.model');

// GET all subjects at '/' (which corresponds to '/api/subjects')
router.route('/').get((req, res) => {
  Subject.find()
    .then(subjects => res.json(subjects))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ADD a new subject at '/add' (which corresponds to '/api/subjects/add')
router.route('/add').post((req, res) => {
  const { name, color } = req.body;

  if (!name || !color) {
    return res.status(400).json('Error: Name and color are required.');
  }

  const newSubject = new Subject({ name, color });

  newSubject.save()
    .then(savedSubject => res.status(201).json(savedSubject)) // Use 201 for successful creation
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE a subject at '/:id' (e.g., '/api/subjects/12345')
router.route('/:id').delete((req, res) => {
  Subject.findByIdAndDelete(req.params.id)
    .then(() => res.json('Subject deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

