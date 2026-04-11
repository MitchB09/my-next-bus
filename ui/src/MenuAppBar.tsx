import { type JSX } from "react"

import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { AppBar, Toolbar, Typography } from "@mui/material"
import { IconButton } from "@mui/material"
import { useAppDispatch } from "./app/hooks"
import { createNewRoute } from "./features/bus/editDialogSlice"
import { clearSavedData } from "./features/bus/trackedRoutesSlice"
import { useConfirm } from "./features/confirm/"

export const MenuAppBar = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const confirm = useConfirm()
  const handleDelete = async () => {
    const ok = await confirm({
      title: "Clear Routes",
      content:
        "Are you sure you want to delete all tracked routes?",
      confirmText: "Delete",
    })

    if (ok) {
      dispatch(clearSavedData())
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Next Bus
        </Typography>
        <IconButton
          size="large"
          onClick={() => {
            dispatch(createNewRoute())
          }}
          color="inherit"
        >
          <AddIcon />
        </IconButton>
        <IconButton
          size="large"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleDelete}
          color="inherit"
        >
          <DeleteIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
