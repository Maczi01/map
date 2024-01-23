import { HttpResponse, http } from 'msw';

import { cellDetailsNTP, cellListNTP, statsNTP } from './fixturesNTP';
import { cellDetailsQoS, cellListQoS, statsQoS } from './fixturesQoS';

export const handlers = [
    http.get('/data/v1/radio/cell/list', () => {
        return HttpResponse.json(cellListNTP);
    }),
    http.get('/data/v1/radio/cell', ({ request }) => {
        const url = new URL(request.url);
        const criteria = url.searchParams.get('criteria');
        return HttpResponse.json(statsNTP(criteria ?? ''));
    }),
    http.get('/data/v1/radio/cell/latest', ({ request }) => {
        const url = new URL(request.url);
        cellDetailsNTP.cellId = url.searchParams.get('cellId') ?? 'not found';
        return HttpResponse.json(cellDetailsNTP);
    }),
    http.get('/qos/data/v1/radio/cell/list', () => {
        return HttpResponse.json(cellListQoS);
    }),
    http.get('/qos/data/v1/radio/cell/latest', ({ request }) => {
        const url = new URL(request.url);
        cellDetailsQoS.cellId = url.searchParams.get('cellId') ?? 'not found';
        return HttpResponse.json(cellDetailsQoS);
    }),
    http.get('/qos/data/v1/radio/cell', ({ request }) => {
        const url = new URL(request.url);
        const criteria = url.searchParams.get('criteria');
        return HttpResponse.json(statsQoS(criteria ?? ''));
    }),
];
