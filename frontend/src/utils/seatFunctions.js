/**
 * @DESC     Calculates the seat number.
 * @PARAMS   {number} rowIndex - Row index of a seat matrix (2D array).
 * @PARAMS   {number} columnIndex - Column index of a seat matrix (2D array).
 * @PARAMS   {number} numberOfColumns - Number of columns in a seat matrix (2D array).
 * @RETURNS  {number} - Represents the seat number (non-zero based indexing).
 */
export const getSeatNumber = (rowIndex, columnIndex, numberOfColumns) => {
  let position = rowIndex * numberOfColumns + columnIndex;

  return position + 1;
};

/**
 * @DESC     Get the array of reserved seats for a user.
 * @PARAMS   {Array<Array<seatObject>>} seats - A seat matrix represented by a 2D array.
 * @PARAMS   {string} userName - Logged in user.
 * @RETURNS  {Array<number>} - Represents the seats numbers reserved by the given user.
 */
export const getUserReservedSeats = (seats, userName) => {
  const userSeats = [];
  const numberOfColumns = seats[0].length;

  for (let i = 0; i < seats.length; i++)
    for (let j = 0; j < seats[i].length; j++) {
      if (seats[i][j].userName === userName)
        userSeats.push(getSeatNumber(i, j, numberOfColumns));
    }

  return userSeats;
};
