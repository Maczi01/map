import { SvgIcon } from '@mui/material';
import { Marker } from 'react-map-gl';

import { RadioCell } from '../../../types/RadioCell';
import { styles } from './styles';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line ordered-imports/ordered-imports
import Antenna from '../../../../assets/ant.svg?react';

type MarkerWithIconProps = {
    radioCell: RadioCell;
    isSelected: boolean;
    onClick: () => void;
};

export const MarkerWithIcon = ({ radioCell, isSelected, onClick }: MarkerWithIconProps) => {
    return (
        <Marker
            longitude={radioCell.pointGeometry.coordinates[0]}
            latitude={radioCell.pointGeometry.coordinates[1]}
            style={styles.marker(isSelected)}
            anchor="bottom"
            onClick={onClick}
        >
            <SvgIcon sx={styles.marker(isSelected)}>
                <Antenna fill={isSelected ? '#261a7c' : '#ff9e00'} stroke="white" />
            </SvgIcon>
        </Marker>
    );
};
