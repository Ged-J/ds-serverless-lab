import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = createDynamoDBDocClient();

//develop a DELETE /movies/{movieID} endpoint that deletet a movie from the movies table. The DynamoDBDocumentClient command to delete an item is DeleteCommand

export const deleteMovieHandler: APIGatewayProxyHandlerV2 = async (event, context) => {
    const movieID = event.pathParameters?.movieID;
  
    const deleteParams = {
      TableName: "movies",
      Key: {
        "movieID": movieID
      }
    };
  
    try {
      await ddbDocClient.send(new DeleteCommand(deleteParams));
      return {
        statusCode: 204,
        body: ""
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: "Error deleting movie"
      };
    }
  };
  
  function createDynamoDBDocClient() {
    const ddbClient = new DynamoDBClient({ region: "us-west-2" });
    return DynamoDBDocumentClient.from(ddbClient);
  }
