import { http, HttpResponse } from 'msw'
import fromHomeResponse from './fromHomeResponse.json'
import fromOfficeResponse from './fromOfficeResponse.json'
import type { RouteRequestData } from '../../types';
import { FROM_OFFICE, FROM_HOME } from '../../busroutes'
 
export const handlers = [
  http.post('https://myride.fredericton.ca/Tmix.Cap.Ti.Process.AnyRide/api/GetCalls', async ({ request }) => {
    
    const data = await request.json() as unknown as Record<string, unknown>;
    const query = data.query as RouteRequestData;

    switch (query.lineId) {
      case FROM_HOME.lineId:
         return HttpResponse.json(fromHomeResponse);
      case FROM_OFFICE.lineId:
        return HttpResponse.json(fromOfficeResponse);
      default:
        throw new Error('Unknown lineId provided')
    }
  }),
]