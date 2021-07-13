import React from "react";
import { TrackUploader } from "../TrackDrawer/TrackUploader";
import { Box, Text } from "rebass";

export const TrackStep: React.FC = () => {
  return (
    <>
      <Box variant="container">
        <TrackUploader />
      </Box>

      <Box variant="container">
        <Text>
          Załaduj plik w formacie <code>.kml</code> powyżej, lub użyj przycisków
          po prawej, by wyrysować trasę.
        </Text>
      </Box>
    </>
  );
};
