import React, { useEffect } from "react";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";

import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { useDispatch } from "react-redux";
import { loadTrack } from "../../state/track/trackActions";

const uppy = Uppy({
  autoProceed: true,
  restrictions: {
    allowedFileTypes: [".kml"],
  },
});

const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = reject;

    fileReader.readAsText(file);
  });
};

export const TrackUploader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    uppy.on("file-added", async (file) => {
      // TODO: handle error state
      const track = await readFile(file.data);
      dispatch(loadTrack(track));
    });
  }, [dispatch]);

  return (
    <DragDrop
      uppy={uppy}
      locale={{
        strings: {
          dropHereOr: "Przeciągnij i upuść plik w formacie .kml lub %{browse}",
          browse: "przeglądaj",
        },
      }}
    />
  );
};
