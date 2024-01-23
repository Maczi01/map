import { Box, Stack, Typography } from '@mui/material';

import { RadioCell } from '../../../types/RadioCell';
import { RadioCellCard } from '../RadioCellCard';
import { Empty } from './Empty';
import { Error } from './Error';
import { Loader } from './Loader';
import { styles } from './styles';

type ListProps = {
    radioCellsList: RadioCell[];
    selectedRadioCell: string;
    setSelectedRadioCell: (radioCellId: string) => void;
    isFetching: boolean;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
    redirectLink: string;
};

export const RadioCellList = ({
    radioCellsList,
    selectedRadioCell,
    setSelectedRadioCell,
    isFetching,
    isLoading,
    isError,
    refetch,
    redirectLink,
}: ListProps) => {
    const renderContent = () => {
        const loading = isLoading || isFetching;

        if (isError) {
            return <Error refetch={refetch} />;
        }
        if (!loading && radioCellsList.length === 0) {
            return <Empty />;
        }
        if (loading) {
            return <Loader />;
        }
        return radioCellsList.map((radioCell: RadioCell) => (
            <RadioCellCard
                key={radioCell.cellId}
                radioCell={radioCell}
                setSelectedRadioCell={setSelectedRadioCell}
                selectedRadioCell={selectedRadioCell}
                redirectLink={redirectLink}
            />
        ));
    };

    return (
        <Box sx={styles.listWrapper}>
            <Typography variant="h6" sx={styles.listTitle}>
                List of cells
            </Typography>
            <Stack sx={styles.listStack}>{renderContent()}</Stack>
        </Box>
    );
};
