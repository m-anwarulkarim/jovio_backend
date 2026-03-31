export type TCreateEmployeePayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  image?: string;
  departmentId?: string;
};

export type TUpdateEmployeePayload = {
  name?: string;
  phone?: string;
  bio?: string;
  image?: string;
  departmentId?: string | null;
  isActive?: boolean;
};

export type TGetEmployeesQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  departmentId?: string;
  isActive?: string;
};

export type TConvertExistingUserToEmployeePayload = {
  email: string;
  departmentId?: string;
};
