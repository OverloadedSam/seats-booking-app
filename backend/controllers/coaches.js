const Train = require('../models/train');
const Coach = require('../models/coach');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @DESC     Creates a coach in the DB. Initializes all seats as unreserved.
 * @ROUTE    POST /api/coach
 * @ACCESS   Public
 * @PARAMS   {number} totalSeats.body.required - Number of total seats in the coach.
 * @PARAMS   {number} seatsPerRow.body.required - Number of seats per row in the coach.
 * @PARAMS   {string/MongoDbId} train.body.optional - The coach's associated train id.
 * @RETURNS  {object} 201 - {success, status, ...coach}
 * @RETURNS  {object} 400 - {message: 'Some validation error message'}
 * @RETURNS  {object} 404 - {message: 'Train not found for the given Id'}
 */
module.exports.createCoach = asyncHandler(async (req, res, next) => {
  const { train: trainId = process.env.DEFAULT_TRAIN_ID } = req.body;
  const coachPayload = { ...req.body };

  const coach = new Coach(coachPayload);

  const { error } = coach.validateCoach();
  if (error) return next(new ErrorResponse(400, error));

  const trainExists = await Train.findById(trainId);
  if (!trainExists) {
    const message = `Train not found for the ID: ${trainId}`;
    return next(new ErrorResponse(404, message));
  }

  coach.initializeSeats();

  await coach.save();

  return res.status(201).json({
    success: true,
    status: 201,
    ...coach._doc,
  });
});
