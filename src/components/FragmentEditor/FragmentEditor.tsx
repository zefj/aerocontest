import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  getSelectedPolyline,
  findSelectedPolyline,
} from "../../state/routes/routesReducer";
import {
  deselectPolyline,
  overrideAnalysis,
} from "../../state/routes/routesActions";
import { Box, Flex, Heading } from "rebass";
import { space } from "../../styles/theme";
import { Button } from "../Button";
import { RouteFragment } from "../../types/routes";

export const calculateOfftrackInterval = (fragment: RouteFragment) => {
  return [fragment.latLngs[0], fragment.latLngs[fragment.latLngs.length - 1]];
};

export const FragmentEditor = () => {
  const dispatch = useDispatch();
  const selectedPolyline = useSelector(getSelectedPolyline);
  const selectedPolylineData = useSelector(findSelectedPolyline);

  if (!selectedPolyline || !selectedPolylineData) {
    return null;
  }

  const interval = calculateOfftrackInterval(selectedPolylineData);
  const start = moment(interval[0].meta.time);
  const end = moment(interval[1].meta.time);

  return (
    <Box
      variant="popup"
      sx={{
        position: "absolute",
        zIndex: 500,
        width: "100%",
        maxWidth: "300px",
        left: "500px",
        top: "0",
      }}
    >
      <Box variant="content">
        <Flex
          sx={{
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Heading variant="heading.h4">Edycja fragmentu</Heading>
            <Button
              onClick={() => dispatch(deselectPolyline())}
              variant="icon"
              icon="fa-fw fas fa-times"
              sx={{
                marginBottom: space["12"],
              }}
            />
          </Flex>

          <Box variant="container">
            {start.format("HH:mm:ss")} - {end.format("HH:mm:ss")}
          </Box>

          <Box sx={{ alignSelf: "flex-end" }}>
            {selectedPolylineData.type === "offtrack" && (
              <Button
                variant="greenOutline"
                onClick={() =>
                  dispatch(
                    overrideAnalysis(
                      selectedPolyline.id,
                      selectedPolyline.analysis_id,
                      "ontrack"
                    )
                  )
                }
              >
                Zalicz jako w trasie
              </Button>
            )}
            {selectedPolylineData.type === "ontrack" && (
              <Button
                variant="destructiveOutline"
                onClick={() =>
                  dispatch(
                    overrideAnalysis(
                      selectedPolyline.id,
                      selectedPolyline.analysis_id,
                      "offtrack"
                    )
                  )
                }
              >
                Zalicz jako poza trasą
              </Button>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
