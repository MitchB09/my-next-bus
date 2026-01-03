import { screen } from "@testing-library/react"
import { App } from "./App"
import { renderWithProviders } from "./utils/test-utils"

describe("App", () => {
  test("App includes app banner", () => {
    renderWithProviders(<App />)

    // The app should be rendered correctly
    expect(screen.getByRole("banner")).toBeInTheDocument()
    expect(screen.getByRole("banner")).toHaveTextContent("My Next Bus")
  })

  test("App includes main content", () => {
    renderWithProviders(<App />)

    // The app should be rendered correctly
    expect(screen.getByRole("main")).toBeInTheDocument()
    expect(screen.getByRole("main")).toHaveTextContent("12N from Kingsplace")
    expect(screen.getByRole("main")).toHaveTextContent("13S from Maple/Wallace")
  })
})
