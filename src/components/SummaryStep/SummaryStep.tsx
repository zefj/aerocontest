import React from 'react';
import { useSelector } from 'react-redux';
import { getRoutesAnalysis, getRoutes } from '../../state/routes/routesReducer';
import { Text } from 'rebass';
import { RouteSummary } from './RouteSummary';

export const SummaryStep: React.FC = () => {
    const routes = useSelector(getRoutes);
    const analysis = useSelector(getRoutesAnalysis);
    const amountOfRoutes = Object.keys(routes).length;

    return (
        <>
            {amountOfRoutes === 0 && (
                <Text>Nie załadowano żadnych tras.</Text>
            )}

            {Object.entries(routes).map(([_key, route]) => (
                <RouteSummary
                    key={`route-${route.id}`}
                    route={route}
                    analysis={analysis[route.id]}
                    gpx={routes[route.id].gpx}
                />
            ))}
        </>
    );
};
