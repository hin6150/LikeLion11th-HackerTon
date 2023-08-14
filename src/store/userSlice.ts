import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type InitialState = {
  user: string;
  accessToken: string;
  refreshToken: string;
};

/**
 * user: UserName
 * token: JWT TOKEN
 */
const initialState: InitialState = {
  user: '',
  accessToken: '',
  refreshToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      const { user, accessToken, refreshToken } = actions.payload;
      return { ...state, user, accessToken, refreshToken };
    },
    logout: () => {
      return { user: '', accessToken: '', refreshToken: '' };
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state: RootState): InitialState => state.user;

export default userSlice.reducer;
