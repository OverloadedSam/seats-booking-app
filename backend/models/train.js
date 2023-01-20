const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Train name is a required field!'],
      minLength: 2,
      maxLength: 64,
      trim: true,
    },
    number: {
      type: Number,
      required: [true, 'Train number can not be empty!'],
      min: 1,
    },
    startStation: {
      type: String,
      required: [true, 'Start station can not be empty!'],
      minLength: 2,
      maxLength: 64,
      trim: true,
    },
    terminationStation: {
      type: String,
      required: [true, 'Termination station can not be empty!'],
      minLength: 2,
      maxLength: 64,
      trim: true,
    },
  },
  { timestamps: true }
);

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
