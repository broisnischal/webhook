import * as Figma from 'figma-js';

// Handle messages from the main thread
self.addEventListener('message', async (event) => {
    const { fileId, accessToken } = event.data;

    try {
        const figma = Figma.Client({
            accessToken: accessToken
        });

        // Fetch file data from Figma
        const { data } = await figma.file(fileId);

        const colorValue = (key: string) => {
            const component = data.document.children.find(child => child.id === key);
            if (!component) return null;

            return component;

        }


        // Extract color styles
        const colorStyles = Object.values(data.styles)
            .filter(style => style.styleType === 'FILL')
            .map(style => ({
                name: style.name,
                type: style.styleType,
                key: style.key,
                colorvalue: colorValue(style.key)
            }));



        // Send the results back to the main thread
        self.postMessage({
            type: 'SUCCESS',
            colors: colorStyles
        });

    } catch (error) {
        self.postMessage({
            type: 'ERROR',
            error: error
        });
    }
});
