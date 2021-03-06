import { useCallback, useContext, useEffect } from 'react';
import L, { Polyline } from 'leaflet';

import { useLeaflet } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { getRoutes, getRoutesAnalysis } from '../../state/routes/routesReducer';
import { RouteLayers, RouteFragments } from '../../types/routes';
import { getPolylineLayer } from '../../utils/getPolylineLayer';
import { ROUTE_LINE_STYLE_OFFTRACK, ROUTE_LINE_STYLE_ONTRACK } from '../leafletElementStyles';
import { selectPolyline as selectPolylineAction } from '../../state/routes/routesActions';
import { RouteLayersContext } from '../../state/store';

const drawFragments = (analysisId: string, routeLayers: RouteLayers, fragments: RouteFragments, selectPolyline: (id: string, analysisId: string, ref: Polyline) => void) => {
    routeLayers.offtrackMarkersLayer.clearLayers();
    routeLayers.offtrackFragmentsLayer.clearLayers();
    routeLayers.ontrackMarkersLayer.clearLayers();
    routeLayers.ontrackFragmentsLayer.clearLayers();

    fragments.forEach((fragment) => {
        const style = fragment.type === 'ontrack' ? ROUTE_LINE_STYLE_ONTRACK : ROUTE_LINE_STYLE_OFFTRACK;

        const polyline = L.polyline(fragment.latLngs, style)

        polyline.on("click", function(e) {
            selectPolyline(fragment.id, analysisId, polyline);

            // const exitPoint = fragment[0];
            // const entryPoint = fragment[fragment.length - 1];

            // L.marker([exitPoint.lat, exitPoint.lng])
            //     .addTo(routeLayers.offtrackMarkersLayer)
            //     .bindTooltip(exitPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);

            // L.marker([entryPoint.lat, entryPoint.lng])
            //     .addTo(routeLayers.offtrackMarkersLayer)
            //     .bindTooltip(entryPoint.meta.time.toString(), OFFTRACK_POINT_TOOLTIP_OPTIONS);
        })
        .addTo(routeLayers.offtrackFragmentsLayer);
    });
};

export const AnalysisDrawer = () => {
    const { map } = useLeaflet();
    const analyses = useSelector(getRoutesAnalysis);
    const layers = useContext(RouteLayersContext);
    const routes = useSelector(getRoutes);
    const trackEmpty = !Object.keys(analyses).length;

    const dispatch = useDispatch();
    const selectPolylineFn = useCallback((id, analysisId, ref) => dispatch(selectPolylineAction(id, analysisId, ref)), []);

    useEffect(() => {
        if (!map) {
            return;
        }

        for (let [key, route] of Object.entries(routes)) {
            if (!route.gpx) {
                continue;
            }
            
            const routeLayers = layers[route.id];

            const polylineLayer = getPolylineLayer(route.gpx);
            
            if (!polylineLayer) {
                throw new Error('Polyline layer not found in route.');
            }
            
            if (!trackEmpty) {
                // Tracks replace the original polyline
                map.removeLayer(polylineLayer);
            }
            
            if (trackEmpty && !map.hasLayer(polylineLayer)) {
                map.addLayer(polylineLayer);
            }
            
            const analysis = analyses[key] || [];
            
            // Do not draw offtrack fragments if the track is empty, this is purely visual
            drawFragments(key, routeLayers, analysis, selectPolylineFn); 
        }
    }, [map, analyses]);

    return null;
};