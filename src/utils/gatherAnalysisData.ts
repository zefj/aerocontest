import { GPX } from "leaflet";
import moment from "moment";
import { GPXLatLng, RouteFragments } from "../types/routes";

export type AnalysisDataOfftrackIntervals = {
  index: number;
  start: string;
  end: string;
  duration: string;
};

export type AnalysisData = {
  startTime: string;
  endTime: string;
  routeLength: string;
  distance: string;
  movingSpeed: string;
  totalSpeed: string;
  elevationMin: string;
  elevationMax: string;
  offtrackIntervals: AnalysisDataOfftrackIntervals[];
  offtrackIntervalsSum: string;
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

export const gatherAnalysisData = (
  gpx: GPX,
  analysis: RouteFragments | null
): AnalysisData => {
  // const get_name = gpx.get_name();
  const distance = gpx.get_distance();
  const get_start_time = gpx.get_start_time().toString();
  const get_end_time = gpx.get_end_time().toString();
  // const get_moving_time = gpx.get_moving_time();
  // const get_total_time = gpx.get_total_time();
  // const get_moving_pace = gpx.get_moving_pace();
  const get_moving_speed = gpx.get_moving_speed();
  const get_total_speed = gpx.get_total_speed();
  const get_elevation_min = gpx.get_elevation_min();
  const get_elevation_max = gpx.get_elevation_max();
  // const get_elevation_gain = gpx.get_elevation_gain();
  // const get_elevation_loss = gpx.get_elevation_loss();
  // const get_average_hr = gpx.get_average_hr();
  // const get_average_cadence = gpx.get_average_cadence();
  // const get_average_temp = gpx.get_average_temp();

  const routeLength = getFormattedDurationLength(
    moment(get_start_time),
    moment(get_end_time)
  );

  const offtrackIntervals = calculateOfftrackIntervals(analysis || []);
  const offtrackIntervalsSum = sumOfftrackIntervals(offtrackIntervals);

  return {
    startTime: moment(get_start_time).format(),
    endTime: moment(get_end_time).format(),
    routeLength,
    distance: `${distance.toFixed(2)} m`,
    movingSpeed: `${get_moving_speed.toFixed(2)} km/h`,
    totalSpeed: `${get_total_speed.toFixed(2)} km/h`,
    elevationMin: `${get_elevation_min} m`,
    elevationMax: `${get_elevation_max} m`,
    offtrackIntervals: offtrackIntervals.map((interval, index) => {
      const start = moment(interval[0].meta.time);
      const end = moment(interval[1].meta.time);

      return {
        index: index + 1,
        start: start.format("HH:mm:ss"),
        end: end.format("HH:mm:ss"),
        duration: getFormattedDurationLength(start, end),
      };
    }),
    offtrackIntervalsSum,
  };
};
