import { Equalizer } from '@mui/icons-material';
import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '../layouts/MainLayout';
import { NTPChart } from '../pages/NTPChart';
import { NTPMap } from '../pages/NTPMap';
import { QoSChart } from '../pages/QoSChart';
import { QoSMap } from '../pages/QoSMap';
import { Route } from '../types/Route';
import { NotFound } from './NotFound';
import { ROUTE } from './routes';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line ordered-imports/ordered-imports
import NTP from '../../assets/ntp.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line ordered-imports/ordered-imports
import QoS from '../../assets/qosp.svg?react';

export const authorizedRoutes: Route[] = [
    {
        path: ROUTE.MAIN,
        element: <NTPMap />,
        icon: <NTP />,
        title: 'NTP rApp',
    },
    {
        path: ROUTE.QoS_MAP,
        element: <QoSMap />,
        icon: <QoS />,
        title: 'QoS rApp',
    },
    {
        path: `${ROUTE.NTP_GRAPH}/:cellId`,
        element: <NTPChart />,
        icon: <Equalizer />,
        title: 'NTP Graph',
    },
    {
        path: `${ROUTE.QoS_GRAPH}/:cellId`,
        element: <QoSChart />,
        icon: <Equalizer />,
        title: 'QoS Graph',
    },
];

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: authorizedRoutes,
    },
]);
