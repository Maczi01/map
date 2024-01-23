import { AccountCircleOutlined, NotificationsNone, SettingsOutlined } from '@mui/icons-material';
import { AppBar, Box, Container, Divider, IconButton, Toolbar, Typography } from '@mui/material';

import { SelectSite } from './SelectSite';
import { styles } from './styles';

export const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth={false} sx={styles.container}>
                <Toolbar disableGutters>
                    <SelectSite />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box sx={styles.headerIconsBlock}>
                        <IconButton
                            aria-label="Notification"
                            component="label"
                            sx={styles.iconWrapper}
                        >
                            <NotificationsNone />
                        </IconButton>
                        <IconButton
                            aria-label="Notification"
                            component="label"
                            sx={styles.iconWrapper}
                        >
                            <SettingsOutlined />
                        </IconButton>
                        <Box sx={styles.avatarWrapper}>
                            <AccountCircleOutlined sx={styles.avatarIconDetails} />
                            <Typography sx={styles.avatarTextDetails}>FirstName</Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
