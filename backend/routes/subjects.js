// backend/routes/subjects.js
const router = require('express').Router();
let Subject = require('../models/subject.model');
let StudyItem = require('../models/studyItem.model');

module.exports = function(checkJwt) {
    // GET all subjects FOR THE LOGGED-IN USER
    router.route('/').get(checkJwt, (req, res) => {
      const userId = req.auth.payload.sub; // CORRECTED PATH
      Subject.find({ userId: userId })
        .then(subjects => res.json(subjects))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    // ADD a new subject FOR THE LOGGED-IN USER
    router.route('/add').post(checkJwt, (req, res) => {
      const { name, color } = req.body;
      const userId = req.auth.payload.sub; // CORRECTED PATH
      const newSubject = new Subject({ name, color, userId });

      newSubject.save()
        .then(savedSubject => res.status(201).json(savedSubject))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    // DELETE a subject FOR THE LOGGED-IN USER
    router.route('/:id').delete(checkJwt, async (req, res) => {
      const subjectId = req.params.id;
      const userId = req.auth.payload.sub; // CORRECTED PATH

      try {
        const subject = await Subject.findOne({ _id: subjectId, userId: userId });
        if (!subject) {
          return res.status(404).json('Error: Subject not found or you do not have permission.');
        }

        await StudyItem.deleteMany({ subjectId: subjectId, userId: userId });
        await Subject.findByIdAndDelete(subjectId);

        res.json('Subject and all associated study items deleted.');
      } catch (err) {
        res.status(400).json('Error: ' + err);
      }
    });
    return router;
}