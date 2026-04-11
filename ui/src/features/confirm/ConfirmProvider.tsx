import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react"

import { ConfirmDialog } from "./ConfirmDialog"

export type ConfirmOptions = {
  content: string | ReactNode
  title?: string
  confirmText?: string
}

type ConfirmFunction = (options: ConfirmOptions) => Promise<boolean>

export const ConfirmContext = createContext<ConfirmFunction | null>(null)

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const resolver = useRef<(value: boolean) => void>(() => false)

  const confirm: ConfirmFunction = opts => {
    setOptions(opts)
    return new Promise<boolean>(resolve => {
      resolver.current = resolve
    })
  }

  const close = (result: boolean) => {
    setOptions(null)
    resolver.current(result)
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {options && (
        <ConfirmDialog
          close={close}
          content={options.content}
          title={options.title}
          confirmText={options.confirmText}
        />
      )}
    </ConfirmContext.Provider>
  )
}

export const useConfirm = () => {
  const context = useContext(ConfirmContext)
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider")
  }
  return context
}
