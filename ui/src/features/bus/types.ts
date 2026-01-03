


export type BusRoute = {
  name: string,
} & RouteRequestData;

export type RouteRequestData = {
  name: string,
  fromStop: string,
  lineId: number
}

export type Payload = {
  isStopCancelled: boolean
  calls: Route[]
  messages: string[]
}

export type Route = {
  id: string
  calls: Run[]
}

export type Run = {
  id: string
  key: string
  lineId: number
  routeId: number
  journeyId: number
  stopPointId: number
  sequenceNumber: number
  line: string
  journey: string
  destination: string
  subdestination: string
  departure: Departure
}

export type Departure = {
  journeyType: string
  forecastTime: Date
  plannedTime: Date
  quality: string
  attributes: string[]
  designation: string
}
