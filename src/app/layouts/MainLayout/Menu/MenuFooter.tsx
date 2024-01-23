import { Box, Typography } from '@mui/material';

import { styles } from './styles';

export const MenuFooter = () => {
    return (
        <Box sx={styles.footerWrapper}>
            <Typography sx={styles.footerText}>Maps</Typography>
        </Box>
    );
};
