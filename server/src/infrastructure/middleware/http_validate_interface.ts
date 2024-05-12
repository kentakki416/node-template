import type { Request, Response, NextFunction } from 'express'

export interface IHttpValidate {
  middleware(): (req: Request, res: Response, next: NextFunction) => void
}
