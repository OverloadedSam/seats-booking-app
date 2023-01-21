import { createSlice } from '@reduxjs/toolkit';
import { generateUsername } from 'unique-username-generator';

let userName = localStorage.getItem('userName');
if (!userName) {
  userName = generateUsername(' ').toLocaleUpperCase();
  localStorage.setItem('userName', userName);
}

const initialAuthState = {
  userName: userName,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    // Set user as this app does not have login functionality.
    setUser: (auth) => {
      userName = generateUsername(' ').toLocaleUpperCase();
      localStorage.setItem('userName', userName);
      auth.userName = userName;
    },
  },
});

export default authSlice.reducer;

export const { setUser } = authSlice.actions;

/* SELECTORS */
export const selectLoggedInUser = (state) => state.auth?.userName;
