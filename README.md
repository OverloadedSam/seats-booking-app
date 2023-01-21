# seats-booking-app

This app allows users to book/reserve their seats in a train coach and this app is built using MERN Stack (MongoDB, Express.js, React.js, Node.js).

The app allows users to easily book their preferred seats on trains without the need to log in. By default, there are 80 seats available in each train coach. Each row consists 7 seats except last row. When a user makes a reservation, our system will first try to book seats in the same row of the coach for the user. If it is not possible to reserve seats in the same row, the system will book nearby seats. This ensures that the user has a comfortable and convenient journey.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node.js >= 18.12.1
- NPM >= 8.19.2
- MongoDB

## Installation

1. Clone the repository

        $ git clone https://github.com/OverloadedSam/seats-booking-app.git

2. Go to `frontend` and `backend` directory one by one and install dependencies with command shown at 3rd step.

        $ cd frontend/
        // And
        $ cd backend/

3. Install the dependencies


    $ npm install

## Configure App

You have to set the environment variables of your configuration before starting the app.

### 1. Environment variables for `frontend`

Create a `.env` file at `seats-booking-app/frontend/` directory and set the following environment variables starting with prefix `VITE_`

    VITE_BASE_URL={api_url_of_the_backend} // e.g: http://localhost:8000/api

### 2. Environment variables for `backend`

Create a `.env` file at `seats-booking-app/backend/` directory and set the following environment variables.

    PORT=8000 // You can set any port number that is available but make sure to correctly include it in frontend environment variables.
    API_PATH_PREFIX=/api
    DB_CONNECTION_STRING={your_mongodb_connection_uri}
    DB_NAME={mongodb_database_name}
    DEFAULT_TRAIN_ID=63ca42a4437ba5442f6680aa
    DEFAULT_COACH_ID=63ca7bf0908544cdd2ed78df

### 3. Seed the database with mock/sample data.

For populating the database with sample data, please use the following command to seed the database

    $ cd seats-booking-app/backend // go to backend directory.
    $ npm run seed

## Running The Project

### Start backend (Node API)

    $ cd seats-booking-app/backend // go to backend directory
    $ npm run dev // run backend with hot reloading.
    // or you can run the backend with standard command
    $ node server.js

### Start Frontend (React app [VITE])

    $ cd seats-booking-app/frontend // go to frontend directory
    $ npm run dev

## Deployment

The app can be deployed to a hosting platform such as Render or Heroku.

## Built With

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
