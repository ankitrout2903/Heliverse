import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
  deviceID: string;
}

const initialState: DeviceState = {
  deviceID: localStorage.getItem('deviceID') ?? '',
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceID: (state, action: PayloadAction<string>) => {
      state.deviceID = action.payload;
    },
  },
});

export const { setDeviceID } = deviceSlice.actions;

export default deviceSlice.reducer;
