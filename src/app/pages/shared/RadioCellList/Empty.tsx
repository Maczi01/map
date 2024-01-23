import { Box, Card as MuiCard, CardContent, Stack, Typography } from '@mui/material';

import { styles } from './styles';

export const Empty = () => {
    return (
        <MuiCard sx={styles.errorWrapper}>
            <CardContent>
                <Stack sx={styles.infoWrapper}>
                    <Box>
                        <Typography sx={styles.gnbDuId}>List is empty.</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </MuiCard>
    );
};
