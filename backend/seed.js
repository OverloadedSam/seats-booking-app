const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Train = require('./models/train');
const Coach = require('./models/coach');

dotenv.config();

const dataTrains = [
  {
    _id: '63ca42a4437ba5442f6680aa',
    name: 'Vande Bharat Express',
    number: 22439,
    startStation: 'New Delhi',
    terminationStation: 'Katra',
  },
];

const dataCoaches = [
  {
    _id: '63ca7bf0908544cdd2ed78df',
    train: '63ca42a4437ba5442f6680aa',
    name: 'E1',
    totalSeats: 9,
    seatsPerRow: 3,
    availableSeats: 9,
    seats: [
      [
        {
          isReserved: false,
          userName: null,
        },
        {
          isReserved: false,
          userName: null,
        },
        {
          isReserved: false,
          userName: null,
        },
      ],
      [
        {
          isReserved: false,
          userName: null,
        },
        {
          isReserved: false,
          userName: null,
        },
        {
          isReserved: false,
          userName: null,
        },
      ],
      [
        {
          isReserved: false,
          userName: null,
        },
        {
          isReserved: false,
          userName: null,
        },
        {
          isReserved: false,
          userName: null,
        },
      ],
    ],
    rows: 3,
  },
];

async function seed() {
  await connectDB();

  await Train.deleteMany({});
  await Coach.deleteMany({});

  await Train.insertMany(dataTrains);
  await Coach.insertMany(dataCoaches);

  console.info('Insertion of data has been successful!');
  process.exit(1);
}

seed();
