import React from 'react';
import { useSelector } from 'react-redux';
import { getRoutesAnalysis, getRoutes, getLayers } from '../../state/routes/routesReducer';
import { Text } from 'rebass';
import { RouteSummary } from './RouteSummary';

export const SummaryStep: React.FC = () => {
    const routes = useSelector(getRoutes);
    const analysis = useSelector(getRoutesAnalysis);
    const layers = useSelector(getLayers);

    return (
        <>
            {routes.length === 0 && (
                <Text>Nie załadowano żadnych tras.</Text>
            )}

            {routes.map((route) => (
                <RouteSummary
                    key={`route-${route.id}`}
                    route={route}
                    analysis={analysis[route.id]}
                    gpx={layers[route.id].gpx}
                />
            ))}
        </>
    );
};
