import { Box, Flex, Heading, Text } from 'rebass';
import { space } from '../../styles/theme';
import { Button } from '../Button';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@rebass/forms';
import { useDispatch } from 'react-redux';
import { changeRouteName, removeRoute } from '../../state/routes/routesActions';
import { Route } from '../../types/routes';

type RouteNameInputProps = {
    defaultValue: string,
    onAccept: (name: string | null) => void,
};

const RouteNameInput = ({ defaultValue, onAccept }: RouteNameInputProps ) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = ref.current;

        if (input) {
            input.focus();
        }
    }, [ref.current]);

    return (
        <Input
            ref={ref}
            id='name'
            name='name'
            type='text'
            defaultValue={defaultValue}
            onBlur={() => onAccept(ref.current && ref.current.value)}
        />
    );
};

const RouteName = ({ name, onChange }: { name: string, onChange: (name: string) => void }) => {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return (
            <RouteNameInput
                defaultValue={name}
                onAccept={(name) => {
                    setIsEditing(false);
                    name && onChange(name);
                }}
            />
        );
    }

    return (
        <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsEditing(true)}
        >
            <Heading variant="routeName.editable">
                {name}
            </Heading>
            <Text variant="instruction">Kliknij, aby zmienić nazwę...</Text>
        </Box>
    );
};

export const RouteRecord = ({ route }: { route: Route }) => {
    const dispatch = useDispatch();

    return (
        <Box variant="container">
            <Flex
                mb={space['12']}
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // Setting min-height prevents the following rows from jumping 1 pixel up when the input is rendered
                    minHeight: space['48']
                }}
            >
                <RouteName
                    name={route.name}
                    onChange={(name: string) => dispatch(changeRouteName(route.id, name))}
                />

                <Box sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                    <Button variant="secondaryOutline" mr="4" icon="fa-fw fas fa-eye" sx={{ height: '100%' }} />
                    <Button
                        variant="destructiveOutline"
                        icon="fa-fw fas fa-times"
                        sx={{ height: '100%' }}
                        onClick={() => dispatch(removeRoute(route.id))}
                    />
                </Box>
            </Flex>

            {/*{route.gpx && (*/}
            {/*    <RouteData route={route.gpx} />*/}
            {/*)}*/}
        </Box>
    );
};

// type RouteDataProps = {
//     route: GPX,
// };
//
// const RouteData: React.FC<RouteDataProps> = ({ route }) => {
//     const get_name = route.get_name();
//     const get_distance = route.get_distance();
//     const get_start_time = route.get_start_time().toString();
//     const get_end_time = route.get_end_time().toString();
//     const get_moving_time = route.get_moving_time();
//     const get_total_time = route.get_total_time();
//     const get_moving_pace = route.get_moving_pace();
//     const get_moving_speed = route.get_moving_speed();
//     const get_total_speed = route.get_total_speed();
//     const get_elevation_min = route.get_elevation_min();
//     const get_elevation_max = route.get_elevation_max();
//     const get_elevation_gain = route.get_elevation_gain();
//     const get_elevation_loss = route.get_elevation_loss();
//     const get_average_hr = route.get_average_hr();
//     const get_average_cadence = route.get_average_cadence();
//     const get_average_temp = route.get_average_temp();
//
//     return (
//         <>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_name: <span className="font-bold">{ get_name }</span></span>
//                 <div className="text-gray-700 text-xs">returns the name of the GPX track</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_distance: <span className="font-bold">{ get_distance }</span></span>
//                 <div className="text-gray-700 text-xs">returns the total track distance, in meters</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_start_time: <span className="font-bold">{ get_start_time }</span></span>
//                 <div className="text-gray-700 text-xs">returns a Javascript Date object representing the starting time</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_end_time: <span className="font-bold">{ get_end_time }</span></span>
//                 <div className="text-gray-700 text-xs">returns a Javascript Date object representing when the last point was recorded</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_moving_time: <span className="font-bold">{ get_moving_time }</span></span>
//                 <div className="text-gray-700 text-xs">returns the moving time, in milliseconds</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_total_time: <span className="font-bold">{ get_total_time }</span></span>
//                 <div className="text-gray-700 text-xs">returns the total track time, in milliseconds</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_moving_pace: <span className="font-bold">{ get_moving_pace }</span></span>
//                 <div className="text-gray-700 text-xs">returns the average moving pace in milliseconds per km</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_moving_speed: <span className="font-bold">{ get_moving_speed }</span></span>
//                 <div className="text-gray-700 text-xs">returns the average moving speed in km per hour</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_total_speed: <span className="font-bold">{ get_total_speed }</span></span>
//                 <div className="text-gray-700 text-xs">returns the average total speed in km per hour</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_elevation_min: <span className="font-bold">{ get_elevation_min }</span></span>
//                 <div className="text-gray-700 text-xs">returns the lowest elevation, in meters</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_elevation_max: <span className="font-bold">{ get_elevation_max }</span></span>
//                 <div className="text-gray-700 text-xs">returns the highest elevation, in meters</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_elevation_gain: <span className="font-bold">{ get_elevation_gain }</span></span>
//                 <div className="text-gray-700 text-xs">returns the cumulative elevation gain, in meters</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_elevation_loss: <span className="font-bold">{ get_elevation_loss }</span></span>
//                 <div className="text-gray-700 text-xs">returns the cumulative elevation loss, in meters</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_average_hr: <span className="font-bold">{ get_average_hr }</span></span>
//                 <div className="text-gray-700 text-xs">returns the average heart rate (if available)</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_average_cadence: <span className="font-bold">{ get_average_cadence }</span></span>
//                 <div className="text-gray-700 text-xs">returns the average cadence (if available)</div>
//             </div>
//             <div className="mb-2 text-sm text-gray-800">
//                 <span>get_average_temp: <span className="font-bold">{ get_average_temp }</span></span>
//                 <div className="text-gray-700 text-xs">returns the average of the temperature (if available)</div>
//             </div>
//         </>
//     );
// };
