import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

const validateQuery = (schema: ZodTypeAny) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateQuery;
