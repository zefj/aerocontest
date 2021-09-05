import React, { useEffect } from "react";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";

import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { useDispatch } from "react-redux";
import { addRoute } from "../../state/routes/routesActions";
import { loadTrack } from "../../state/track/trackActions";

const uppy = Uppy({
  autoProceed: true,
  restrictions: {
    allowedFileTypes: [".gpx", ".kml"],
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

export const Uploader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    uppy.on("file-added", async (file) => {
      console.info(file);
      // TODO: handle error state
      const content = await readFile(file.data);

      if (file.extension === "gpx") {
        dispatch(addRoute(file.name, content));
      } else if (file.extension === "kml") {
        dispatch(loadTrack(content));
      }
    });
  }, []);

  return (
    <DragDrop
      uppy={uppy}
      locale={{
        strings: {
          dropHereOr:
            "Przeciągnij i upuść pliki lub %{browse} (dozwolone formaty: .gpx, .kml)",
          browse: "przeglądaj",
        },
      }}
    />
  );
};
