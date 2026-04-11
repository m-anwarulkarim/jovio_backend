export type TConversationType = "ADMIN_CLIENT" | "ADMIN_EMPLOYEE" | "DIRECT";

export type TCreateMessagePayload = {
  projectId?: string;
  receiverId?: string;
  text: string;
  type?: string;
  conversationType: TConversationType;
};

// নতুন type যোগ করো
export type TCreateDirectMessagePayload = {
  text: string;
  receiverId?: string;
};
