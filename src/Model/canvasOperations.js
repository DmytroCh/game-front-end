import { emitNewMove } from "./webSocketSupport.js";
import * as cellsMap from "./cellsMap.js";
let pownSize = {
    width: 0,
    height: 0
}

let cellSize = {
    width: 0,
    height: 0
}

let boardSize = {
    width: 0,
    height: 0
}

export const setSizes = (board) => {
    pownSize = {
        width: board.width / 12,
        height: board.height / 12
    }

    cellSize = {
        width: board.width / 11,
        height: board.height / 11
    }

    boardSize = board;

    cellsMap.generateCellsMap (boardSize, cellSize);
}

export const getPownSize = () => {
    return pownSize;
}

export const initCanvasObjects = (canvasContext) => {
    const canvasBackgroundLayer = canvasContext.canvasBackgroundLayer.current.getContext("2d");
    const canvasGameLayer = canvasContext.canvasGameLayer.current.getContext("2d");
    canvasGameLayer.beginPath();

    // Draw board
    canvasContext.board.current.onload = () => {
        canvasBackgroundLayer.drawImage(canvasContext.board.current, 0, 0);
      };


    // draw yellow powns
    canvasContext.yellow.current.onload = () => {
        const x = 0;
        canvasGameLayer.drawImage(canvasContext.yellow.current, x, 0, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.yellow.current, x, pownSize.height, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.yellow.current, x, 2 * pownSize.height, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.yellow.current, x, 3 * pownSize.height, pownSize.width, pownSize.height);

    };

    // draw blue powns
    canvasContext.blue.current.onload = () => {
        const x = boardSize.width - pownSize.width;
        canvasGameLayer.drawImage(canvasContext.blue.current, x, 0, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.blue.current, x, pownSize.height, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.blue.current, x, 2 * pownSize.height, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.blue.current, x, 3 * pownSize.height, pownSize.width, pownSize.height);

    };

    // draw red powns
    canvasContext.red.current.onload = () => {
        const x = boardSize.width - pownSize.width;
        canvasGameLayer.drawImage(canvasContext.red.current, x, boardSize.height - pownSize.height, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.red.current, x, boardSize.height - 2 * pownSize.height, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.red.current, x, boardSize.height - 3 * pownSize.height, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.red.current, x, boardSize.height - 4 * pownSize.height, pownSize.width, pownSize.height);
    };

    // draw green powns
    canvasContext.green.current.onload = () => {
        canvasGameLayer.drawImage(canvasContext.green.current, 0, boardSize.height - pownSize.height, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.green.current, 0, boardSize.height - 2 * pownSize.height, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.green.current, 0, boardSize.height - 3 * pownSize.height, pownSize.width, pownSize.height);
        canvasGameLayer.drawImage(canvasContext.green.current, 0, boardSize.height - 4 * pownSize.height, pownSize.width, pownSize.height);
    };


    canvasContext.canvasGameLayer.current.addEventListener('click', (event) => {
        let mousePosition = getMousePos(canvasContext.canvasGameLayer.current, event);
        console.log ("Mouse position", mousePosition);
        emitNewMove("dfgfd");
        console.log("context", canvasContext.context);
        
        for(let i = 0; i < cellsMap.cellsMap.length; i++){
            setTimeout(() => {

                let pownX = cellsMap.cellsMap[i].x;
                let pownY = cellsMap.cellsMap[i].y;
                

                canvasGameLayer.clearRect(0, 0, boardSize.width, boardSize.height);
                canvasGameLayer.beginPath();

                canvasGameLayer.drawImage(canvasContext.green.current, pownX, pownY, pownSize.width, pownSize.height);
            }, i * 500);
        }
    });

}

//Get Mouse Position in canvas
const getMousePos = (canvas, evt) => {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
