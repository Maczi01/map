import { Box, Button, Card as MuiCard, CardContent, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Chip } from '../../../components/Chip';
import { RadioCell } from '../../../types/RadioCell';
import { styles } from './styles';

type CardProps = {
    radioCell: Pick<RadioCell, 'cellId' | 'gnbDuId' | 'pci'>;
    setSelectedRadioCell: (radioCellId: string) => void;
    selectedRadioCell: string;
    redirectLink: string;
};

export const RadioCellCard = ({
    radioCell,
    setSelectedRadioCell,
    selectedRadioCell,
    redirectLink,
}: CardProps) => {
    const navigate = useNavigate();
    const { cellId, gnbDuId, pci } = radioCell;
    const isRadioCellSelected = selectedRadioCell === cellId;

    const handleSelectedRadioCell = () => {
        if (isRadioCellSelected) {
            setSelectedRadioCell('');
            return;
        }
        setSelectedRadioCell(cellId);
    };
    return (
        <MuiCard
            sx={styles.cardWrapper(isRadioCellSelected)}
            onClick={handleSelectedRadioCell}
            data-testid={`radioCellCard-${cellId}`}
        >
            <CardContent>
                <Stack sx={styles.infoWrapper}>
                    <Box>
                        <Typography sx={styles.cardTitle}>pci: {pci}</Typography>
                        <Typography sx={styles.gnbDuId}>gnbDuId: {gnbDuId}</Typography>
                        <Chip />
                    </Box>
                    <Button
                        onClick={() => navigate(`${redirectLink}/${cellId}`)}
                        sx={styles.detailsButton}
                    >
                        See details
                    </Button>
                </Stack>
            </CardContent>
        </MuiCard>
    );
};
