import { ThemeProvider } from '@mui/material';
import type { Meta } from '@storybook/react';

import { theme } from '../../styles/theme';
import { Chip } from './Chip';

const meta = {
    title: 'shared-ui',
    component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;

export const _Chip = () => (
    <ThemeProvider theme={theme}>
        <Chip />
    </ThemeProvider>
);
