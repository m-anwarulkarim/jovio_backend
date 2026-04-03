export type TCreateMessagePayload = {
  projectId?: string;
  text: string;
  type?: "TEXT" | "ISSUE" | "UPDATE" | "FEEDBACK" | "SYSTEM";
};
