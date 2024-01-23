import { Place } from '@mui/icons-material';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

import { styles } from './styles';

const EmptySelect = () => {
    return (
        <Box sx={styles.selectItemWrapper}>
            <Place sx={styles.selectItemIcon} />
            Site name
        </Box>
    );
};
export const SelectSite = () => {
    const [selectedSite, setSelectedSite] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedSite(event.target.value);
    };

    return (
        <FormControl variant="standard" sx={{ my: 1, mx: 2, width: 120 }}>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedSite}
                displayEmpty
                onChange={handleChange}
                renderValue={selectedSite !== '' ? undefined : () => <EmptySelect />}
                sx={styles.selectButton}
            >
                <MenuItem value="">Select name</MenuItem>
                <MenuItem value={'Site1'}>
                    <Box sx={styles.selectItemWrapper}>
                        <Place sx={styles.selectItemIcon} />
                        Site 1
                    </Box>
                </MenuItem>
                <MenuItem value={'Site2'}>
                    <Box sx={styles.selectItemWrapper}>
                        <Place sx={styles.selectItemIcon} />
                        Site 2
                    </Box>
                </MenuItem>
                <MenuItem value={'Site3'}>
                    <Box sx={styles.selectItemWrapper}>
                        <Place sx={styles.selectItemIcon} />
                        Site 3
                    </Box>
                </MenuItem>
                <MenuItem value={'Site4'}>
                    <Box sx={styles.selectItemWrapper}>
                        <Place sx={styles.selectItemIcon} />
                        Site 4
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
};
