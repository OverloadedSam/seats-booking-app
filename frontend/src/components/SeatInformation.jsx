import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { selectLoggedInUser } from '../state/features/authSlice';
import { getUserReservedSeats } from '../utils/seatFunctions';

const SeatInformation = ({ train }) => {
  const userName = useSelector(selectLoggedInUser);

  const userReservedSeats = useMemo(
    () => getUserReservedSeats(train.coach.seats, userName),
    [train.coach.seats]
  );

  return (
    <Paper
      sx={{ p: 3, maxWidth: '20rem', mx: 'auto', borderRadius: '16px' }}
      as='aside'
    >
      <Typography
        variant='h5'
        component='div'
        color='primary'
        textAlign='center'
        mb={2}
      >
        Information
      </Typography>

      <Stack mb={2}>
        <Typography variant='body1'>
          <Box as='span' fontWeight={700}>
            Train
          </Box>
          : {train.name}
        </Typography>
        <Typography variant='body1'>
          <Box as='span' fontWeight={700}>
            Train Number
          </Box>
          : {train.number}
        </Typography>
        <Typography variant='body1'>
          <Box as='span' fontWeight={700}>
            Coach
          </Box>
          : {train.coach.name}
        </Typography>
        <Typography variant='body1'>
          <Box as='span' fontWeight={700}>
            Starting Station
          </Box>
          : {train.startStation}
        </Typography>
        <Typography variant='body1'>
          <Box as='span' fontWeight={700}>
            Termination Station
          </Box>
          : {train.terminationStation}
        </Typography>
      </Stack>

      <Typography
        variant='h5'
        component='div'
        color='primary'
        textAlign='center'
        mb={2}
      >
        Your Seats
      </Typography>
      <Stack>
        <Typography variant='body1'>
          <Box as='span' fontWeight={700}>
            Coach Name
          </Box>
          : {train.coach.name}
        </Typography>
        <Typography variant='body1'>
          <Box as='span' fontWeight={700}>
            Your Total Reserved Seats
          </Box>
          : {userReservedSeats.length}
        </Typography>
        <Typography variant='body1'>
          <Box as='span' fontWeight={700}>
            Seat Numbers
          </Box>
          :{' '}
          {userReservedSeats.length === 0
            ? 'N/A'
            : userReservedSeats.join(', ')}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default SeatInformation;
