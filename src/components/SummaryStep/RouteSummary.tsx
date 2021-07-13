import React, { useMemo } from "react";
import moment from "moment";

import { GPX } from "leaflet";
import { Box, Flex, Heading, Text } from "rebass";
import { space } from "../../styles/theme";
import { Button } from "../Button";
import { GPXLatLng, Route, RouteFragments } from "../../types/routes";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../Table";

const RouteName = ({ name }: { name: string }) => {
  return (
    <Box>
      <Heading variant="routeName">{name}</Heading>
    </Box>
  );
};

export const RouteSummary = ({
  route,
  analysis,
  gpx,
}: {
  route: Route;
  analysis: RouteFragments | null;
  gpx: GPX;
}) => {
  return (
    <Box variant="container">
      <Flex
        mb={space["12"]}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RouteName name={route.name} />

        <Box sx={{ whiteSpace: "nowrap", flexShrink: 0 }}>
          <Button
            variant="secondaryOutline"
            mr="4"
            icon="fa-fw fas fa-eye"
            sx={{ height: "100%" }}
          />
        </Box>
      </Flex>

      {gpx && <RouteData route={gpx} />}

      {analysis && (
        <>
          <Heading variant="heading.h4">Precyzja lotu</Heading>
          <RouteAnalysisTable analysis={analysis} />
        </>
      )}
    </Box>
  );
};

const RouteData = ({ route }: { route: GPX }) => {
  // const get_name = route.get_name();
  const distance = route.get_distance();
  const get_start_time = route.get_start_time().toString();
  const get_end_time = route.get_end_time().toString();
  // const get_moving_time = route.get_moving_time();
  // const get_total_time = route.get_total_time();
  // const get_moving_pace = route.get_moving_pace();
  const get_moving_speed = route.get_moving_speed();
  const get_total_speed = route.get_total_speed();
  const get_elevation_min = route.get_elevation_min();
  const get_elevation_max = route.get_elevation_max();
  // const get_elevation_gain = route.get_elevation_gain();
  // const get_elevation_loss = route.get_elevation_loss();
  // const get_average_hr = route.get_average_hr();
  // const get_average_cadence = route.get_average_cadence();
  // const get_average_temp = route.get_average_temp();

  const routeLength = getFormattedDurationLength(
    moment(get_start_time),
    moment(get_end_time)
  );

  return (
    <>
      {/*<div className="mb-2 text-sm text-gray-800">*/}
      {/*    <span>get_name: <span className="font-bold">{ get_name }</span></span>*/}
      {/*    <div className="text-gray-700 text-xs">returns the name of the GPX track</div>*/}
      {/*</div>*/}
      <Box variant="routeSummary">
        <span>Początek trasy: </span>
        <Text fontWeight="bold">{moment(get_start_time).format()}</Text>
      </Box>
      <Box variant="routeSummary">
        <span>Koniec trasy: </span>
        <Text fontWeight="bold">{moment(get_end_time).format()}</Text>
      </Box>
      {/*<Box variant="routeSummary">*/}
      {/*    <span>Czas trasy w minutach: </span>*/}
      {/*    <Text fontWeight="bold">{ get_moving_time / 1000 / 60 }</Text>*/}
      {/*    <div className="text-gray-700 text-xs">returns the moving time, in milliseconds</div>*/}
      {/*</Box>*/}
      <Box variant="routeSummary">
        <span>Długość trasy:</span>
        <Text fontWeight="bold">{routeLength}</Text>
      </Box>
      <Box variant="routeSummary">
        <span>Pokonany dystans:</span>
        <Text fontWeight="bold">{distance.toFixed(2)} m</Text>
      </Box>
      {/*<Box variant="routeSummary">*/}
      {/*    <span>get_moving_pace: </span>*/}
      {/*    <Text fontWeight="bold">{ get_moving_pace }</Text>*/}
      {/*    <div className="text-gray-700 text-xs">returns the average moving pace in milliseconds per km</div>*/}
      {/*</Box>*/}
      <Box variant="routeSummary">
        <span>Średnia prędkość w ruchu: </span>
        <Text fontWeight="bold">{get_moving_speed.toFixed(2)} km/h</Text>
      </Box>
      <Box variant="routeSummary">
        <span>Średnia prędkość dla całej trasy: </span>
        <Text fontWeight="bold">{get_total_speed.toFixed(2)} km/h</Text>
      </Box>
      <Box variant="routeSummary">
        <span>Minimalna wysokość nad poziomem morza: </span>
        <Text fontWeight="bold">{get_elevation_min} m</Text>
      </Box>
      <Box variant="routeSummary">
        <span>Maksymalna wysokość nad poziomem morza: </span>
        <Text fontWeight="bold">{get_elevation_max} m</Text>
      </Box>
      {/*<Box variant="routeSummary">*/}
      {/*    <span>get_elevation_gain: </span>*/}
      {/*    <Text fontWeight="bold">{ get_elevation_gain }</Text>*/}
      {/*    <div className="text-gray-700 text-xs">returns the cumulative elevation gain, in meters</div>*/}
      {/*</Box>*/}
      {/*<Box variant="routeSummary">*/}
      {/*    <span>get_elevation_loss: </span>*/}
      {/*    <Text fontWeight="bold">{ get_elevation_loss }</Text>*/}
      {/*    <div className="text-gray-700 text-xs">returns the cumulative elevation loss, in meters</div>*/}
      {/*</Box>*/}
      {/*<div className="mb-2 text-sm text-gray-800">*/}
      {/*    <span>get_average_hr: <span className="font-bold">{ get_average_hr }</span></span>*/}
      {/*    <div className="text-gray-700 text-xs">returns the average heart rate (if available)</div>*/}
      {/*</div>*/}
      {/*<div className="mb-2 text-sm text-gray-800">*/}
      {/*    <span>get_average_cadence: <span className="font-bold">{ get_average_cadence }</span></span>*/}
      {/*    <div className="text-gray-700 text-xs">returns the average cadence (if available)</div>*/}
      {/*</div>*/}
      {/*<div className="mb-2 text-sm text-gray-800">*/}
      {/*    <span>get_average_temp: <span className="font-bold">{ get_average_temp }</span></span>*/}
      {/*    <div className="text-gray-700 text-xs">returns the average of the temperature (if available)</div>*/}
      {/*</div>*/}
    </>
  );
};

const calculateOfftrackIntervals = (analysis: RouteFragments) => {
  return analysis
    .map((value) => {
      if (value.type === "ontrack") {
        return [];
      }

      return [value.latLngs[0], value.latLngs[value.latLngs.length - 1]];
    })
    .filter((e) => e.length);
};

const sumOfftrackIntervals = (offtrackIntervals: GPXLatLng[][]) => {
  const secondsSum = offtrackIntervals.reduce(
    (carry: number, value: GPXLatLng[]) => {
      const start = moment(value[0].meta.time);
      const end = moment(value[1].meta.time);
      const diff = end.diff(start);

      carry += diff;
      return carry;
    },
    0
  );

  return moment.utc(secondsSum).format("HH:mm:ss");
};

// TODO: milliseconds should probably be rounded off, to avoid issues with comparison (30.000 - 20.999 = 21)
// maybe not necessarily here though, maybe somewhere closer to route analysis?
// TODO: does not handle diffs larger than 24 hours, figure out a better solution
const getFormattedDurationLength = (
  start: moment.Moment,
  end: moment.Moment
) => {
  const diff = end.diff(start);
  return moment.utc(diff).format("HH:mm:ss");
};

const RouteAnalysisTable = ({ analysis }: { analysis: RouteFragments }) => {
  const offtrackIntervals = useMemo(
    () => calculateOfftrackIntervals(analysis),
    [analysis]
  );
  const offtrackIntervalsSum = useMemo(
    () => sumOfftrackIntervals(offtrackIntervals),
    [offtrackIntervals]
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>LP.</TableHeadCell>
          <TableHeadCell>Opuszczenie trasy</TableHeadCell>
          <TableHeadCell>Powrót na trasę</TableHeadCell>
          <TableHeadCell>Czas poza trasą</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {offtrackIntervals.map((interval, index) => {
          const start = moment(interval[0].meta.time);
          const end = moment(interval[1].meta.time);

          return (
            <TableRow key={index}>
              <TableDataCell>{index + 1}</TableDataCell>
              <TableDataCell>{start.format("HH:mm:ss")}</TableDataCell>
              <TableDataCell>{end.format("HH:mm:ss")}</TableDataCell>
              <TableDataCell>
                {getFormattedDurationLength(start, end)}
              </TableDataCell>
            </TableRow>
          );
        })}

        {!offtrackIntervals.length && (
          <TableRow>
            <TableDataCell>-</TableDataCell>
            <TableDataCell>-</TableDataCell>
            <TableDataCell>-</TableDataCell>
            <TableDataCell>-</TableDataCell>
          </TableRow>
        )}

        <TableRow sx={{ fontWeight: "bold" }}>
          <TableDataCell colSpan={3} sx={{ textAlign: "left" }}>
            Łącznie
          </TableDataCell>
          <TableDataCell>{offtrackIntervalsSum}</TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
