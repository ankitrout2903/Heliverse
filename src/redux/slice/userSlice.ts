import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types/userData';

interface UserState {
  searchQuery: string;
  filters: { domain: string; gender: string; availability: string };
  users: UserData[];
  selectedUsers: UserData[];
  currentPage: number;
}

const initialState: UserState = {
  searchQuery: '',
  filters: { domain: '', gender: '', availability: '' },
  users: [],
  selectedUsers: [],
  currentPage: 1,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        domain: string;
        gender: string;
        availability: string;
      }>
    ) => {
      state.filters = action.payload;
    },
    addSelectedUser: (state, action: PayloadAction<UserData>) => {
      state.selectedUsers.push(action.payload);
    },
    removeSelectedUser: (state, action: PayloadAction<number>) => {
      state.selectedUsers = state.selectedUsers.filter(
        (user) => user.id !== action.payload
      );
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserData[]>) => {
      state.users = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setFilters,
  addSelectedUser,
  removeSelectedUser,
  setPage,
  setUsers,
} = userSlice.actions;

export default userSlice.reducer;
