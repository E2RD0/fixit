class Logger {
  info(message: string, ...args: unknown[]): void {
    console.log(`[INFO] [${new Date().toISOString()}]: ${message}`, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(`[ERROR] [${new Date().toISOString()}]: ${message}`, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] [${new Date().toISOString()}]: ${message}`, ...args);
  }
}

export default new Logger();
