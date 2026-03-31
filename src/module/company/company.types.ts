export type TCreateCompanyPayload = {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
};

export type TUpdateCompanyPayload = {
  name?: string;
  slug?: string;
  description?: string;
  logo?: string;
  website?: string;
};

export type TGetCompaniesQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  isVerified?: string;
  isActive?: string;
};
