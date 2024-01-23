import { ThemeProvider } from '@mui/material';
import type { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { theme } from '../../../styles/theme';
import { RadioCellCard } from './RadioCellCard';

const meta = {
    title: 'pages/Geomap/RadioCellCard',
    component: RadioCellCard,
} satisfies Meta<typeof RadioCellCard>;

export default meta;

const radioCell = {
    cellId: 'cellId',
    gnbDuId: 'jJYQ4u',
    pci: 74,
};

export const _RadioCellCard = () => (
    <MemoryRouter initialEntries={['/']}>
        <ThemeProvider theme={theme}>
            <RadioCellCard
                radioCell={radioCell}
                selectedRadioCell={''}
                setSelectedRadioCell={() => {
                    // eslint-disable-next-line no-console
                    console.log('setSelectedRadioCell');
                }}
                redirectLink={''}
            />
        </ThemeProvider>
    </MemoryRouter>
);
