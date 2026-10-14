import { describe, expect, beforeEach, it, jest } from "@jest/globals";
import axios, { AxiosError } from "axios";
import { handler } from "./index";
import { mockContext, mockEvent } from "../mocks/mocks";
import stopsResponse from "../mocks/stopsResponse.json";

// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Index.js", () => {
  mockedAxios.post.mockImplementation((url) => {
    switch (url) {
      case "https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api/GetStopAreas":
        return Promise.resolve({
          data: stopsResponse,
        });
      default:
        return Promise.reject(new Error("Unknown URL"));
    }
  });

  it("Returns 200 Success when item is found", async () => {
    const response = await handler(
      {
        ...mockEvent,
        queryStringParameters: {
          lineId: 100000003,
        },
      },
      mockContext,
    );
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual(stopsResponse);
    expect(mockedAxios.post.mock.calls.length).toEqual(1);
    const url = mockedAxios.post.mock.calls[0][0];
    expect(url).toStrictEqual(
      "https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api/GetStopAreas",
    );

    const payload = mockedAxios.post.mock.calls[0][1];
    expect(payload).toStrictEqual({
      body: {
        lineId: 100000003,
      },
    });

    const options = mockedAxios.post.mock.calls[0][2];
    expect(options).toStrictEqual({
      headers: {
        "anyride-profile-data": "cama_fredericton",
      },
    });
  });

  it("Returns 400 Not Found when no query params are provided ", async () => {
    const response = await handler({ ...mockEvent }, mockContext);

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toStrictEqual({
      Error: "lineId parameter not provided",
    });
  });

  it("Returns status and message when Axios Error", async () => {
    const error = new AxiosError("BAD REQUEST");
    error.status = 400;
    error.message = "Bad Request response from API"


    mockedAxios.post.mockRejectedValue(error);
    const response = await handler(
      {
        ...mockEvent,
        queryStringParameters: {
          lineId: 100000003,
        },
      },
      mockContext,
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toStrictEqual({
      Error: "Bad Request response from API",
    });
  });

  it("Returns 500 and generic error message when unknown error", async () => {
    mockedAxios.post.mockRejectedValue(new Error("Unknown Error"));
    const response = await handler(
      {
        ...mockEvent,
        queryStringParameters: {
          lineId: 100000003,
        },
      },
      mockContext,
    );

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toStrictEqual({
      Error: "An unspecified error occured",
    });
  });
});
