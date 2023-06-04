//import jsonFile from "./jj50/VIA/kprepublic_jj50.json" assert {type: "json"};
import { readFile } from 'fs/promises';

const run = async () => {
    const json = JSON.parse(await readFile(new URL("./jj50/VIA/kprepublic_jj50.json", import.meta.url)));
    const jsonLayers = json.layers;

    const resultLayers = [];

    jsonLayers.map((layer, i) => {
        const layerChunks = chunkIntoN(layer, 10);
        const fixedRows = [[],[],[],[],[]];

        fixedRows[0] = [...layerChunks[0], ...layerChunks[4]];
        fixedRows[1] = [...layerChunks[1], ...layerChunks[5]];
        fixedRows[2] = [...layerChunks[2], ...layerChunks[6]];
        fixedRows[3] = [...layerChunks[3], ...layerChunks[7]];

        // Why the fuck is the bottom row arranged like this?!
        const one = layerChunks[8].slice(0, 3);
        const two = layerChunks[9].slice(3, );
        const three = layerChunks[9].slice(0, 3);
        const four = layerChunks[8].slice(3, );

        fixedRows[4] = [...one, ...two, ...three, ...four];

        resultLayers.push([...fixedRows[0], ...fixedRows[1], ...fixedRows[2], ...fixedRows[3], ...fixedRows[4]]);
    })

    const fixedJson = JSON.stringify(resultLayers, "", 4);
    console.log(fixedJson);
}

const chunkIntoN = (arr, n) => {
    const size = Math.ceil(arr.length / n);
    return Array.from({ length: n }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
}

run();