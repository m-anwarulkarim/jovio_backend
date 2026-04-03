export type TCreateProjectUpdatePayload = {
  projectId: string;
  progress?: number;
  note: string;
  issue?: string;
};

export type TGetProjectUpdatesQuery = {
  projectId?: string;
};
