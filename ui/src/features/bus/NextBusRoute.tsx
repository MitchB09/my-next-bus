import { type JSX } from "react"

import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"
import {
  Error,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import { format, differenceInMinutes } from "date-fns"
import { useGetNextBusQuery } from "./busStopApiSlice"
import { editRoute } from "./editDialogSlice"
import { deleteRoute } from "./trackedRoutesSlice"
import type { BusRoute } from "./types"

import { useAppDispatch } from "../../app/hooks"

export type BusRouteProps = {
  route: BusRoute
}

export const NextBusRoute = (props: BusRouteProps): JSX.Element => {
  const { route } = props
  const dispatch = useAppDispatch()

  const response = useGetNextBusQuery(route, {
    pollingInterval: 60 * 1000, //Poll every 60s
    skipPollingIfUnfocused: true,
  })

  return (
    <Stack direction="column" spacing={2} useFlexGap>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{route.name}</Typography>
        <Box>
          <IconButton
            size="large"
            onClick={() => {
              dispatch(editRoute(route))
            }}
            color="inherit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => {
              dispatch(deleteRoute(route))
            }}
            color="inherit"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Backdrop
        sx={theme => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={response.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {response.error && (
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
      {response.data?.length
        ? response.data.map(run => {
            return (
              <Stack key={run.id} direction="row" spacing={1}>
                <Box>
                  {differenceInMinutes(run.departure.forecastTime, new Date())}
                  min
                </Box>
                <Box>{format(run.departure.forecastTime, "h:mm aa")}</Box>
                <Box flexGrow={1} />
                <Box>
                  {response.isFetching && (
                    <CircularProgress size="1em" color="inherit" />
                  )}
                </Box>
              </Stack>
            )
          })
        : "No Data"}
    </Stack>
  )
}
