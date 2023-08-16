import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type InitialState = {
  user: string;
  accessToken: string | null;
};

/**
 * user: UserName
 * accessToken: JWT TOKEN
 */
const initialState: InitialState = {
  user: '',
  accessToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      const { user, accessToken } = actions.payload;
      return { ...state, user, accessToken };
    },
    logout: () => {
      return { user: '', accessToken: null };
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state: RootState): InitialState => state.user;

export default userSlice.reducer;
