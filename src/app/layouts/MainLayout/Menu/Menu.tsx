import { Box, CardMedia, Drawer, Link as MuiLink, List } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import logo from '../../../../assets/logo.png';
import { authorizedRoutes } from '../../../routes';
import { ListItemMenu } from './ListItemMenu';
import { MenuFooter } from './MenuFooter';
import { styles } from './styles';

export const Menu = () => {
    return (
        <Box component="nav" sx={styles.menuWrapper} aria-label="side menu">
            <Drawer variant="permanent" open={true}>
                <Box sx={styles.drawerContent}>
                    <Box>
                        <MuiLink component={RouterLink} to="/">
                            <CardMedia
                                component="img"
                                image={logo}
                                alt="logo"
                                sx={styles.logoImageWrapper}
                            />
                        </MuiLink>
                    </Box>
                    <List sx={styles.listMenu}>
                        {authorizedRoutes.slice(0, 2).map(menuItem => (
                            <ListItemMenu key={menuItem.title} {...menuItem} />
                        ))}
                    </List>
                    <MenuFooter />
                </Box>
            </Drawer>
        </Box>
    );
};
