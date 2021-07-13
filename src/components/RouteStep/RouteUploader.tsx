import React, { useEffect } from "react";
import Uppy from "@uppy/core";
import { DragDrop } from "@uppy/react";

import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { useDispatch } from "react-redux";
import { addRoute } from "../../state/routes/routesActions";

const uppy = Uppy({
  autoProceed: true,
  restrictions: {
    allowedFileTypes: [".gpx"],
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

export const RouteUploader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    uppy.on("file-added", async (file) => {
      // TODO: handle error state
      const route = await readFile(file.data);
      dispatch(addRoute(file.name, route));
    });
  }, [dispatch]);

  return (
    <DragDrop
      uppy={uppy}
      locale={{
        strings: {
          dropHereOr: "Przeciągnij i upuść plik w formacie .gpx lub %{browse}",
          browse: "przeglądaj",
        },
      }}
    />
  );
};
