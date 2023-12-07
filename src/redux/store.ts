import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import deviceReducer from './slice/deviceSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
  },
});

export default store;
