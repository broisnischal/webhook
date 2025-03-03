// import axios from 'axios';

// // Figma API credentials

// // Figma API endpoint
// const FIGMA_URL = `https://api.figma.com/v1/files/${FILE_KEY}`;

// // Fetch file data
// const getFileData = async () => {
//     const response = await axios.get(FIGMA_URL, {
//         headers: {
//             'X-Figma-Token': FIGMA_TOKEN,
//         },
//     });

//     if (response.status === 200) {
//         return response.data;
//     } else {
//         throw new Error('Error fetching Figma file data');
//     }
// };

// // Extract colors from nodes
// const extractColors = (node: any): Array<[number, number, number]> => {
//     const colors: Array<[number, number, number]> = [];
//     if (node.fills) {
//         for (const fill of node.fills) {
//             if (fill.type === 'SOLID' && fill.color) {
//                 const { r, g, b } = fill.color;
//                 colors.push([r, g, b]);
//             }
//         }
//     }

//     if (node.children) {
//         for (const child of node.children) {
//             colors.push(...extractColors(child));
//         }
//     }

//     return colors;
// };

// // Convert RGB to HEX
// const rgbToHex = (rgb: [number, number, number]): string => {
//     const [r, g, b] = rgb;
//     return `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
// };

// // Main function to get colors
// const getColorsFromFigma = async () => {
//     try {
//         const data = await getFileData();
//         const document = data.document;

//         // Extract colors
//         let allColors: Array<[number, number, number]> = extractColors(document);

//         // Remove duplicates
//         allColors = Array.from(new Set(allColors.map(a => a.join(',')))).map(e => e.split(',').map(Number) as [number, number, number]);

//         // Convert to HEX and print
//         const hexColors = allColors.map(rgbToHex);
//         console.log('Unique colors in HEX:', hexColors);
//     } catch (error) {
//         console.error(error);
//     }
// };

// // Run the function
// getColorsFromFigma();

import * as Figma from 'figma-js';


const figma = Figma.Client({
    accessToken: 'figu_FsulaFpmhuDkGBjyhpShoWY0aoAw3lgUIm-XOieh',
    // personalAccessToken: 'figd_7J6IYLSgBSQvIJ3Xn5hxnB2dO6UPQSc0EOme0-vE'
})


// const file = figma.file('Dc8Zkm3raXmiXfPqHNcz7E').then(res => {
//     console.log(res.data)
// })

const FILE_ID = 'Dc8Zkm3raXmiXfPqHNcz7E';



// async function getColorStyles() {
//     try {
//         // Fetch file data from Figma
//         const { data } = await figma.file(FILE_ID);

//         const colorStyles = Object.values(data.styles).filter(style => style.styleType === 'FILL');
//         console.log('Color styles:', colorStyles);

//         // Extract color styles

//     } catch (error) {
//         console.error('Error fetching color styles:', error);
//     }
// }

// getColorStyles();

class FigmaColorWorker {
    private worker: Worker;

    constructor() {
        this.worker = new Worker(new URL('./figma.worker.ts', import.meta.url), {
            type: 'module'
        });
    }

    async getColors(fileId: string, accessToken: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.worker.onmessage = (event) => {
                if (event.data.type === 'SUCCESS') {
                    resolve(event.data.colors);
                } else if (event.data.type === 'ERROR') {
                    reject(new Error(event.data.error));
                }
            };

            this.worker.postMessage({
                fileId,
                accessToken
            });
        });
    }

    terminate() {
        this.worker.terminate();
    }
}

// Usage example:
const colorWorker = new FigmaColorWorker();

async function fetchFigmaColors() {
    try {
        const colors = await colorWorker.getColors(
            FILE_ID,
            'figu_FsulaFpmhuDkGBjyhpShoWY0aoAw3lgUIm-XOieh'
        );
        console.log('Fetched colors:', colors);
    } catch (error) {
        console.error('Error fetching colors:', error);
    } finally {
        colorWorker.terminate(); // Clean up the worker when done
    }
}

fetchFigmaColors();