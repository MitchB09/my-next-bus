import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { v4 as uuidv4 } from "uuid"
import type { RootState } from "../../app/store"
import type { BusRoute } from "./types"

const data = JSON.parse(Cookies.get("routes") ?? "[]") as BusRoute[]

type TrackedRoutesState = {
  routes: BusRoute[]
}

export const trackedRoutesSlice = createSlice({
  name: "trackedRoutes",
  initialState: { routes: data } as TrackedRoutesState,
  reducers: {
    saveRoute: (state, { payload: route }: PayloadAction<BusRoute>) => {
      const routes = [...state.routes]

      if (route.id === "-1") {
        route = {
          ...route,
          id: uuidv4(),
        }

        routes.push(route)
      } else {
        const idx = routes.findIndex(r => {
          return r.id == route.id
        })
        if (idx === -1) {
          throw new Error("No route with matching ID found")
        }
        routes[idx] = route
      }

      state.routes = routes
      Cookies.set("routes", JSON.stringify(routes))
    },
    deleteRoute: (state, { payload: route }: PayloadAction<BusRoute>) => {
      const routes = [...state.routes]

      const idx = routes.findIndex(r => {
        return r.id == route.id
      })
      if (idx === -1) {
        throw new Error("No route with matching ID found")
      }

      routes.splice(idx, 1)

      state.routes = routes
      Cookies.set("routes", JSON.stringify(routes))
    },
    clearSavedData: state => {
      state.routes = []
      Cookies.remove("routes")
    },
  },
})

export const { saveRoute, deleteRoute, clearSavedData } =
  trackedRoutesSlice.actions

export default trackedRoutesSlice.reducer

export const selectRoutes = (state: RootState) => state.trackedRoutes.routes
