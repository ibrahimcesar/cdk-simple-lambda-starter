import { APIGatewayEvent, Handler } from "aws-lambda";
import { Config } from "@config";

export const handler: Handler = async (event: APIGatewayEvent) => {
  return {
    body: `Hello lambda!

      ${JSON.stringify(event, null, 2)}"

    `,
    headers: Config.headers,
    statusCode: 200,
  };
};
