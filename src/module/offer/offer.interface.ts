export type TCreateOfferPayload = {
  clientId: string;
  title: string;
  description: string;
  price: number;
  deliveryDays: number;
  revisions?: number;
  note?: string;
  expiresAt?: string;
};

export type TOfferDecisionPayload = {
  action: "ACCEPTED" | "REJECTED";
};
