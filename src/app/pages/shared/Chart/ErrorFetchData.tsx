import { ReportProblem } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import { styles } from './styles';

export const ErrorFetchData = ({ refetch }: { refetch: () => void }) => {
    return (
        <Box sx={styles.loaderWrapper}>
            <Box sx={styles.errorWrapper}>
                <Typography sx={styles.errorTitle}>Error</Typography>
                <Typography>Cannot retrieve data. Please try again.</Typography>
                <ReportProblem sx={styles.iconError} />
                <Button onClick={() => refetch()}>Refetch data</Button>
            </Box>
        </Box>
    );
};
