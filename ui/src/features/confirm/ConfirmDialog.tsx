import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import type { ConfirmOptions } from "./ConfirmProvider"

export type ConfirmProps = {
  close: (result: boolean) => void
 } & ConfirmOptions

export const ConfirmDialog = (props: ConfirmProps) => {
  const { title, content, confirmText, close} = props;

  return (
    <Dialog open={true} fullWidth>
      <DialogTitle>{title ?? "Confirm"}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            close(false)
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            close(true)
          }}
        >
          {confirmText ?? "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
