import { Box, Skeleton, Stack } from '@mui/material';

import { styles } from './styles';

const CardLoader = () => (
    <Stack sx={styles.loaderWrapper}>
        <Box sx={styles.stackWrapper}>
            <Skeleton animation="wave" variant="text" width={200} height={28} />
            <Skeleton animation="wave" variant="text" width={200} height={20} />
            <Skeleton animation="wave" variant="text" width={70} height={24} />
        </Box>
        <Box sx={styles.buttonLoader}>
            <Skeleton animation="wave" variant="text" width={120} height={50} />
        </Box>
    </Stack>
);
const loaders = new Array(10).fill(CardLoader);
export const Loader = () => {
    return (
        <Stack sx={styles.cardsLoaderWrapper}>
            {loaders.map((_, index) => (
                <CardLoader key={index} />
            ))}
        </Stack>
    );
};
