import { Box, Button, Card as MuiCard, CardContent, Stack, Typography } from '@mui/material';

import { styles } from './styles';

type ErrorProps = {
    refetch: () => void;
};

export const Error = ({ refetch }: ErrorProps) => {
    return (
        <MuiCard sx={styles.errorWrapper}>
            <CardContent>
                <Stack sx={styles.infoWrapper}>
                    <Box>
                        <Typography sx={styles.cardTitle}>Error</Typography>
                        <Typography sx={styles.gnbDuId}>Cannot retrieve data.</Typography>
                        <Typography sx={styles.gnbDuId}>Please try again</Typography>
                    </Box>
                    <Button onClick={refetch} sx={styles.detailsButton}>
                        Refetch data
                    </Button>
                </Stack>
            </CardContent>
        </MuiCard>
    );
};
