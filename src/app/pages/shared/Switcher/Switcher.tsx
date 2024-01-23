import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

import { styles } from './styles';

export const colors = {
    primary: '#0d006d',
    primaryLight: '#261a7c',
    primaryDark: '#090048',
    primaryContrastText: '#FFFFFF',
    black: '#222222',
    white: '#FFFFFF',
    text: '#1f1378',
    secondary: '#FF9900',
    secondaryLight: '#FFB700',
    secondaryDark: '#CC7A00',
    secondaryContrastText: '#FFF',
};

type FilterType = { value: string };

type SwitcherProps = {
    setCriteria: (criteria: string) => void;
    filters: FilterType[];
};

export const Switcher = ({ setCriteria, filters }: SwitcherProps) => {
    const [alignment, setAlignment] = useState(filters.length > 0 ? filters[0].value : null);

    const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        setCriteria(newAlignment);
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={styles.switcherWrapper}
        >
            {filters.map(item => {
                const isSelected = alignment === item.value;
                return (
                    <ToggleButton
                        sx={{
                            backgroundColor: isSelected ? colors.secondary : colors.white,
                            color: isSelected ? colors.white : colors.secondary,
                            borderRadius: 0,
                            height: '30px',
                            minWidth: '100px',
                            cursor: isSelected ? 'default' : 'pointer',
                            '&.MuiButtonBase-root': {
                                border: `1px solid ${colors.secondary} !important`,
                            },
                            '&.Mui-selected, &.Mui-selected:hover': {
                                backgroundColor: colors.secondary,
                                color: colors.white,
                            },
                        }}
                        key={item.value}
                        value={item.value}
                    >
                        {item.value}
                    </ToggleButton>
                );
            })}
        </ToggleButtonGroup>
    );
};
