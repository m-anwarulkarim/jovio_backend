type TAuthUser = {
  id: string;
  role?: string | null;
};

type TGetAllUsersQuery = {
  searchTerm?: string;
  role?: string;
  isActive?: string;
};

export type { TAuthUser, TGetAllUsersQuery };
