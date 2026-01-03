import { screen } from "@testing-library/react"
import { setupServer } from "msw/node"
import { expect, test } from "vitest"
import { renderWithProviders } from "../../../utils/test-utils"
import { BusSchedule } from "../BusSchedule"
import { handlers } from "./mocks/handlers"
import { FROM_HOME, FROM_OFFICE } from "../busroutes"

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

describe("BusSchedule Componenet", () => {
  test("Includes Two Schedule Entries", async () => {
    renderWithProviders(<BusSchedule />)

    expect(
      await screen.findByText(new RegExp(`^${FROM_HOME.name}$`)),
    ).toBeInTheDocument()
    expect(
      await screen.findByText(new RegExp(`^${FROM_OFFICE.name}$`)),
    ).toBeInTheDocument()
  })
})
