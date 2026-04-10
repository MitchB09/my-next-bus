import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "../../app/store"
import type { BusRoute } from "./types"
import { saveRoute as saveTrackedRoute } from "./trackedRoutesSlice"

type BusRouteForm = {
  nameEdited: boolean
} & BusRoute

type EditDialogState = {
  form?: BusRouteForm
  open: boolean
  editing: boolean
}

export const saveRoute = createAsyncThunk<
  BusRoute,
  undefined,
  { state: RootState; dispatch: AppDispatch }
>("editDialog/saveRoute", (_, { dispatch, getState }) => {
  const form = getState().editDialog.form
  if (!form) {
    throw new Error("")
  }

  dispatch(saveTrackedRoute(form))
  return form
})

export const editDialogSlice = createSlice({
  name: "editDialog",
  initialState: {
    open: false,
    editing: false,
  } as EditDialogState,
  reducers: {
    createNewRoute: state => {
      state.open = true
      state.editing = false
    },
    editRoute: (state, { payload: route }: PayloadAction<BusRoute>) => {
      state.open = true
      state.editing = true
      state.form = { ...route, nameEdited: true }
    },
    cancel: state => {
      state.open = false
      state.editing = false
      state.form = undefined
    },
    setRoute: (state, { payload: route }: PayloadAction<BusRouteForm>) => {
      if (state.form && route.name !== state.form.name) {
        state.form.nameEdited = true
      }
      if (!state.form?.nameEdited) {
        route.name = `${route.line?.text ?? ""} from ${route.fromStop ?? ""}`
      }
      state.form = route
    },
  },
  extraReducers: builder => {
    builder
      .addCase(saveRoute.fulfilled, state => {
        state.open = false
        state.form = undefined
        state.editing = false
      })
      .addCase(saveRoute.rejected, payload => {
        console.dir(payload)
      })
  },
})

export const { cancel, createNewRoute, editRoute, setRoute } =
  editDialogSlice.actions

export default editDialogSlice.reducer

export const selectOpen = (state: RootState) => state.editDialog.open
export const selectEditing = (state: RootState) => state.editDialog.editing

export const selectForm = (state: RootState): BusRouteForm => {
  if (!state.editDialog.form) {
    return {
      id: "-1",
      name: "",
      lineId: 100000003,
      nameEdited: false,
    } as BusRouteForm
  }
  return state.editDialog.form
}
