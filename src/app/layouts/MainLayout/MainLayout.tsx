import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Menu } from './Menu';
import { styles } from './styles';

export const MainLayout = () => {
    return (
        <Box>
            <Menu />
            <Box sx={styles.contentWrapper}>
                <Outlet />
            </Box>
        </Box>
    );
};
