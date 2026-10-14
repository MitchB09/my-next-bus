import { screen } from "@testing-library/react"
import { App } from "./App"
import { renderWithProviders } from "./utils/test-utils"
import { trackedRoutes } from "./features/bus/busroutes"
import { useAuth } from "react-oidc-context"

const mockUser = {
  session_state: null,
  access_token: "",
  token_type: "",
  profile: {
    sub: "testUserId",
    iss: "",
    aud: "",
    exp: 0,
    iat: 0,
  },
  state: undefined,
  expires_in: undefined,
  expired: undefined,
  scopes: [],
  toStorageString: function (): string {
    throw new Error("Function not implemented.")
  },
}

vi.mock("react-oidc-context", () => ({
  useAuth: vi.fn(),
}))

describe("App", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test("App includes app banner", () => {
    vi.mocked(useAuth, { partial: true }).mockResolvedValue({
      isLoading: false,
      isAuthenticated: true,
      user: mockUser,
    })
    renderWithProviders(<App />, {
      preloadedState: {
        trackedRoutes: {
          routes: trackedRoutes,
        },
      },
    })

    // The app should be rendered correctly
    expect(screen.getByRole("banner")).toBeInTheDocument()
    expect(screen.getByRole("banner")).toHaveTextContent("My Next Bus")
  })

  test("App includes main content", () => {
    vi.mocked(useAuth, { partial: true }).mockResolvedValue({
      isLoading: false,
      isAuthenticated: true,
      user: mockUser,
    })
    renderWithProviders(<App />, {
      preloadedState: {
        trackedRoutes: {
          routes: trackedRoutes,
        },
      },
    })

    // The app should be rendered correctly
    expect(screen.getByRole("main")).toBeInTheDocument()
    //expect(screen.getByRole("main")).toHaveTextContent("12N from Kingsplace")
    //expect(screen.getByRole("main")).toHaveTextContent("13S from Maple/Wallace")
  })
})
