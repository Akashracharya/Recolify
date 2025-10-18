// backend/routes/studyItems.js
const router = require('express').Router();
let StudyItem = require('../models/studyItem.model');

module.exports = function(checkJwt) {
    // GET all study items for a specific subject owned by the user
    router.route('/subject/:subjectId').get(checkJwt, (req, res) => {
      const userId = req.auth.payload.sub; // CORRECTED PATH
      StudyItem.find({ subjectId: req.params.subjectId, userId: userId })
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    // ADD a new study item for the logged-in user
    router.route('/add').post(checkJwt, (req, res) => {
      const { content, category, flashcard, subjectId } = req.body;
      const userId = req.auth.payload.sub; // CORRECTED PATH

      const newItem = new StudyItem({ content, category, flashcard, subjectId, userId });

      newItem.save()
        .then(savedItem => res.status(201).json(savedItem))
        .catch(err => res.status(400).json('Error: ' + err));
    });

    // DELETE a study item for the logged-in user
    router.route('/:id').delete(checkJwt, async (req, res) => {
        try {
            const itemId = req.params.id;
            const userId = req.auth.payload.sub; // CORRECTED PATH
            const result = await StudyItem.findOneAndDelete({ _id: itemId, userId: userId });

            if (!result) {
                return res.status(404).json('Error: Item not found or you do not have permission.');
            }
            res.json('Study item deleted.');
        } catch (err) {
            res.status(400).json('Error: ' + err);
        }
    });

    return router;
};