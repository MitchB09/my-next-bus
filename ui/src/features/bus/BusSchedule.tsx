import { type JSX } from "react"

import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import { NextBusRoute } from "./NextBusRoute"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectRoutes } from "./trackedRoutesSlice"
import { createNewRoute } from "./editDialogSlice"

export const BusSchedule = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const routes = useAppSelector(selectRoutes)

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
        {routes.length ? (
          routes.map(route => {
            return <NextBusRoute key={route.name} route={route} />
          })
        ) : (
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{
              padding: '2em'

            }}
          >
            <Typography variant="body1">
              Click here to add a new route to track. Once a route is tracked it will be saved in your browser  
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(createNewRoute())
              }}
            >
              Add a route
            </Button>
          </Stack>
        )}
      </Box>
    </Paper>
  )
}
