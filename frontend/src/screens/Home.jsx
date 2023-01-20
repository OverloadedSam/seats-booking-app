import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Hero className='hero'>
      <HeroContainer className='container'>
        <HeroTitle fontWeight={400} variant='h2' component='h1' gutterBottom>
          Reserve Train Seats, Stress-Free!
        </HeroTitle>
        <HeroSubtitle variant='subtitle1' mb={4}>
          Convenient online train seat reservations. User-friendly platform for
          planning, choosing, and booking in minutes.
        </HeroSubtitle>
        <Stack direction='row' spacing={2}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={() => navigate('/book-seats')}
          >
            Book Seats
          </Button>
        </Stack>
      </HeroContainer>
    </Hero>
  );
};

export default Home;

const Hero = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),
    url('/assets/images/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
  text-shadow: 0px 5px 10px 000000;
  height: 90vh;
  display: flex;
  align-items: center;
`;

const HeroTitle = styled(Typography)`
  text-shadow: 3px 2px 5px rgba(14, 14, 14, 1);
`;

const HeroSubtitle = styled(Typography)`
  font-size: 1.2rem;
  line-height: 1.4;
  text-shadow: 3px 2px 5px rgba(14, 14, 14, 1);
`;

const HeroContainer = styled.section`
  max-width: 50rem;
  margin: 0 auto;
  padding: 0 1rem;
`;
