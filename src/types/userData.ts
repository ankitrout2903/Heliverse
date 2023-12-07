export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  domain: string;
  available: boolean;
}

export interface DeviceState {
  deviceID: string;
}

export interface RootState {
  user: {
    searchQuery: string;
    filters: { domain: string; gender: string; availability: string };
    selectedUsers: UserData[];
    users: UserData[];
    currentPage: number;
  };
  device: DeviceState;
}
