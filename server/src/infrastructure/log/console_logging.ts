/* eslint-disable no-console, @typescript-eslint/no-unused-vars  */
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

  error(_err: Error): void {
    return
  }

}
