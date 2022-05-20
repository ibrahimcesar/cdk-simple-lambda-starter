import { Handler } from "aws-lambda";

export const handler: Handler = async event => {
  return {
    body: JSON.stringify(event.path),
    headers: {
      "X-Clacks-Overhead": "GNU Terry Pratchett",
    },
    statusCode: 200,
  };
};
