import { useContext } from 'react';
import {
    routesContext,
    RoutesContext
} from '../state/routesContext';

export const useRoutes = (): RoutesContext => useContext(routesContext);
