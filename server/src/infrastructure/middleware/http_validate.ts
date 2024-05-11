import Ajv from 'ajv'
import { Request, Response, NextFunction } from 'express'

import { allSchema } from '../api_schema'

export class HttpValidte {
  private _ajv: Ajv
  constructor() {
    this._ajv = new Ajv()
  }

  public middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const validate = this._ajv.compile(allSchema)
      const valid = validate(req)
      if (!valid) {
        res.status(400).json({
          message: 'Invalid request body',
          errors: validate.errors
        })
      } else {
        next()
      }
    }
  }
}
