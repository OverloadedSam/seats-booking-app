import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import SeatIcon from '@mui/icons-material/EventSeatRounded';

const Legend = () => {
  const isMobile = useMediaQuery('(max-width: 400px)');

  return (
    <Paper
      sx={{ p: 3, maxWidth: '15rem', mx: 'auto', borderRadius: '16px' }}
      as='aside'
    >
      <Typography
        variant='h5'
        component='div'
        color='primary'
        textAlign='center'
        mb={2}
      >
        Legend
      </Typography>

      <Stack spacing={2}>
        <Stack alignItems='center' direction='row' spacing={2}>
          <Avatar
            sx={{
              bgcolor: 'secondary.light',
              height: isMobile ? 30 : 40,
              width: isMobile ? 30 : 40,
            }}
          >
            <SeatIcon fontSize={isMobile ? 'small' : 'medium'} />
          </Avatar>
          <Typography variant='body1'>Your Seat</Typography>
        </Stack>
        <Stack alignItems='center' direction='row' spacing={2}>
          <Avatar
            sx={{
              bgcolor: 'error.light',
              height: isMobile ? 30 : 40,
              width: isMobile ? 30 : 40,
            }}
          >
            <SeatIcon fontSize={isMobile ? 'small' : 'medium'} />
          </Avatar>
          <Typography variant='body1'>Reserved Seat</Typography>
        </Stack>
        <Stack alignItems='center' direction='row' spacing={2}>
          <Avatar
            sx={{
              bgcolor: 'teal.main',
              height: isMobile ? 30 : 40,
              width: isMobile ? 30 : 40,
            }}
          >
            <SeatIcon fontSize={isMobile ? 'small' : 'medium'} />
          </Avatar>
          <Typography variant='body1'>Unreserved Seat</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Legend;
