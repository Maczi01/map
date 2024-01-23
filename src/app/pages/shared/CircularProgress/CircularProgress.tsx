import {
    Box,
    CircularProgress as MuiCircularProgress,
    CircularProgressProps,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { styles } from './styles';

export const CircularProgress = (props: CircularProgressProps & { value: number }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prevProgress =>
                prevProgress < props.value ? prevProgress + 1 : props.value,
            );
        }, 5);

        return () => {
            clearInterval(timer);
        };
    }, [props.value]);

    return (
        <Box sx={styles.circularProgressWrapper}>
            <Typography sx={styles.title}>Average accuracy</Typography>
            <Box sx={styles.imageWrapper}>
                <MuiCircularProgress variant="determinate" value={progress} />
                <Box sx={styles.textContainer}>
                    <Typography variant="caption" component="div" color="text.primary">
                        {`${Math.round(progress)}%`}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
