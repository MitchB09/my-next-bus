// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Payload, RouteRequestData, Run } from "./types"

// Define a service using a base URL and expected endpoints
export const busStopApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api",
  }),

  reducerPath: "busRoutesApi",
  tagTypes: ["BusRoutes"],

  endpoints: build => ({
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
              lineId: request.lineId,
            },
            configuration: { grouping: ["Line", "Destination1"] },
          },
        }
      },
      transformResponse: (response: Payload, _, request: RouteRequestData): Run[] => {
        return response.calls.length
          ? response.calls.filter(
              call => call.id.includes(`l:${request.lineId.toString()}/`),
            ).flatMap(route => route.calls)
          : []
      },
      providesTags: ["BusRoutes"],
    }),
  }),
})

export const { useGetNextBusQuery } = busStopApiSlice
