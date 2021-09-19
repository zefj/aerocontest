import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { GPX } from "leaflet";
import { Box, Flex, Heading, Text } from "rebass";
import { space } from "../../styles/theme";
import { Route, RouteFragments } from "../../types/routes";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../Table";
import {
  AnalysisData,
  AnalysisDataOfftrackIntervals,
  gatherAnalysisData,
} from "../../utils/gatherAnalysisData";
import { getSelectedPolyline } from "../../state/routes/routesReducer";

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
  if (!analysis) {
    return null;
  }

  const data = gatherAnalysisData(gpx, analysis);

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

        {/* <Box sx={{ whiteSpace: "nowrap", flexShrink: 0 }}>
          <Button
            variant="secondaryOutline"
            mr="4"
            icon="fa-fw fas fa-eye"
            sx={{ height: "100%" }}
          />
        </Box> */}
      </Flex>

      {gpx && <RouteData data={data} />}

      {analysis && (
        <>
          <Heading variant="heading.h4">Precyzja lotu</Heading>
          <RouteAnalysisTable data={data} />
        </>
      )}
    </Box>
  );
};

const RouteData = ({ data }: { data: AnalysisData }) => {
  return (
    <>
      {/*<div className="mb-2 text-sm text-gray-800">*/}
      {/*    <span>get_name: <span className="font-bold">{ get_name }</span></span>*/}
      {/*    <div className="text-gray-700 text-xs">returns the name of the GPX track</div>*/}
      {/*</div>*/}
      <Box variant="routeSummary">
        <span>Początek</span>
        <Text fontWeight="bold">{data.startTime}</Text>
      </Box>
      <Box variant="routeSummary">
        <span>Koniec</span>
        <Text fontWeight="bold">{data.endTime}</Text>
      </Box>
      {/*<Box variant="routeSummary">*/}
      {/*    <span>Czas trasy w minutach</span>*/}
      {/*    <Text fontWeight="bold">{ get_moving_time / 1000 / 60 }</Text>*/}
      {/*    <div className="text-gray-700 text-xs">returns the moving time, in milliseconds</div>*/}
      {/*</Box>*/}
      <Box variant="routeSummary">
        <span>Długość</span>
        <Text fontWeight="bold">{data.routeLength}</Text>
      </Box>
      <Box variant="routeSummary">
        <span>Pokonany dystans</span>
        <Text fontWeight="bold">{data.distance}</Text>
      </Box>
      {/*<Box variant="routeSummary">*/}
      {/*    <span>get_moving_pace </span>*/}
      {/*    <Text fontWeight="bold">{ get_moving_pace }</Text>*/}
      {/*    <div className="text-gray-700 text-xs">returns the average moving pace in milliseconds per km</div>*/}
      {/*</Box>*/}
      <Box variant="routeSummary">
        <span>Średnia prędkość w ruchu</span>
        <Text fontWeight="bold">{data.movingSpeed}</Text>
      </Box>
      <Box variant="routeSummary">
        <span>Średnia prędkość dla całego przebiegu</span>
        <Text fontWeight="bold">{data.totalSpeed}</Text>
      </Box>
      <Box variant="routeSummary">
        <span>Minimalna wysokość nad poziomem morza</span>
        <Text fontWeight="bold">{data.elevationMin}</Text>
      </Box>
      <Box variant="routeSummary">
        <span>Maksymalna wysokość nad poziomem morza</span>
        <Text fontWeight="bold">{data.elevationMax}</Text>
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

const AnalysisRow = ({
  interval,
  isSelected,
}: {
  interval: AnalysisDataOfftrackIntervals;
  isSelected: boolean;
}) => {
  const ref = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isSelected]);

  return (
    <TableRow
      ref={ref}
      key={`offtrack-interval-${interval.id}`}
      variant={isSelected ? "highlightedRow" : undefined}
    >
      <TableDataCell>{interval.index}</TableDataCell>
      <TableDataCell>{interval.start}</TableDataCell>
      <TableDataCell>{interval.end}</TableDataCell>
      <TableDataCell>{interval.duration}</TableDataCell>
    </TableRow>
  );
};

const RouteAnalysisTable = ({ data }: { data: AnalysisData }) => {
  const selectedPolyline = useSelector(getSelectedPolyline);

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
        {data.offtrackIntervals.map((interval) => {
          return (
            <AnalysisRow
              interval={interval}
              isSelected={selectedPolyline?.id === interval.id}
            />
          );
        })}

        {!data.offtrackIntervals.length && (
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
          <TableDataCell>{data.offtrackIntervalsSum}</TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
