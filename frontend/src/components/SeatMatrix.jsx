import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import SeatIcon from '@mui/icons-material/EventSeatRounded';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../state/features/authSlice';
import { getSeatNumber } from '../utils/seatFunctions';

const SeatMatrix = ({ coach }) => {
  const user = useSelector(selectLoggedInUser);
  const isMobile = useMediaQuery('(max-width: 400px)');

  const computeColor = (seat) => {
    const { isReserved, userName } = seat;
    return user === userName
      ? 'secondary.light'
      : isReserved
      ? 'error.light'
      : 'teal.main';
  };

  const renderSeat = (seat, rowIdx, colIdx) => (
    <Tooltip
      key={seat._id}
      arrow
      disableFocusListener
      title={`Seat No: #${getSeatNumber(rowIdx, colIdx, coach.seatsPerRow)}`}
    >
      <Avatar
        key={seat._id}
        sx={{
          bgcolor: computeColor(seat),
          height: isMobile ? 30 : 40,
          width: isMobile ? 30 : 40,
        }}
      >
        <SeatIcon fontSize={isMobile ? 'small' : 'medium'} />
      </Avatar>
    </Tooltip>
  );

  return (
    <Paper
      sx={{ px: 2, py: 2, maxWidth: '28rem', mx: 'auto', borderRadius: '16px' }}
    >
      <Typography
        variant='h5'
        component='div'
        color='primary'
        textAlign='center'
        mb={2}
      >
        Seat Matrix
      </Typography>
      <Stack spacing={2} alignItems='center'>
        {coach.seats.map((row, rowIdx) => (
          <Stack key={rowIdx} direction='row' spacing={{ xs: 1.5, sm: 2 }}>
            {row.map((seat, colIdx) => renderSeat(seat, rowIdx, colIdx))}
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default SeatMatrix;
