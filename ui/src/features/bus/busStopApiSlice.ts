// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Line, Payload, RouteRequestData, Run, Stop } from "./types"
import { User } from "oidc-client-ts"
import oidcConfig from "../../oidcConfig"

function getUser() {
  const storageKey = `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`
  const oidcStorage = sessionStorage.getItem(storageKey)
  console.dir(storageKey)
  console.dir(oidcStorage)
  if (!oidcStorage) {
    return null
  }

  return User.fromStorageString(oidcStorage)
}

// Define a service using a base URL and expected endpoints
export const busStopApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PERSONAL_DOMAIN as string,
    prepareHeaders: headers => {
      const user = getUser()
      const token = user?.id_token
      if (!token) {
        throw new Error("No Auth Token Found")
      }
      headers.set("Authorization", `Bearer ${token}`)
      return headers
    },
  }),

  reducerPath: "busRoutesApi",
  tagTypes: ["BusLines", "BusRoutes"],

  endpoints: build => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getLines: build.query<Line[], void>({
      query: () => {
        return {
          url: `/lines`,
          method: "GET",
        }
      },
      providesTags: ["BusLines"],
    }),
    getStops: build.query<Stop[], number>({
      query: (lineId: number) => {
        return {
          url: `/stops`,
          method: "GET",
          params: {
            lineId: lineId,
          },
        }
      },
      providesTags: ["BusLines"],
    }),
    getNextBus: build.query<Run[], RouteRequestData>({
      query: (request: RouteRequestData) => {
        return {
          url: `/route`,
          method: "GET",
          params: {
            query: {
              fromStopAreaQuery: request.fromStop,
              lineId: request.line?.id,
            },
            configuration: { grouping: ["Line", "Destination1"] },
          },
        }
      },
      transformResponse: (
        response: Payload,
        _,
        request: RouteRequestData,
      ): Run[] => {
        return response.calls.length
          ? response.calls
              .filter(call =>
                call.id.includes(`l:${request.line?.id.toString() ?? ""}/`),
              )
              .flatMap(route => route.calls)
          : []
      },
      providesTags: ["BusRoutes"],
    }),
  }),
})

export const { useGetLinesQuery, useGetNextBusQuery, useGetStopsQuery } =
  busStopApiSlice
