/* eslint-disable no-console */
import type { ILogger } from './i_logger'

export class ConsoleLogger implements ILogger {

  debug(message: string): void {
    console.debug(`DEBUG: ${message}`)
  }

  info(message: string): void {
    console.info(`INFO: ${message}`)
  }

  warn(message: string): void {
    console.warn(`WARN: ${message}`)
  }

  error(err: Error): void {
    console.error(`ERROR: ${err.message}`)
  }

}
