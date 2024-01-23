import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useActivePath } from '../../../hooks/useActivePath';
import { styles } from './styles';

type ListItemMenuProps = {
    title: string;
    icon: ReactNode;
    path: string;
};
export const ListItemMenu = ({ title, icon, path }: ListItemMenuProps) => {
    const navigate = useNavigate();
    const isActive = useActivePath(path);
    return (
        <ListItem
            sx={isActive ? styles.activeNavItem : styles.navItems}
            key={title}
            disablePadding
            onClick={() => {
                navigate(path);
            }}
        >
            <ListItemButton sx={styles.itemButton}>
                <ListItemIcon sx={styles.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                    primary={title}
                    sx={isActive ? styles.labelActive : styles.labelTextSideBar}
                />
            </ListItemButton>
        </ListItem>
    );
};
