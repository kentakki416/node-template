export interface ILogger {
  debug(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(err: Error): void;
}
