import { screen } from "@testing-library/react"
import { setupServer } from "msw/node"
import { expect, test } from "vitest"
import { renderWithProviders } from "../../../utils/test-utils"
import { NextBusRoute } from "../NextBusRoute"
import { FROM_HOME, FROM_OFFICE } from "../busroutes"
import fromHomeResponse from "./mocks/fromHomeResponse.json"
import fromOfficeResponse from "./mocks/fromOfficeResponse.json"
import { handlers } from "./mocks/handlers"

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

describe("BusRoute Componenet", () => {
  test("Verify From Office Mocks", async () => {
    const response = await fetch(
      "https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api/GetCalls",
      {
        method: "POST",
        body: JSON.stringify({ query: { lineId: FROM_OFFICE.lineId }})
      },
    )
    await expect(response.json()).resolves.toEqual(fromOfficeResponse)
  })

    test("Verify From Home Mocks", async () => {
    const response = await fetch(
      "https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api/GetCalls",
      {
        method: "POST",
        body: JSON.stringify({ query: { lineId: FROM_HOME.lineId }})
      },
    )
    await expect(response.json()).resolves.toEqual(fromHomeResponse)
  })

  test("Has a heading of provided name", async () => {
    renderWithProviders(<NextBusRoute route={FROM_HOME} />)

    expect(await screen.findByText(new RegExp(`^${FROM_HOME.name}$`))).toBeInTheDocument()
  })
})
