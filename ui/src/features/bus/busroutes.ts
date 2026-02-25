import type { BusRoute } from "./types"

export const FROM_OFFICE: BusRoute = {
  id: 'FROM_OFFICE',
  name: '12N from Kingsplace',
  fromStop: 'Kings Place (1000)',
  line: {
    id: 100000003,
    text: '12N'
  }
}

export const FROM_HOME: BusRoute = {
  id: 'FROM_HOME',
  name: '13S from Maple/Wallace',
  fromStop: 'Maple and/et Wallace (1036)',
  line: {
    id: 100000004,
    text: '13S'
  }
}

export const trackedRoutes: BusRoute[] = [
  FROM_OFFICE,
  FROM_HOME
]


