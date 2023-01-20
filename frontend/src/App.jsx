import { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { themeOptions } from './theme';
import Navbar from './components/Navbar';

const App = () => {
  const theme = useMemo(() => createTheme(themeOptions), [themeOptions]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
