import { Check } from '@mui/icons-material';
import { Chip as MuiChip } from '@mui/material';

import { styles } from './styles';

export const Chip = () => {
    return <MuiChip color="secondary" icon={<Check sx={styles.chipIcon} />} label="Active" />;
};
