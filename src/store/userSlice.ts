import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type InitialState = {
  user: string;
  token: string;
};

/**
 * user: UserName
 * token: JWT TOKEN
 */
const initialState: InitialState = {
  user: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      const { user, token } = actions.payload;
      return { ...state, user, token };
    },
    logout: () => {
      return { user: '', token: '' };
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state: RootState): InitialState => state.user;

export default userSlice.reducer;
