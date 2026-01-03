import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import "./App.css"
import { MenuAppBar } from "./MenuAppBar"
import { BusSchedule } from "./features/bus/BusSchedule"

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MenuAppBar />
      <main className="App-header">
        <BusSchedule />
      </main>
    </ThemeProvider>
  )
}
