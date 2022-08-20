import { buildSync } from "esbuild";
import { App } from "aws-cdk-lib";
import { Config } from "@config";
import { SimpleLambdaStack } from "./src/stack";

import path from "node:path";

buildSync({
  bundle: true,
  entryPoints: [path.resolve(__dirname, "src", "lambda", "index.ts")],
  external: ["aws-sdk"],
  format: "cjs",
  outfile: path.join(__dirname, "dist", "index.js"),
  platform: "node",
  sourcemap: true,
  target: "node16",
});

const app = new App();
new SimpleLambdaStack(app, `${Config.stack.project}`, {
  description: `${Config.stack.description}`,
  stackName: `${Config.stack.name}`,
  env: {
    region: `${Config.region}`,
  },
  tags: {
    project: `${Config.stack.project}`,
    deployedAt: `${new Date().toDateString()}`,
  },
});

app.synth();
