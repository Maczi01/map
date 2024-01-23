import { keyframes } from '@mui/system';
const upAndDown = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
`;
export const styles = {
    marker: (isSelected: boolean) => ({
        width: '48px',
        height: '48px',
        cursor: 'pointer',
        animation: isSelected ? `${upAndDown} 1s ease-in-out infinite` : '',
        zIndex: isSelected ? 5 : 0,
    }),
};
