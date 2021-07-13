import React from "react";
import { TrackUploader } from "../TrackDrawer/TrackUploader";
import { Box } from "rebass";

export const TrackStep: React.FC = () => {
  return (
    <>
      <Box variant="container">
        <TrackUploader />
      </Box>
    </>
  );
};
