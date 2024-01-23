import { keyframes } from '@mui/system';
const upAndDown = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const styles = {
    overviewMapWrapper: {
        height: '100vh',
        width: 'calc(100vw - 650px)',
    },
    map: {
        width: '100%',
        height: '100%',
    },

    popup: {
        paddingBottom: '30px',
    },
    marker: (isSelected: boolean) => ({
        width: '48px',
        height: '48px',
        cursor: 'pointer',
        zIndex: isSelected ? 5 : 0,
        animation: isSelected ? `${upAndDown} 1s ease-in-out infinite` : '',
    }),
    cluster: (isSelected: boolean) => ({
        width: '48px',
        height: '48px',
        cursor: 'pointer',
        zIndex: isSelected ? 5 : 0,
        animation: isSelected ? `${upAndDown} 1s ease-in-out infinite` : '',
    }),
    clusterCounter: (containSelectedMarker: boolean) => ({
        position: 'absolute',
        top: '-15px',
        left: '34px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '12px',
        backgroundColor: 'red',
        padding: '0 6px',
        borderRadius: '6px',
        border: '2px solid white',
        animation: containSelectedMarker ? `${upAndDown} 1s ease-in-out infinite` : '',
    }),
    zooming: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: '8px 12px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        zIndex: 1000,
        animation: `${fadeIn} 0.5s ease-out`,
    },
};
