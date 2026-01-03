import { type JSX } from "react"

import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material"
import { Error } from "@mui/icons-material"
import { useGetNextBusQuery } from "./busStopApiSlice"
import type { BusRoute } from "./types"
import { format, differenceInMinutes } from "date-fns"

export type BusRouteProps = {
  route: BusRoute
}

export const NextBusRoute = (props: BusRouteProps): JSX.Element => {
  const { route } = props

  const response = useGetNextBusQuery(route, {
    pollingInterval: 60 * 1000, //Poll every 60s
    skipPollingIfUnfocused: true,
  })

  return (
    <Stack direction="column" spacing={2} useFlexGap>
      <Typography variant="h6">{route.name}</Typography>

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
              <Stack direction="row" spacing={1}>
                <Box>
                  {differenceInMinutes(run.departure.forecastTime, new Date())}min
                </Box>
                <Box>{format(run.departure.forecastTime, "h:mm aa")}</Box>
                <Box flexGrow={1} />
                <Box>
                  {(response.isFetching) && (
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
