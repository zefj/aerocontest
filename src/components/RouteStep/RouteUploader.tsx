import React, { useEffect } from 'react';
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';

import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import { useRoutes } from '../../hooks/useRoutes';

const uppy = Uppy({
    autoProceed: true,
    restrictions: {
        allowedFileTypes: ['.gpx'],
    }
});

const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.onerror = reject;

        fileReader.readAsText(file);
    })
};

export const RouteUploader = () => {
    const { addRoute } = useRoutes();

    useEffect(() => {
        uppy.on('file-added', async (file) => {
            // TODO: handle error state
            const route = await readFile(file.data);
            addRoute(file.name, route);
        });
    }, []);

    return (
        <DragDrop uppy={uppy} />
    );
};
