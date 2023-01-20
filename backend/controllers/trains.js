const Train = require('../models/train');
const asyncHandler = require('../middlewares/asyncHandler');

module.exports.createTrain = asyncHandler(async (req, res, next) => {
  const trainPayload = req.body;

  const train = new Train(trainPayload);
  await train.save();

  return res.json({
    success: true,
    status: 200,
    ...train._doc,
  });
});
