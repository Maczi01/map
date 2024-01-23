import { ThemeProvider } from '@mui/material';
import type { Meta } from '@storybook/react';
import { HttpResponse, http } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { cellDetails } from '../../../mocks/fixtures';
import { theme } from '../../../styles/theme';
import { Error } from './Error';
import { Loader } from './Loader';
import { PopupContent } from './PopupContent';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { refetchOnWindowFocus: false, retry: 0, cacheTime: 0 },
    },
});

const meta = {
    title: 'pages/Geomap/Popup',
    component: PopupContent,
} satisfies Meta<typeof PopupContent>;

export default meta;

export const _PopupContentLoading = () => (
    <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
            <ThemeProvider theme={theme}>
                <Loader />
            </ThemeProvider>
        </MemoryRouter>
    </QueryClientProvider>
);
export const _PopupContentWithData = () => (
    <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
            <ThemeProvider theme={theme}>
                <PopupContent cellId={'cellId'} />
            </ThemeProvider>
        </MemoryRouter>
    </QueryClientProvider>
);
export const _PopupContentWithError = () => (
    <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
            <ThemeProvider theme={theme}>
                <Error
                    refetch={() => {
                        // eslint-disable-next-line no-console
                        console.log('refetch');
                    }}
                />
            </ThemeProvider>
        </MemoryRouter>
    </QueryClientProvider>
);

_PopupContentWithData.parameters = {
    msw: {
        handlers: [
            http.get('/data/v1/radio/cell', () => {
                return HttpResponse.json(cellDetails);
            }),
        ],
    },
};

// _PopupContentLoading.parameters = {
//     msw: {
//         handlers: [
//             http.get('/data/v1/radio/cell1/await', async () => {
//                 return HttpResponse.json(cellDetails);
//             }),
//         ],
//     },
// };
