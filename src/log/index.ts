import chalk from "chalk";

const createPrefixedLogger = (prefix: string) =>
  console.log.bind(console, chalk.black.bgYellow(prefix));

const infoLogger = createPrefixedLogger("INFO: ");

export const log = (message: string) => infoLogger(message);
