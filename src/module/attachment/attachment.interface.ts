export type TCreateAttachmentPayload = {
  type: "IMAGE" | "FILE" | "LINK";
  url: string;
  uploadedById?: string;
  messageId?: string;
  projectId?: string;
  offerId?: string;
  projectUpdateId?: string;
};

export type TGetAttachmentsQuery = {
  messageId?: string;
  projectId?: string;
  offerId?: string;
  projectUpdateId?: string;
};
