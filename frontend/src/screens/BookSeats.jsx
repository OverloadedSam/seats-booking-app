import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import MuiPaper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MuiSlider from '@mui/material/Slider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TramIcon from '@mui/icons-material/Tram';
import SeatIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ArrowIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import Alert from '../common/Alert';
import Loader from '../common/Loader';
import {
  useGetTrainCoachDetailsQuery,
  useReserveSeatsMutation,
} from '../state/features/apiSlice';
import { selectLoggedInUser } from '../state/features/authSlice';

const BookSeats = () => {
  const [seats, setSeats] = useState(1);
  const userName = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  /* ASSUMPTION: Hardcoding coach id as it is fairly simple app. */
  const coachId = '63ca7bf0908544cdd2ed78df';
  const { isLoading, data, error } = useGetTrainCoachDetailsQuery(coachId);
  const [
    reserveSeats,
    { isLoading: isBooking, isSuccess: isBooked, error: bookingError },
  ] = useReserveSeatsMutation();

  // Make marks (dots) for slider.
  const marks = useMemo(() => {
    if (data) {
      const { seatsPerRow } = data.train.coach;
      let dots = [{ value: 1, label: '1 Seat' }];
      for (let i = 2; i < seatsPerRow; i++) dots.push({ value: i });
      dots.push({ value: dots.length + 1, label: `${dots.length + 1} Seats` });
      return dots;
    } else return [{ value: 0, label: '0 Seat' }];
  }, [data]);

  useEffect(() => {
    if (isBooked) {
      toast.success(`Your ${seats} seat(s) has been booked!`);
      navigate('/reservation-details');
    }

    if (bookingError) {
      const message = bookingError.error || bookingError.data.message;
      toast.error(message);
    }
  }, [isBooked, bookingError]);

  const bookSeats = () => {
    console.log('Booking seats...');
    reserveSeats({ numberOfSeats: seats, userName, coachId });
  };

  return (
    <Container>
      <MuiPaper
        elevation={4}
        sx={{
          p: 4,
          mt: 5,
          mx: 'auto',
          maxWidth: '40rem',
          borderRadius: '16px',
        }}
      >
        <Typography
          textAlign='center'
          color='secondary'
          fontWeight={400}
          variant='h2'
        >
          Reserve Seats
        </Typography>
        <Avatar
          sx={{
            height: '60px',
            width: '60px',
            m: 2,
            bgcolor: 'teal.dark',
            fontSize: '30px',
            mx: 'auto',
          }}
        >
          <TramIcon fontSize='inherit' />
        </Avatar>

        {data ? (
          <>
            <Stack spacing={1.5} color='teal.main'>
              <Typography textAlign='center' variant='body1'>
                <Box as='span' fontWeight={700}>
                  Train
                </Box>
                : {data.train.name}
              </Typography>
              <Typography textAlign='center' variant='body1'>
                <Box as='span' fontWeight={700}>
                  Train Number
                </Box>
                : {data.train.number}
              </Typography>
              <Typography textAlign='center' variant='body1'>
                <Box as='span' fontWeight={700}>
                  Coach
                </Box>
                : {data.train.coach.name}
              </Typography>
              <Typography textAlign='center' variant='body1'>
                <Box as='span' fontWeight={700}>
                  Starting Station
                </Box>
                : {data.train.startStation}
              </Typography>
              <Typography textAlign='center' variant='body1'>
                <Box as='span' fontWeight={700}>
                  Termination Station
                </Box>
                : {data.train.terminationStation}
              </Typography>
            </Stack>
            <Typography
              mt={4}
              mb={1}
              variant='h6'
              component='h2'
              textAlign='center'
              color='secondary'
              fontWeight={700}
            >
              Select Seats to Book
            </Typography>
            <Stack
              mb={4}
              direction='row'
              spacing={2}
              alignItems='center'
              justifyContent='center'
            >
              <SeatIcon
                color='secondary'
                sx={{ height: '35px', width: '35px' }}
              />
              <Slider
                aria-label='Seats'
                defaultValue={seats}
                getAriaValueText={(v) => v + 'Seat'}
                valueLabelDisplay='auto'
                step={1}
                marks={marks}
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                min={0}
                max={data.train.coach.seatsPerRow}
              />
            </Stack>
            <Button
              fullWidth
              onClick={bookSeats}
              disabled={!seats || isBooking}
              variant='contained'
              color='secondary'
              endIcon={<ArrowIcon />}
            >
              {isBooking ? 'Booking Seats...' : 'Book Seats'}
            </Button>
          </>
        ) : isLoading ? (
          <Loader mt={5} />
        ) : error ? (
          <Alert message={error.error} />
        ) : null}
      </MuiPaper>
    </Container>
  );
};

const Slider = styled(MuiSlider)(({ theme }) => ({
  color: `${theme.palette.secondary.main}`,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: `${theme.palette.secondary.main}`,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
  '& .MuiSlider-markLabel': {
    color: `${theme.palette.secondary.main}`,
  },
}));

export default BookSeats;
