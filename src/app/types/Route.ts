import { ReactNode } from 'react';

export type Route = {
    path: string;
    element: ReactNode;
    icon: ReactNode;
    title: string;
};
