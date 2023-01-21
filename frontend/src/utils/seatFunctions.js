export const getSeatNumber = (rowIndex, columnIndex, numberOfColumns) => {
  let position = rowIndex * numberOfColumns + columnIndex;

  return position + 1;
};

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
