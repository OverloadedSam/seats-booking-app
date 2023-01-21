import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SeatInformation from '../components/SeatInformation';
import SeatMatrix from '../components/SeatMatrix';
import Legend from '../components/Legend';
import Alert from '../common/Alert';
import Loader from '../common/Loader';
import { useGetTrainCoachDetailsQuery } from '../state/features/apiSlice';

const ReservationDetails = () => {
  const { id } = useParams();
  const { isLoading, data, error, refetch } = useGetTrainCoachDetailsQuery(id);

  useEffect(() => {
    refetch(id);
  }, [id]);

  return (
    <Container>
      <Typography
        mt={2}
        mb={4}
        variant='h3'
        component='h1'
        color='primary'
        textAlign='center'
        fontWeight={500}
      >
        Reservation Details
      </Typography>

      {data ? (
        <Grid container gap={3} justifyContent='center' mb={5}>
          <Grid item>
            <SeatInformation train={data.train} />
          </Grid>

          <Grid item>
            <SeatMatrix coach={data.train.coach} />
          </Grid>

          <Grid item>
            <Legend />
          </Grid>
        </Grid>
      ) : isLoading ? (
        <Loader />
      ) : error ? (
        <Alert message={error.error || error.data.message} />
      ) : null}
    </Container>
  );
};

export default ReservationDetails;
