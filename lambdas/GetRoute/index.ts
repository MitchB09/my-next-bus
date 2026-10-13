//
import axios, { AxiosError } from "axios";
import { Context } from "aws-lambda";

class ValidationError extends Error {
  constructor(message: any, options = {}) {
    // 1. Pass the message to the native Error constructor
    super(message);
  }
}

export const handler = async (event: any, context: Context) => {

  try {
    if (!event.multiValueQueryStringParameters || !event.multiValueQueryStringParameters.fromStop) {
      throw new ValidationError("fromStop parameter not provided")
    }
    if (!event.multiValueQueryStringParameters.lineId) {
      throw new ValidationError("lineId parameter not provided")
    }

    const config = {
      headers: {
        "anyride-profile-data": "cama_fredericton"
      }
    }

    const payload = {
      query: {
          toStopAreaName: "",
          directionId: 0,
          fromStopAreaQuery: event.multiValueQueryStringParameters.fromStop,
          lineId: event.multiValueQueryStringParameters.lineId,
      }
    }

    const response = await axios.post(
      'https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api/GetCalls', 
      payload,
      config,
    );

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(response.data),
      isBase64Encoded: false,
    };
  } catch (error: any) {
    console.dir({
      message: 'An error occurred when retrieving route data',
      error
    })

    let statusCode;
    let errorMsg;
    if (error instanceof ValidationError) {
      statusCode = 400;
      errorMsg = error.message;
    } else if (error instanceof AxiosError) {
      statusCode = error.status;
      errorMsg = error.message
    } else {
      statusCode = 500;
      errorMsg = 'An unspecified error occured';
    }
    return {
      statusCode,
        body: JSON.stringify({
        Error: errorMsg,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      isBase64Encoded: false,
    };
  }
};
