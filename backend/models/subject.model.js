    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const subjectSchema = new Schema({
      name: { type: String, required: true, trim: true },
      color: { type: String, required: true },
      // Later we will add a reference to the user who created it
      // userId: { type: String, required: true },
    }, {
      timestamps: true,
    });

    const Subject = mongoose.model('Subject', subjectSchema);

    module.exports = Subject;
    
