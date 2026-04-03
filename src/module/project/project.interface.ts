export type TAssignEmployeePayload = {
  assignedEmployeeId: string;
};

export type TChangeProjectStatusPayload = {
  status:
    | "NEW"
    | "UNDER_REVIEW"
    | "ASSIGNED"
    | "IN_PROGRESS"
    | "WAITING_FOR_CLIENT"
    | "REVIEW"
    | "COMPLETED"
    | "ON_HOLD"
    | "CANCELLED";
};

export type TGetProjectsQuery = {
  status?: string;
  searchTerm?: string;
};
