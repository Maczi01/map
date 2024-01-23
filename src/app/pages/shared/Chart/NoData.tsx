import { Box, Typography } from '@mui/material';

import { styles } from './styles';

export const NoData = () => {
    return (
        <Box sx={styles.loaderWrapper}>
            <Box sx={styles.errorWrapper}>
                <Typography sx={styles.errorTitle}>No data to display</Typography>
            </Box>
        </Box>
    );
};
