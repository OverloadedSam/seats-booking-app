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

/**
 * @DESC     Reserves seat in a coach. For the given number of seats.
 * @ROUTE    POST /api/reserve-seats
 * @ACCESS   Public
 * @PARAMS   {number} numberOfSeats.body.required - Number of seats that user wants to reserve.
 * @PARAMS   {string} userName.body.required - Username/Id of the user.
 * @PARAMS   {string/MongoDbId} coachId.body.optional - The ID of the coach.
 * @RETURNS  {object} 200 - {success, status, ...coach}
 * @RETURNS  {object} 400 - {message: 'You need to book at least 1 seat!'}
 * @RETURNS  {object} 400 - {message: 'No username found in the request body. Please refresh the page and try again!'}
 * @RETURNS  {object} 404 - {message: 'Requested coach not found for booking'}
 * @RETURNS  {object} 404 - {message: 'There are currently not enough seats available!'}
 * @RETURNS  {object} 404 - {message: 'You can book maximum X seats at a time!'}
 */
module.exports.reserveSeats = asyncHandler(async (req, res, next) => {
  const {
    numberOfSeats,
    userName,
    coachId = process.env.DEFAULT_COACH_ID,
  } = req.body;

  if (!numberOfSeats || numberOfSeats <= 0)
    return next(new ErrorResponse(400, 'You need to book at least 1 seat!'));

  if (!userName) {
    const message =
      'No username found in the request body. Please refresh the page and try again!';
    return next(new ErrorResponse(400, message));
  }

  const coach = await Coach.findById(coachId);

  if (!coach) {
    const message = 'Requested coach not found for booking';
    return next(new ErrorResponse(404, message));
  }

  if (numberOfSeats > coach.seatsPerRow) {
    const message = `You can book maximum ${coach.seatsPerRow} seats at a time!`;
    return next(new ErrorResponse(400, message));
  }

  if (numberOfSeats > coach.availableSeats) {
    const message = 'There are currently not enough seats available!';
    return next(new ErrorResponse(404, message));
  }

  const coordinates = coach.findConsecutiveSeatsInRow(numberOfSeats);

  // When consecutive seats in the same row are available.
  if (coordinates.start.row !== -1)
    coach.bookConsecutiveSeatsInRow(coordinates, userName);
  else coach.bookNonConsecutiveSeats(numberOfSeats, userName);

  await coach.save();

  return res.json({
    success: true,
    status: 200,
    ...coach._doc,
  });
});
