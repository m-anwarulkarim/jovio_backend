import type { Session } from "better-auth";

type TAuthUser = {
  id: string;
  name: string;
  email: string | null;
  emailVerified: boolean;
  image?: string | null;
  role?: string | null;
  phone?: string | null;
  bio?: string | null;
};

declare global {
  namespace Express {
    interface Request {
      user?: TAuthUser;
      session?: Session;
    }
  }
}

export {};
