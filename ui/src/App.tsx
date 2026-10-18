import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import "./App.css"
import { useAppSelector } from "./app/hooks"
import { MenuAppBar } from "./MenuAppBar"
import { BusSchedule } from "./features/bus/BusSchedule"
import { RouteDialog } from "./features/bus/RouteDialog"
import { ConfirmProvider } from "./features/confirm/"
import {
  selectOpen,
} from "./features/bus/editDialogSlice"

import { useAuth } from "react-oidc-context"
import { Backdrop, Box, Button, CircularProgress, Paper } from "@mui/material"

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export const App = () => {
  const auth = useAuth()
  const open = useAppSelector(selectOpen)

  const loginPanel = () => {
    let loading = false
    let message
    switch (auth.activeNavigator) {
      case "signinSilent":
        message = "Signing you in..."
        loading = true
        break
      case "signoutRedirect":
        message = "Signing you out..."
        loading = true
        break
    }

    if (auth.isLoading) {
      message = "Loading..."
      loading = true
    }

    if (auth.error) {
      return (
        <div>
          Oops... {auth.error.source} caused {auth.error.message}
        </div>
      )
    }

    if (loading) {
      return (
        <Backdrop
          sx={theme => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
          <div>{message}</div>
        </Backdrop>
      )
    }

    return <Button onClick={() => void auth.signinRedirect()}>Log in</Button>
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ConfirmProvider>
        <MenuAppBar />
        <main className="App-header">
          {auth.isAuthenticated ? (
            <>
              <BusSchedule />
              {open && <RouteDialog />}
            </>
          ) : (
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
                {loginPanel()}
              </Box>
            </Paper>
          )}
        </main>
      </ConfirmProvider>
    </ThemeProvider>
  )
}
