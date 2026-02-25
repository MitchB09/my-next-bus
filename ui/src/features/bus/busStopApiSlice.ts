// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Line, Payload, RouteRequestData, Run, Stop } from "./types"

// Define a service using a base URL and expected endpoints
export const busStopApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api",
    headers: {
      "anyride-profile-data": "cama_fredericton"
    }
  }),

  reducerPath: "busRoutesApi",
  tagTypes: ["BusLines", "BusRoutes"],

  endpoints: build => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getLines: build.query<Line[], void>({
      query: () => {
        return {
          url: `/GetLines`,
          method: "GET",
          params: {
            "_": 1771900730665
          }
        }
      },
      providesTags: ["BusLines"],
    }),
    getStops: build.query<Stop[], number>({
      query: (lineId: number) => {
        return {
          url: `/GetStopAreas`,
          method: "POST",
          body: {
            lineId
          }
        }
      },
      providesTags: ["BusLines"],
    }),
    getNextBus: build.query<Run[], RouteRequestData>({
      query: (request: RouteRequestData) => {
        return {
          url: `/GetCalls`,
          method: "POST",
          body: {
            query: {
              toStopAreaName: "",
              directionId: 0,
              fromStopAreaQuery: request.fromStop,
              lineId: request.line?.id,
            },
            configuration: { grouping: ["Line", "Destination1"] },
          },
        }
      },
      transformResponse: (response: Payload, _, request: RouteRequestData): Run[] => {
        return response.calls.length
          ? response.calls.filter(
              call => call.id.includes(`l:${request.line?.id.toString() ?? ''}/`),
            ).flatMap(route => route.calls)
          : []
      },
      providesTags: ["BusRoutes"],
    }),
  }),
})

export const { useGetLinesQuery, useGetNextBusQuery, useGetStopsQuery } = busStopApiSlice
