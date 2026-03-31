export type TRegisterPayload = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type TChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type TGetAllUsersQuery = {
  page?: string;
  limit?: string;
  searchTerm?: string;
  role?: string;
};
