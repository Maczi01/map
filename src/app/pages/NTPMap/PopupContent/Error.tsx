import { ReportProblem } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

import { styles } from './styles';

type ErrorProps = {
    refetch: () => void;
};

export const Error = ({ refetch }: ErrorProps) => {
    return (
        <Stack sx={styles.errorWrapper}>
            <Box>
                <Typography sx={styles.popupTitle}>Error</Typography>
                <Typography sx={styles.gnbDuId}>Cannot retrieve data.</Typography>
                <Typography sx={styles.gnbDuId}>Please try again</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ReportProblem sx={{ color: 'red', width: '64px', height: '64px' }} />
            </Box>
            <Box sx={styles.buttonBox}>
                <Button onClick={refetch} sx={styles.detailsButton}>
                    Refetch data
                </Button>
            </Box>
        </Stack>
    );
};
