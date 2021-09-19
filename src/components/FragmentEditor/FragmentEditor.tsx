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
import { Alert } from "../Alert";
import { RouteFragment } from "../../types/routes";

export const calculateOfftrackInterval = (fragment: RouteFragment) => {
  return [fragment.latLngs[0], fragment.latLngs[fragment.latLngs.length - 1]];
};

export const FragmentEditor = ({
  sidebarCollapsed,
}: {
  sidebarCollapsed: boolean;
}) => {
  const dispatch = useDispatch();
  const selectedPolyline = useSelector(getSelectedPolyline);
  const selectedPolylineData = useSelector(findSelectedPolyline);

  if (!selectedPolyline || !selectedPolylineData) {
    return null;
  }

  const interval = calculateOfftrackInterval(selectedPolylineData);
  const start = moment(interval[0].meta.time);
  const end = moment(interval[1].meta.time);

  const showOverrideOfftrackButton =
    selectedPolylineData.type === "ontrack" ||
    selectedPolylineData.type === "unknown";
  const showOverrideOntrackButton =
    selectedPolylineData.type === "offtrack" ||
    selectedPolylineData.type === "unknown";
  const showOverrideUnknownButton =
    selectedPolylineData.type === "offtrack" ||
    selectedPolylineData.type === "ontrack";

  return (
    <Box
      variant="popup"
      className="fragmentEditor"
      sx={{
        position: "absolute",
        zIndex: 500,
        width: "100%",
        maxWidth: "300px",
        left: sidebarCollapsed ? "110px" : "500px",
        top: "0",
        transition: "left 100ms ease-in-out",
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
          {selectedPolylineData.type === "unknown" && (
            <Alert icon="fa-fw fas fa-exclamation">
              Gdy różnica pomiędzy kolejnymi odczytami pozycji wynosi więcej niż
              10 sekund, fragment jest automatycznie zaliczany jako{" "}
              <b>Brak GPS</b>. Podczas analizy, te fragmenty traktowane są jako{" "}
              <b>poza trasą</b>.
            </Alert>
          )}
          <Box variant="label">Zalicz jako:</Box>
          <Flex>
            {showOverrideOntrackButton && (
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
                sx={{
                  width: "100%",
                  marginRight: space["4"],
                }}
              >
                W trasie
              </Button>
            )}
            {showOverrideOfftrackButton && (
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
                sx={{
                  width: "100%",
                  marginRight: space["4"],
                }}
              >
                Poza trasą
              </Button>
            )}
            {showOverrideUnknownButton && (
              <Button
                variant="grayOutline"
                onClick={() =>
                  dispatch(
                    overrideAnalysis(
                      selectedPolyline.id,
                      selectedPolyline.analysis_id,
                      "unknown"
                    )
                  )
                }
                sx={{
                  width: "100%",
                }}
              >
                Brak GPS
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
