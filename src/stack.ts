import { Construct } from "constructs";
import { Config } from "@config";
import { Stack, StackProps, Tags } from "aws-cdk-lib";

import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";

import path from "node:path";

class SimpleLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, `${Config.apiName}`, {
      architecture: lambda.Architecture.ARM_64,
      code: lambda.Code.fromAsset(path.join(__dirname, "..", "dist")),
      description: `${Config.apiDescription}`,
      handler: "index.simple",
      runtime: lambda.Runtime.NODEJS_16_X,
      tracing: lambda.Tracing.ACTIVE,
    });

    Tags.of(fn).add("version", Config.version);

    const endpoint = new apigw.LambdaRestApi(this, `ApiGw${Config.apiName}`, {
      handler: fn,
      proxy: false,
      restApiName: `Api${Config.apiName}`,
    });

    new apigw.Method(this, `GET`, {
      httpMethod: "GET",
      resource: endpoint.root,
    });

    Config.tags.forEach(tag => {
      Tags.of(this).add(tag.key, tag.value);
      Tags.of(fn).add(tag.key, tag.value);
      Tags.of(endpoint).add(tag.key, tag.value);
    });
  }
}

export { SimpleLambdaStack };
