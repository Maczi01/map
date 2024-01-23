import { Box, CircularProgress as MuiCircularProgress } from '@mui/material';

import { styles } from './styles';

export const LoadingData = () => {
    return (
        <Box sx={styles.loaderWrapper}>
            <MuiCircularProgress size={80} />
        </Box>
    );
};
