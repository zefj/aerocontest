import React from 'react';
import { Box, Heading, Text } from 'rebass';

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

            {routes.length > 0 && (
                <Box variant="container">
                    <Heading variant="heading.h3">Załadowane trasy:</Heading>
                </Box>
            )}

            {routes.length === 0 && (
                <Text>Nie załadowano żadnych tras, przeciągnij pliki <code>.gpx</code> do okna powyżej, lub użyj przeglądarki plików.</Text>
            )}

            {routes.map((route) => <Route route={route} />)}
        </>
    );
};
