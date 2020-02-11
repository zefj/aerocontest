import React from 'react';
import { GPX } from 'leaflet';
import { useRoutes } from '../../hooks/useRoutes';

type RouteDataProps = {
    route: GPX,
};

const RouteData: React.FC<RouteDataProps> = ({ route }) => {
    const get_name = route.get_name();
    const get_distance = route.get_distance();
    const get_start_time = route.get_start_time().toString();
    const get_end_time = route.get_end_time().toString();
    const get_moving_time = route.get_moving_time();
    const get_total_time = route.get_total_time();
    const get_moving_pace = route.get_moving_pace();
    const get_moving_speed = route.get_moving_speed();
    const get_total_speed = route.get_total_speed();
    const get_elevation_min = route.get_elevation_min();
    const get_elevation_max = route.get_elevation_max();
    const get_elevation_gain = route.get_elevation_gain();
    const get_elevation_loss = route.get_elevation_loss();
    const get_average_hr = route.get_average_hr();
    const get_average_cadence = route.get_average_cadence();
    const get_average_temp = route.get_average_temp();

    return (
        <>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_name: <span className="font-bold">{ get_name }</span></span>
                <div className="text-gray-700 text-xs">returns the name of the GPX track</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_distance: <span className="font-bold">{ get_distance }</span></span>
                <div className="text-gray-700 text-xs">returns the total track distance, in meters</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_start_time: <span className="font-bold">{ get_start_time }</span></span>
                <div className="text-gray-700 text-xs">returns a Javascript Date object representing the starting time</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_end_time: <span className="font-bold">{ get_end_time }</span></span>
                <div className="text-gray-700 text-xs">returns a Javascript Date object representing when the last point was recorded</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_moving_time: <span className="font-bold">{ get_moving_time }</span></span>
                <div className="text-gray-700 text-xs">returns the moving time, in milliseconds</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_total_time: <span className="font-bold">{ get_total_time }</span></span>
                <div className="text-gray-700 text-xs">returns the total track time, in milliseconds</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_moving_pace: <span className="font-bold">{ get_moving_pace }</span></span>
                <div className="text-gray-700 text-xs">returns the average moving pace in milliseconds per km</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_moving_speed: <span className="font-bold">{ get_moving_speed }</span></span>
                <div className="text-gray-700 text-xs">returns the average moving speed in km per hour</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_total_speed: <span className="font-bold">{ get_total_speed }</span></span>
                <div className="text-gray-700 text-xs">returns the average total speed in km per hour</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_elevation_min: <span className="font-bold">{ get_elevation_min }</span></span>
                <div className="text-gray-700 text-xs">returns the lowest elevation, in meters</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_elevation_max: <span className="font-bold">{ get_elevation_max }</span></span>
                <div className="text-gray-700 text-xs">returns the highest elevation, in meters</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_elevation_gain: <span className="font-bold">{ get_elevation_gain }</span></span>
                <div className="text-gray-700 text-xs">returns the cumulative elevation gain, in meters</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_elevation_loss: <span className="font-bold">{ get_elevation_loss }</span></span>
                <div className="text-gray-700 text-xs">returns the cumulative elevation loss, in meters</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_average_hr: <span className="font-bold">{ get_average_hr }</span></span>
                <div className="text-gray-700 text-xs">returns the average heart rate (if available)</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_average_cadence: <span className="font-bold">{ get_average_cadence }</span></span>
                <div className="text-gray-700 text-xs">returns the average cadence (if available)</div>
            </div>
            <div className="mb-2 text-sm text-gray-800">
                <span>get_average_temp: <span className="font-bold">{ get_average_temp }</span></span>
                <div className="text-gray-700 text-xs">returns the average of the temperature (if available)</div>
            </div>
        </>
    );
};

export const RouteTab: React.FC = () => {
    const { routes } = useRoutes();

    return (
        <div className="px-6 py-4 overflow-auto">
            {routes.map((route) => (
                <div className="mb-2">
                    <div className="font-bold text-xl mb-2">{route.name}</div>

                    {!route.gpx && (
                        <span>Ładowanie trasy...</span>
                    )}

                    {route.gpx && (
                        <RouteData route={route.gpx} />
                    )}
                </div>
            ))}
        </div>
    );
};
