const colors = {
    white: '#FFFFFF',
    secondary: '#FF9900',
};
export const styles = {
    switcherWrapper: {
        border: `1px solid ${colors.secondary}`,
        borderRadius: `0`,
        margin: 0,
        padding: 0,
    },
    buttonStyle: (isSelected: boolean) => ({
        width: '100px',
        backgroundColor: isSelected ? colors.secondary : colors.white,
        color: isSelected ? colors.white : colors.secondary,
        border: `1px solid ${colors.secondary}`,
        cursor: isSelected ? 'default' : 'pointer',
        fontWeight: isSelected ? 'normal' : 'bold',
        '&:hover': {
            backgroundColor: isSelected ? '#f59c17' : '#fcfbfc',
            color: isSelected ? colors.white : colors.secondary,
        },
    }),
};
