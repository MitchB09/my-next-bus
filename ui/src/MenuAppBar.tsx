import { type JSX } from "react"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"


export const MenuAppBar = (): JSX.Element => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Next Bus
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
