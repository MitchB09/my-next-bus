import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux"

import { App } from "./App"
import { store } from "./app/store"
import "./index.css"
import oidcConfig from "./oidcConfig";

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <AuthProvider {...oidcConfig}>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
