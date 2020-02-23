import React from 'react';
import { Box } from 'rebass';

import { useRoutes } from '../../hooks/useRoutes';
import { RouteUploader } from './RouteUploader';
import { Route } from './Route';

export const RouteStep: React.FC = () => {
    const { routes } = useRoutes();

    return (
        <>
            <Box variant="container">
                <RouteUploader />
            </Box>

            {routes.map((route) => <Route route={route} />)}
        </>
    );
};
