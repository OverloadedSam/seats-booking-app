const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema(
  {
    train: {
      type: mongoose.Types.ObjectId,
      ref: 'Train',
      required: [true, 'ID of train is a required field!'],
    },
    name: {
      type: String,
      required: [true, 'Coach name is a required field!'],
      minLength: 2,
      maxLength: 32,
      trim: true,
    },
    totalSeats: {
      type: Number,
      required: [true, 'Please specify total seats in a coach!'],
      min: 0,
    },
    rows: {
      type: Number,
      required: [true, 'Please specify total number of rows in a coach!'],
      min: 0,
    },
    seatsPerRow: {
      type: Number,
      required: [true, 'Please specify number of seats per row in a coach!'],
      min: 0,
    },
    availableSeats: {
      type: Number,
      default: 0,
      min: 0,
    },
    seats: {
      type: [
        [
          {
            isReserved: Boolean,
            userName: {
              type: String,
              default: null,
            },
          },
        ],
      ],
      default: [[]],
    },
  },
  { timestamps: true }
);

/**
 * @DESC     Validation for creating coach in the DB.
 * @RETURNS  {object} - An object containing single property 'error'.
 * @RETURNS  {string} - return.error - The error message (if any otherwise null).
 */
coachSchema.methods.validateCoach = function () {
  const { train, seatsPerRow, totalSeats } = this;
  let error = null;

  if (!train || !mongoose.isValidObjectId(train))
    error = 'Train id is not a valid id!';

  if (seatsPerRow > totalSeats)
    error = 'Number of seats per row can not exceed total number of seats';

  if (seatsPerRow < 0 || (seatsPerRow <= 0 && totalSeats > 0))
    error = 'Invalid number of seats per row!';

  if (totalSeats < 0 || (totalSeats <= 0 && seatsPerRow > 0))
    error = 'Invalid total number of seats!';

  return { error };
};

/**
 * @DESC            Populates all seats as unreserved initially in the DB.
 * @TimeComplexity  O(n) in worst case, where n = this.totalSeats.
 */
coachSchema.methods.initializeSeats = function () {
  const { totalSeats, seatsPerRow } = this;

  const rows = Math.ceil(totalSeats / seatsPerRow);
  this.rows = rows;
  this.availableSeats = totalSeats;

  let seatMatrix = [];
  let seatNumber = 1;
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < seatsPerRow && seatNumber <= totalSeats; j++) {
      row.push({ isReserved: false });
      seatNumber++;
    }
    seatMatrix.push(row);
  }

  this.seats = seatMatrix;
};

/**
 * @DESC             Finds contiguous seats in a train coach represented by a 2D array (matrix).
 * @PARAMS           {number} numberOfSeats - Number of seats that user wants to book.
 * @RETURNS          {object} - An object representing start & end coordinates of contiguous seats in same row.
 * @RETURNS          {object} - return.start - An object that represents starting element (starting seat). e.g: { row: 0, col: 1 }
 * @RETURNS          {object} - return.end - An object that represents ending element (ending seat). e.g: { row: 0, col: 2 }
 * @TIME_COMPLEXITY  O(n) in worst case, where n = this.totalSeats.
 */
coachSchema.methods.findConsecutiveSeatsInRow = function (numberOfSeats) {
  for (let i = 0; i < this.seats.length; i++) {
    let start = -1;
    let end = -1;
    let count = 0;
    for (let j = 0; j < this.seats[i].length; j++) {
      if (!this.seats[i][j].isReserved) {
        if (count === 0) start = j;
        count++;
        if (count === numberOfSeats) {
          end = j;
          break;
        }
      } else count = 0;
    }

    if (start !== -1 && end !== -1)
      return { start: { row: i, col: start }, end: { row: i, col: end } };
  }

  return { start: { row: -1, col: -1 }, end: { row: -1, col: -1 } };
};

/**
 * @DESC             Reserves contiguous seats in the same row in a train coach represented by a 2D array (matrix).
 * @PARAMS           {object} coordinates - An object representing start & end coordinates of contiguous seats in same row.
 * @PARAMS           {object} coordinates.start - An object that represents starting element (starting seat). e.g: { row: 0, col: 1 }
 * @PARAMS           {object} coordinates.end - An object that represents ending element (ending seat). e.g: { row: 0, col: 2 }
 * @PARAMS           {string} userName - Username/Id of the user.
 * @THROWS           {Error} - Coordinates for seats are invalid.
 * @TIME_COMPLEXITY  O(n) in worst case, where n = this.seatsPerRow.
 */
coachSchema.methods.bookConsecutiveSeatsInRow = function (
  coordinates,
  userName
) {
  const { start, end } = coordinates;
  if (start.row === -1 || start.col === -1 || end.row === -1 || end.col === -1)
    throw new Error('Coordinates for seats are invalid');

  const { seats, availableSeats } = this;
  for (let i = start.col; i <= end.col; i++) {
    seats[start.row][i].isReserved = true;
    seats[start.row][i].userName = userName;
  }

  const numberOfSeats = end.col - start.col + 1;
  this.availableSeats = this.availableSeats - numberOfSeats; // Update the count of available seats.
};

/**
 * @DESC             Reserves seats in a train coach represented by a 2D array (matrix) using linear search.
 * @PARAMS           {number} numberOfSeats - Number of seats that user wants to book.
 * @PARAMS           {string} userName - Username/Id of the user.
 * @THROWS           {Error} - Invalid parameters to the method.
 * @TIME_COMPLEXITY  O(n) in worst case, where n = this.totalSeats.
 */
coachSchema.methods.bookNonConsecutiveSeats = function (
  numberOfSeats,
  userName
) {
  if (!numberOfSeats || !userName)
    throw new Error('Invalid parameters to the method');

  const { seats, totalSeats, seatsPerRow, rows } = this;
  let seatNumber = 1;
  let reservedCount = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < seatsPerRow && seatNumber <= totalSeats; j++) {
      if (!seats[i][j].isReserved) {
        seats[i][j].isReserved = true;
        seats[i][j].userName = userName;
        reservedCount++;
        seatNumber++;
      }
      if (reservedCount === numberOfSeats) break;
    }
  }

  this.availableSeats = this.availableSeats - numberOfSeats; // Update the count of available seats.
};

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;
