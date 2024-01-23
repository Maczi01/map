import { Box, Skeleton, Stack } from '@mui/material';

import { styles } from './styles';

export const Loader = () => (
    <Stack sx={styles.skeletonWrapper}>
        <Box>
            <Skeleton animation="wave" variant="text" width={200} height={28} />
            <Skeleton animation="wave" variant="text" width={200} height={20} />
            <Skeleton animation="wave" variant="text" width={70} height={24} />
        </Box>
        <Box sx={styles.wavesWrapper}>
            <Box sx={styles.titleAndValueWaves}>
                <Skeleton animation="wave" variant="text" width={70} height={24} />
                <Skeleton animation="wave" variant="text" width={70} height={24} />
            </Box>
            <Box sx={styles.titleAndValueWaves}>
                <Skeleton animation="wave" variant="text" width={70} height={24} />
                <Skeleton animation="wave" variant="text" width={70} height={24} />
            </Box>
        </Box>
        <Box sx={styles.skeletonButtonBox}>
            <Skeleton animation="wave" variant="text" width={120} height={50} />
        </Box>
    </Stack>
);
