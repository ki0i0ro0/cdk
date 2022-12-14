const AWS = require("aws-sdk");

let dynamodbOption = {};

if (process.env.ENV === "local") {
  dynamodbOption = {
    endpoint: "http://dynamodb:8000",
    region: "local",
    accessKeyId: "local",
    secretAccessKey: "local",
  };
}

const docClient = new AWS.DynamoDB.DocumentClient(dynamodbOption);

exports.handler = async (event) => {
  const params = {
    TableName: "samples",
  };
  const scanResult = await docClient.scan(params).promise();

  const responseBody = {
    samples: scanResult.Items,
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};
