import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { MapProvider } from './state/MapContext';
import { theme } from './styles/theme';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { refetchOnWindowFocus: false },
    },
});
export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <MapProvider>
                    <RouterProvider router={router} />
                </MapProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
