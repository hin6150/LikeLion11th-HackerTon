import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './modalSlice';
import userSlice from './userSlice';
import memberApi from './memberSlice';

const store = configureStore({
  reducer: {
    modal: modalSlice,
    user: userSlice,
    [memberApi.reducerPath]: memberApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(memberApi.middleware), // API 미들웨어를 추가합니다.
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
