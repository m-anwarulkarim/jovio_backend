export type TCreateAttachmentPayload = {
  type?: "IMAGE" | "FILE" | "LINK";
  url?: string;
  publicId?: string;
  originalName?: string;
  mimeType?: string;
  size?: number;
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
