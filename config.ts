import config from "./config.json";
import pkg from "./package.json";

const Config = {
  version: pkg.version,
  ...config,
};

export { Config };
