import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import "./App.css"
import { MenuAppBar } from "./MenuAppBar"
import { BusSchedule } from "./features/bus/BusSchedule"
import { RouteDialog } from "./features/bus/RouteDialog"
import { ConfirmProvider } from "./features/confirm/"

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ConfirmProvider>
        <MenuAppBar />
        <main className="App-header">
          <BusSchedule />
          <RouteDialog />
        </main>
      </ConfirmProvider>
    </ThemeProvider>
  )
}
