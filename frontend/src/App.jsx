import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { themeOptions } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import BookSeats from './screens/BookSeats';
import ReservationDetails from './screens/ReservationDetails';

const App = () => {
  const theme = useMemo(() => createTheme(themeOptions), [themeOptions]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/book-seats' element={<BookSeats />} />
            <Route
              path='/reservation-details/:id'
              element={<ReservationDetails />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
