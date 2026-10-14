import { describe, expect, beforeEach, it, jest } from "@jest/globals";
import axios, { AxiosError } from "axios";
import { handler } from "./index";
import { mockContext, mockEvent } from "../mocks/mocks";
import linesResponse from "../mocks/linesResponse.json";

// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Index.js", () => {
  mockedAxios.get.mockImplementation((url) => {
    switch (url) {
      case "https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api/GetLines":
        return Promise.resolve({
          data: linesResponse,
        });
      default:
        return Promise.reject(new Error("Unknown URL"));
    }
  });

  it("Returns 200 Success", async () => {
    const response = await handler(
      mockEvent,
      mockContext,
    );
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual(linesResponse);
    expect(mockedAxios.get.mock.calls.length).toEqual(1);
    const url = mockedAxios.get.mock.calls[0][0];
    expect(url).toStrictEqual(
      "https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api/GetLines",
    );

    const options = mockedAxios.get.mock.calls[0][1];
    expect(options).toStrictEqual({
      headers: {
        "anyride-profile-data": "cama_fredericton",
      },
      query: {
        _: 1771900730665
      }
    });
  });

  it("Returns status and message when Axios Error", async () => {
    const error = new AxiosError("BAD REQUEST");
    error.status = 400;
    error.message = "Bad Request response from API"


    mockedAxios.get.mockRejectedValue(error);
    const response = await handler(
      mockEvent,
      mockContext,
    );

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toStrictEqual({
      Error: "Bad Request response from API",
    });
  });

  it("Returns 500 and generic error message when unknown error", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Unknown Error"));
    const response = await handler(
      mockEvent,
      mockContext,
    );

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toStrictEqual({
      Error: "An unspecified error occured",
    });
  });
});
