import { Box, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line ordered-imports/ordered-imports
import ArrowRight from '../../../assets/arrowRight.svg?react';
import { styles } from './styles';

type BreadcrumbsProps = {
    breadcrumbs: {
        title: string;
        url?: string;
    }[];
};

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
    return (
        <Box sx={styles.breadcrumbsWrapper}>
            {breadcrumbs?.map((item, index) => (
                <span key={index}>
                    {item.url ? (
                        <Box sx={styles.breadcrumbsWrapper}>
                            <MuiLink
                                component={RouterLink}
                                to={item.url}
                                sx={styles.breadcrumbStyleUnderlined}
                            >
                                <Typography sx={styles.breadcrumbStyleUnderlined}>
                                    {item.title}
                                </Typography>
                            </MuiLink>
                            <ArrowRight color="#888888" height={8} width={12} />
                        </Box>
                    ) : (
                        <Typography sx={styles.breadcrumbStyle}>{item.title}</Typography>
                    )}
                </span>
            ))}
        </Box>
    );
};
