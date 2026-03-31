export type TCreateDepartmentPayload = {
  name: string;
};

export type TUpdateDepartmentPayload = {
  name?: string;
};

export type TGetDepartmentsQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
};
