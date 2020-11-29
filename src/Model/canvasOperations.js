import { emitNewMove } from "./webSocketSupport.js";
import * as cellsMap from "./cellsMap.js";

let canvasContext = null;
let canvasBackgroundLayer = null;
let canvasGameLayer = null;
let serverResponse = null;

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

let youSize = {
    width: 0,
    height: 0
}

let medalSize = {
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

    youSize = {
        width: 2 * board.width / 11,
        height: board.height / 11
    }

    medalSize = {
        width: board.width / 22,
        height: board.height / 22
    }

    boardSize = board;

    cellsMap.generateCellsMap(cellSize);
    cellsMap.generateHomeCellsMaps(cellSize);
    cellsMap.generateDicesMap(cellSize);
    cellsMap.generateYouMap(cellSize);
    cellsMap.generateMedalsMap(cellSize);
}

export const getPownSize = () => {
    return pownSize;
}

export const initCanvasObjects = (canvasCtx) => {
    canvasContext = canvasCtx;
    canvasBackgroundLayer = canvasCtx.canvasBackgroundLayer.current.getContext("2d");
    canvasGameLayer = canvasCtx.canvasGameLayer.current.getContext("2d");

    // Draw board
    const b = canvasCtx.board.current;
    b.onload = () => {
        canvasBackgroundLayer.drawImage(b, 0, 0);
      };

    canvasContext.canvasGameLayer.current.addEventListener('click', (event) => {
        let mousePosition = getMousePos(canvasContext.canvasGameLayer.current, event);
        console.log ("Mouse position", mousePosition);
        //console.log("context", canvasContext.context);
        const pownId = getClickedPown(mousePosition);
        console.log("Clicked pown", pownId);
        console.log("Is porper player", isYourTurn());

        if(isYourTurn()){
            emitNewMove(pownId);
        }
    });

}

// This method runs everytime when context changed
export const updateGame = (res, updateQueue) => {
    console.log("Response", res);
    if(res.data.hasOwnProperty("response")){
        serverResponse = res;
        canvasGameLayer.clearRect(0, 0, boardSize.width, boardSize.height);
        canvasGameLayer.beginPath();
        updateStartAreaPowns(res.data.response.powns);
        updateDice(res.data.response.dice, res.data.response.players);
        updatePowns(res.data.response.board, res.data.response.powns, res.data.response.players);
        updateMedals(res.data.response.players);
        drawYouText(res);
        updateQueue(-1);
    }
}

// This method revalidate homes after
const updateStartAreaPowns = (powns) => {
    let green = 0;
    let yellow = 0;
    let blue = 0;
    let red = 0;

    powns.forEach((pown => {
        if(pown.isStartArea){
            switch(pown.position){
                case 0:
                    drawStartAreaPown(canvasContext.green.current, pown.position + green);
                    green++;
                    break;
                case 10:
                    drawStartAreaPown(canvasContext.yellow.current, pown.position + yellow);
                    yellow++;
                    break;
                case 20:
                    drawStartAreaPown(canvasContext.blue.current, pown.position + blue);
                    blue++;
                    break;
                case 30:
                    drawStartAreaPown(canvasContext.red.current, pown.position + red);
                    red++;
                    break;
                default:
                    console.error("Incorrect pown's start position: ", pown.position);
            }
        }
    }));
}

// This method set medals for winners (only 1-3 places)
const updateMedals = (players) => {
    players.forEach((player => {
        if(player.place !== 0){
            const x = cellsMap.medalsMap[player.startPosition].x + medalSize.width / 2;
            const y = cellsMap.medalsMap[player.startPosition].y + medalSize.height / 2;
            const medalWidth = cellsMap.getMedals().width;
            const medalHeight = cellsMap.getMedals().height;

            switch(player.place){
                case 1:
                    const goldenStartX = cellsMap.getMedals().positions.golden.x;
                    const goldenStartY = cellsMap.getMedals().positions.golden.y;
                    canvasGameLayer.drawImage(canvasContext.medals.current,goldenStartX, goldenStartY, medalWidth,
                        medalHeight, x, y, medalSize.width, medalSize.height);
                    break;
                case 2:
                    const silverStartX = cellsMap.getMedals().positions.silver.x;
                    const silverStartY = cellsMap.getMedals().positions.silver.y;
                    canvasGameLayer.drawImage(canvasContext.medals.current,silverStartX, silverStartY, medalWidth,
                        medalHeight, x, y, medalSize.width, medalSize.height);
                    break;
                case 3:
                    const bronzeStartX = cellsMap.getMedals().positions.bronze.x;
                    const bronzeStartY = cellsMap.getMedals().positions.bronze.y;
                    canvasGameLayer.drawImage(canvasContext.medals.current,bronzeStartX, bronzeStartY, medalWidth,
                        medalHeight, x, y, medalSize.width, medalSize.height);
                    break;
                default:
            }
        }
    }));
}

// This method updates main lap
const updatePowns = (lap, powns, players) => {
    for(let i = 0; i < lap.length; i++){
        for(let j = 0; j < lap[i].length; j++){
            const pownSizeWidth = pownSize.width / lap[i].length;
            const pownSizeHeight = pownSize.height / lap[i].length;

            const pownX = cellsMap.cellsMap[i].x;
            const pownY = cellsMap.cellsMap[i].y;
            const pownImg = getPownImg(lap[i][j], powns, players);
            canvasGameLayer.drawImage(pownImg, pownX + pownSizeWidth * j, pownY + pownSizeHeight * j, pownSizeWidth, pownSizeHeight);
        }
    }
}

const updateDice = (dice, players) => {
    const playerPosition = players.find((player) => dice.playerId === player.id).startPosition;
    const x = cellsMap.dicesMap[playerPosition].x;
    const y = cellsMap.dicesMap[playerPosition].y;
    const diceImg = getDiceImg(dice);
    canvasGameLayer.drawImage(diceImg, x, y, 2 * pownSize.width, 2 * pownSize.height);
}

const drawStartAreaPown = (color, startAreaPosition) => {
    const x = cellsMap.cellsHomeMap[startAreaPosition].x;
    const y = cellsMap.cellsHomeMap[startAreaPosition].y;
    canvasGameLayer.drawImage(color, x, y, pownSize.width, pownSize.height);
}

const drawYouText = (res) => {
    const playerId = res.socketId;
    const playerPosition = res.data.response.players.find(player => playerId === player.id).startPosition;

    const x = cellsMap.youMap[playerPosition].x;
    const y = cellsMap.youMap[playerPosition].y;
    canvasGameLayer.drawImage(canvasContext.you.current, x, y, youSize.width, youSize.height);
}

// This method responsible for proper color of pown
const getPownImg = (pownId, powns, players) => {
    const pownOwnerId = powns.find((pown) => pown.id === pownId).ownerId;
    const ownerStartPosition = players.find((player) => player.id === pownOwnerId).startPosition;
    switch(ownerStartPosition * 10){
        case 0:
            return canvasContext.green.current;
        case 10:
            return canvasContext.yellow.current;
        case 20:
            return canvasContext.blue.current;
        case 30:
            return canvasContext.red.current;
        default:
            console.error("Incorrect Player start position: ", ownerStartPosition);
    }}

const getDiceImg = (dice) => {
    switch(dice.value){
        case 1:
            return canvasContext.diceOne.current;
        case 2:
            return canvasContext.diceTwo.current;
        case 3:
            return canvasContext.diceThree.current;
        case 4:
            return canvasContext.diceFour.current;
        case 5:
            return canvasContext.diceFive.current;
        case 6:
            return canvasContext.diceSix.current;
        default:
            console.error("Incorrect dice value: ", dice.value);
    } 
}

//Get Mouse Position in canvas
const getMousePos = (canvas, evt) => {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// This method retun pown id if clicked cell contains pown from this player
// if empthy field or enemies pown were clicked - null is returned
const getClickedPown = (mousePosition) => {
    if(serverResponse){
        const ownerStartPosition = serverResponse.data.response.players.find((player) => player.id === serverResponse.socketId).startPosition;
        const playerPowns = serverResponse.data.response.powns.filter(pown => pown.ownerId === serverResponse.socketId);
        const pownsAtStartArea = playerPowns.filter(pown => pown.isStartArea === true);
        console.log("Player start position", ownerStartPosition);
        // go through start area
        for(let i = 0; i < pownsAtStartArea.length; i ++){
            const arrayIndex = ownerStartPosition * 10 + i;
            if(mousePosition.x > cellsMap.cellsHomeMap[arrayIndex].x
                && mousePosition.x <= cellsMap.cellsHomeMap[arrayIndex].x + cellSize.width
                && mousePosition.y > cellsMap.cellsHomeMap[arrayIndex].y
                && mousePosition.y <= cellsMap.cellsHomeMap[arrayIndex].y + cellSize.height){
                    return pownsAtStartArea[i].id;
                }
        }
        // go through main lap
        for(let i = 0; i < cellsMap.cellsMap.length / 2; i++){
            // check if any cell from lap was clicked
            if(mousePosition.x > cellsMap.cellsMap[i].x
                && mousePosition.x <= cellsMap.cellsMap[i].x + cellSize.width
                && mousePosition.y > cellsMap.cellsMap[i].y
                && mousePosition.y <= cellsMap.cellsMap[i].y + cellSize.height){
                    // check if there is an pown of this player in clicked cell
                    const pown = serverResponse.data.response.board[i].find(pownId => {
                        return playerPowns.some(pown => pown.id === pownId);
                    });
                    if(pown === undefined)
                        return null;
                    else
                        return pown;
                    }
        }

        // go through home
        for(let i = 0; i < 4; i++){
            const arrayIndex = cellsMap.cellsMap.length / 2 + ownerStartPosition * 10 + i;
            if(mousePosition.x > cellsMap.cellsMap[arrayIndex].x
                && mousePosition.x <= cellsMap.cellsMap[arrayIndex].x + cellSize.width
                && mousePosition.y > cellsMap.cellsMap[arrayIndex].y
                && mousePosition.y <= cellsMap.cellsMap[arrayIndex].y + cellSize.height){
                    if(serverResponse.data.response.board[arrayIndex].length > 0){
                        return serverResponse.data.response.board[arrayIndex][0];
                    }
                }
        }
        return null;
    }

}

const isYourTurn = () => {
    if(serverResponse){
        if(serverResponse.socketId === serverResponse.data.response.dice.playerId)
            return true;
    }
    return false;
}
