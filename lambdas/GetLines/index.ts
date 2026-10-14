//
import axios, { AxiosError, query } from "axios";
import { Context } from "aws-lambda";

export const handler = async (event: any, context: Context) => {

  try {
    const config = {
      headers: {
        "anyride-profile-data": "cama_fredericton"
      },
      query: {
        _: 1771900730665,
      }
    }

    const response = await axios.get(
      'https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api/GetLines', 
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
    if (error instanceof AxiosError) {
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
