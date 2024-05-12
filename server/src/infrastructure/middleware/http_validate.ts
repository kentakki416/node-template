import Ajv from 'ajv'
import { Request, Response, NextFunction } from 'express'

import { allSchema, type Route } from '../api_schema'
import type { IHttpValidate } from './http_validate_interface'
import type { ILogger } from '../log/i_logger'

export class HttpValidte implements IHttpValidate {
  private _ajv: Ajv
  private _logger: ILogger
  constructor(logger: ILogger) {
    this._ajv = new Ajv()
    this._logger = logger
  }

  public middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const route: Route = `${req.method} ${req.path}` as Route
      const schema = allSchema[route]
      if (!schema) {
        this._logger.error(new Error(`schema is not defined. method:${req.method}, path:${req.path}`))
        next();
        return
      }
      const validate = this._ajv.compile(allSchema)
      const valid = validate(req)
      if (!valid) {
        this._logger.error(new Error(`Validation Error ${validate.errors}`))
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
