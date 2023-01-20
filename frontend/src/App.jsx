import { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { themeOptions } from './theme';
import Navbar from './components/Navbar';
import Home from './screens/Home';

const App = () => {
  const theme = useMemo(() => createTheme(themeOptions), [themeOptions]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
