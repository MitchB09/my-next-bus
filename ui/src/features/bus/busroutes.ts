import type { BusRoute } from "./types"

export const FROM_OFFICE: BusRoute = {
  name: '12N from Kingsplace',
  fromStop: 'Kings Place (1000)',
  lineId: 100000003
}

export const FROM_HOME: BusRoute = {
  name: '13S from Maple/Wallace',
  fromStop: 'Maple and/et Wallace (1036)',
  lineId: 100000004
}

export const trackedRoutes: BusRoute[] = [
  FROM_OFFICE,
  FROM_HOME
]


