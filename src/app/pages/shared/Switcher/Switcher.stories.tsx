import { ThemeProvider } from '@mui/material';
import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { theme } from '../../../styles/theme';
import { FilterTypes } from '../../../types/filters';
import { Switcher } from './Switcher';

const meta = {
    title: 'pages/Graph/Switcher',
    component: Switcher,
} satisfies Meta<typeof Switcher>;

export default meta;

export const _Switcher = () => {
    const [criteria, setCriteria] = useState(FilterTypes.UPLINK);

    const toggle = () => {
        criteria === FilterTypes.DOWNLINK
            ? setCriteria(FilterTypes.UPLINK)
            : setCriteria(FilterTypes.DOWNLINK);
    };

    return (
        <ThemeProvider theme={theme}>
            <Switcher setCriteria={toggle} filters={[{ value: '', label: '' }]} />
        </ThemeProvider>
    );
};
