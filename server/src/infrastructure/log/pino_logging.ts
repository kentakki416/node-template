import * as moment from 'moment-timezone'
import pino from 'pino'

import type { ILogger } from './i_logger'

export class PinoLogger implements ILogger {
  private _logger: pino.Logger

  constructor() {
    const level = process.env.PINO_LOG_LEVEL || 'debug'
    const targets = this._getTargets()
    const option: pino.LoggerOptions = {
      level,
      timestamp: () => `,"time":"${moment().tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')}"`,
      transport: {
        targets
      }
    }
    const formatters = {
      level: (label: string): {level: string} => {
        return { level: label.toUpperCase() }
      },
    }
    // インスタンス化
    this._logger = pino(option).child({ formatters })
  }

  private _getTargets() {
    const env = process.env.NODE_ENV
    if (env === 'dev') {
      return [{
        target: 'pino-pretty',
      }]
    } else if (env === 'prd') {
      return [
        {
          level: 'error',
          target: 'pino/file',
          options: { destination: `${__dirname}/error.log`, mkdir: true },
        },
        {
          target: 'pino/file', // logs to the standard output by default
        }
      ]
    }
    return []
  }

  public getLogger(): pino.Logger<never> {
    return this._logger
  }

  public debug(message: string): void {
    this._logger.debug(message)
  }

  public info(message: string): void {
    this._logger.info(message)
  }

  public warn(message: string): void {
    this._logger.warn(message)
  }

  public error(err: Error): void {
    this._logger.error(err)
  }
}

