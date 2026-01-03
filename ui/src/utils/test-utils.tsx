import type React from "react"
import type { JSX, PropsWithChildren } from "react"
import { render } from "@testing-library/react"
import type { RenderOptions } from "@testing-library/react"
import { Provider } from "react-redux"

import { makeStore } from "../app/store"
import type { AppStore, RootState } from "../app/store"

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
type ExtendedRenderOptions = {
  preloadedState?: Partial<RootState>
  store?: AppStore
} & Omit<RenderOptions, "queries">

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = makeStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
