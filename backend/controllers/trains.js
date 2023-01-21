const Train = require('../models/train');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * @DESC     Creates a train in the DB.
 * @ROUTE    POST /api/train
 * @ACCESS   Public
 * @PARAMS   {string} name.body.required - Name for the train.
 * @PARAMS   {number} number.body.required - Number of the train.
 * @PARAMS   {string} startStation.body.optional - Starting station of the train.
 * @PARAMS   {string} terminationStation.body.optional - Terminating station of the train.
 * @RETURNS  {object} 201 - {success, status, ...train}
 */
module.exports.createTrain = asyncHandler(async (req, res, next) => {
  const trainPayload = req.body;

  const train = new Train(trainPayload);
  await train.save();

  return res.status(201).json({
    success: true,
    status: 201,
    ...train._doc,
  });
});
