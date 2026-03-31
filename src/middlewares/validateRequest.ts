import { z, type ZodSchema } from "zod";
import type { NextFunction, Request, Response } from "express";

const validateRequest = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
