import { ThemeProvider } from '@mui/material';
import type { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { theme } from '../../styles/theme';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
    title: 'shared-ui',
    component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

export const _Breadcrumbs = () => (
    <MemoryRouter initialEntries={['/']}>
        <ThemeProvider theme={theme}>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        title: 'Overview',
                        url: '/',
                    },
                    {
                        title: 'Rules',
                    },
                ]}
            />
        </ThemeProvider>
    </MemoryRouter>
);
