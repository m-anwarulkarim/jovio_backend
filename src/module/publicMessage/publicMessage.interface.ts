export type TCreateVisitorMessagePayload = {
  text: string;
};

export type TCreateAdminReplyPayload = {
  visitorId: string;
  text: string;
};

export type TPublicMessageQuery = {
  page?: string;
  limit?: string;
};
