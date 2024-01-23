import { Box, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Menu } from '../../layouts/MainLayout/Menu';
import { styles } from './styles';

export const NotFound = () => {
    return (
        <Box>
            <Menu />
            <Box sx={styles.contentWrapper}>
                <Typography sx={styles.hero}>Whoops!</Typography>
                <Typography sx={styles.subtitle}>Page not found</Typography>
                <MuiLink component={RouterLink} to={'/'}>
                    <Typography>Back to main page</Typography>
                </MuiLink>
            </Box>
        </Box>
    );
};
