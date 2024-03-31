import pino from 'pino'

export class Logger {
  private _logger

  constructor() {
    const option = {
      level: process.env.PINO_LOG_LEVEL || 'info',
      formatters: {
        level: (label: string) => {
          return { level: label.toUpperCase() };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    }

    let targets = [];

    if (process.env.NODE_ENV === 'dev') {
      targets.push({
        target: 'pino-pretty',
      });
    } else if (process.env.NODE_ENV === 'prd') {
      targets.push({
        level: 'error',
        target: 'pino/file',
        options: { destination: `${__dirname}/error.log` },
      },
      {
        target: 'pino/file', // logs to the standard output by default
      });
    }
    
    const transport = pino.transport({ targets });
    this._logger = pino(option, transport)
    this._logger = pino({
      transport: {
        target: 'pino-pretty'
      }
    })
  }

  public getLogger() {
    return this._logger;
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


