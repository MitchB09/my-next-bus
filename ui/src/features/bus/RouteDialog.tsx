import { type JSX } from "react"

import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { Error } from "@mui/icons-material"
import { useGetLinesQuery, useGetStopsQuery } from "./busStopApiSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  cancel,
  saveRoute,
  selectEditing,
  selectForm,
  selectOpen,
  setRoute,
} from "./editDialogSlice"

export const RouteDialog = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectOpen)
  const editing = useAppSelector(selectEditing)
  const form = useAppSelector(selectForm)

  const linesResponse = useGetLinesQuery()
  const stopsResponse = useGetStopsQuery(form.line?.id ?? 0)

  return (
    <Dialog open={open}>
      <DialogTitle>{editing ? "Edit Route" : "Add Route"}</DialogTitle>
      <DialogContent>
        <Backdrop
          sx={theme => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={linesResponse.isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {linesResponse.error && (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <Error />
            <Typography sx={{ fontStyle: "italic" }}>Error</Typography>
          </Stack>
        )}
        <FormGroup>
          <FormControl fullWidth size="small" sx={{ padding: "6px 0px" }}>
            <Select
              value={form.line?.id ?? 0}
              size="small"
              name="type"
              displayEmpty
              onChange={e => {
                const line = linesResponse.data?.find(
                  l => l.id === e.target.value,
                )
                dispatch(
                  setRoute({
                    ...form,
                    line: line,
                  }),
                )
              }}
            >
              {!editing && <MenuItem value={0}>Select Bus Route</MenuItem>}
              {linesResponse.data?.map(line => {
                return <MenuItem value={line.id}>{line.text}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ padding: "6px 0px" }}>
            <Select
              value={form.fromStop ?? ""}
              size="small"
              name="type"
              displayEmpty
              error={stopsResponse.error != undefined}
              disabled={form.line?.id == undefined}
              onChange={e => {
                dispatch(
                  setRoute({
                    ...form,
                    fromStop: e.target.value,
                  }),
                )
              }}
            >
              {!editing && <MenuItem value={""}>Select Stop</MenuItem>}
              {stopsResponse.data?.map(stop => {
                return <MenuItem value={stop.text}>{stop.text}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ padding: "6px 0px" }}>
            <TextField
              value={form.name}
              size="small"
              name="type"
              onChange={e => {
                dispatch(
                  setRoute({
                    ...form,
                    name: e.target.value,
                  }),
                )
              }}
            />
          </FormControl>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(cancel())}>Cancel</Button>
        <Button
          onClick={() => {
            void dispatch(saveRoute())
          }}
        >
          {editing ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
