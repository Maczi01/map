import { ThemeProvider } from '@mui/material';
import type { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { cellListNTP } from '../../../mocks/fixturesNTP';
import { theme } from '../../../styles/theme';
import { RadioCellList } from './RadioCellList';

const meta = {
    title: 'pages/Geomap/RadioCellList',
    component: RadioCellList,
} satisfies Meta<typeof RadioCellList>;

export default meta;

export const _ListWithData = () => (
    <MemoryRouter initialEntries={['/']}>
        <ThemeProvider theme={theme}>
            <RadioCellList
                radioCellsList={cellListNTP.radioCells}
                selectedRadioCell={''}
                setSelectedRadioCell={() => {
                    // eslint-disable-next-line no-console
                    console.log('setSelectedRadioCell');
                }}
                isError={false}
                isFetching={false}
                isLoading={false}
                refetch={() => {
                    // eslint-disable-next-line no-console
                    console.log('setSelectedRadioCell');
                }}
                redirectLink={''}
            />
        </ThemeProvider>
    </MemoryRouter>
);

export const _ListWithEmpty = () => (
    <MemoryRouter initialEntries={['/']}>
        <ThemeProvider theme={theme}>
            <RadioCellList
                radioCellsList={[]}
                selectedRadioCell={''}
                setSelectedRadioCell={() => {
                    // eslint-disable-next-line no-console
                    console.log('setSelectedRadioCell');
                }}
                isError={false}
                isFetching={false}
                isLoading={false}
                refetch={() => {
                    // eslint-disable-next-line no-console
                    console.log('setSelectedRadioCell');
                }}
                redirectLink={''}
            />
        </ThemeProvider>
    </MemoryRouter>
);

export const _ListWithError = () => (
    <MemoryRouter initialEntries={['/']}>
        <ThemeProvider theme={theme}>
            <RadioCellList
                radioCellsList={[]}
                selectedRadioCell={''}
                setSelectedRadioCell={() => {
                    // eslint-disable-next-line no-console
                    console.log('setSelectedRadioCell');
                }}
                isError={true}
                isFetching={false}
                isLoading={false}
                refetch={() => {
                    // eslint-disable-next-line no-console
                    console.log();
                }}
                redirectLink={''}
            />
        </ThemeProvider>
    </MemoryRouter>
);

// _List.parameters = {
//     msw: {
//         handlers: [
//             http.get('/data/v1/radio/cell/list', () => {
//                 return HttpResponse.json(cellList);
//             }),
//         ],
//     },
// };
