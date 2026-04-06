export type TConversationType = "ADMIN_CLIENT" | "ADMIN_EMPLOYEE";

export type TCreateMessagePayload = {
  projectId: string;
  conversationType: TConversationType;
  text: string;
  type?: "TEXT" | "ISSUE" | "UPDATE" | "FEEDBACK" | "SYSTEM";
};

export type TGetMessagesQuery = {
  projectId: string;
  conversationType: TConversationType;
};
