import { type JSX } from "react"

import { Box, Paper } from "@mui/material"
import { NextBusRoute } from "./NextBusRoute"
import { trackedRoutes } from "./busroutes"

export const BusSchedule = (): JSX.Element => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        minWidth: {
          xs: "100%",
          sm: "70%",
          md: "50%",
        },
      }}
    >
      <Box
        sx={{
          lineHeight: "3em",
          borderBottom: 1,
          borderColor: "divider",
          padding: "0 0.5em",
        }}
      >
        {trackedRoutes.map(route => {
          return <NextBusRoute route={route} />
        })}
      </Box>
    </Paper>
  )
}
