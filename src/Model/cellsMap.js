export const cellsMap = Array(80).fill({x: -1, y: -1});
export const cellsHomeMap = Array(40).fill({x: -1, y: -1});
export const dicesMap = Array(4).fill({x: -1, y: -1});
export const youMap = Array(4).fill({x: -1, y: -1});
export const medalsMap = Array(4).fill({x: -1, y: -1});

// This method creates array of left top cell possiton.
// Required for powns navigation
// It has same size as "board", in server response and can be mapped 1:1
export const generateCellsMap = (cellSize) => {
    // Main lap
    cellsMap[0] = {x: 4 * cellSize.width, y: 10 * cellSize.height}
    cellsMap[1] = {x: 4 * cellSize.width, y: 9 * cellSize.height}
    cellsMap[2] = {x: 4 * cellSize.width, y: 8 * cellSize.height}
    cellsMap[3] = {x: 4 * cellSize.width, y: 7 * cellSize.height}
    cellsMap[4] = {x: 4 * cellSize.width, y: 6 * cellSize.height}
    cellsMap[5] = {x: 3 * cellSize.width, y: 6 * cellSize.height}
    cellsMap[6] = {x: 2 * cellSize.width, y: 6 * cellSize.height}
    cellsMap[7] = {x: 1 * cellSize.width, y: 6 * cellSize.height}
    cellsMap[8] = {x: 0 * cellSize.width, y: 6 * cellSize.height}
    cellsMap[9] = {x: 0 * cellSize.width, y: 5 * cellSize.height}
    cellsMap[10] = {x: 0 * cellSize.width, y: 4 * cellSize.height}
    cellsMap[11] = {x: 1 * cellSize.width, y: 4 * cellSize.height}
    cellsMap[12] = {x: 2 * cellSize.width, y: 4 * cellSize.height}
    cellsMap[13] = {x: 3 * cellSize.width, y: 4 * cellSize.height}
    cellsMap[14] = {x: 4 * cellSize.width, y: 4 * cellSize.height}
    cellsMap[15] = {x: 4 * cellSize.width, y: 3 * cellSize.height}
    cellsMap[16] = {x: 4 * cellSize.width, y: 2 * cellSize.height}
    cellsMap[17] = {x: 4 * cellSize.width, y: 1 * cellSize.height}
    cellsMap[18] = {x: 4 * cellSize.width, y: 0 * cellSize.height}
    cellsMap[19] = {x: 5 * cellSize.width, y: 0 * cellSize.height}
    cellsMap[20] = {x: 6 * cellSize.width, y: 0 * cellSize.height}
    cellsMap[21] = {x: 6 * cellSize.width, y: 1 * cellSize.height}
    cellsMap[22] = {x: 6 * cellSize.width, y: 2 * cellSize.height}
    cellsMap[23] = {x: 6 * cellSize.width, y: 3 * cellSize.height}
    cellsMap[24] = {x: 6 * cellSize.width, y: 4 * cellSize.height}
    cellsMap[25] = {x: 7 * cellSize.width, y: 4 * cellSize.height}
    cellsMap[26] = {x: 8 * cellSize.width, y: 4 * cellSize.height}
    cellsMap[27] = {x: 9 * cellSize.width, y: 4 * cellSize.height}
    cellsMap[28] = {x: 10 * cellSize.width, y: 4 * cellSize.height}
    cellsMap[29] = {x: 10 * cellSize.width, y: 5 * cellSize.height}
    cellsMap[30] = {x: 10 * cellSize.width, y: 6 * cellSize.height}
    cellsMap[31] = {x: 9 * cellSize.width, y: 6 * cellSize.height}
    cellsMap[32] = {x: 8 * cellSize.width, y: 6 * cellSize.height}
    cellsMap[33] = {x: 7 * cellSize.width, y: 6 * cellSize.height}
    cellsMap[34] = {x: 6 * cellSize.width, y: 6 * cellSize.height}
    cellsMap[35] = {x: 6 * cellSize.width, y: 7 * cellSize.height}
    cellsMap[36] = {x: 6 * cellSize.width, y: 8 * cellSize.height}
    cellsMap[37] = {x: 6 * cellSize.width, y: 9 * cellSize.height}
    cellsMap[38] = {x: 6 * cellSize.width, y: 10 * cellSize.height}
    cellsMap[39] = {x: 5 * cellSize.width, y: 10 * cellSize.height}

    // Green Bases
    cellsMap[40] = {x: 5 * cellSize.width, y: 9 * cellSize.height}
    cellsMap[41] = {x: 5 * cellSize.width, y: 8 * cellSize.height}
    cellsMap[42] = {x: 5 * cellSize.width, y: 7 * cellSize.height}
    cellsMap[43] = {x: 5 * cellSize.width, y: 6 * cellSize.height}

    // Yellow Bases
    cellsMap[50] = {x: 1 * cellSize.width, y: 5 * cellSize.height}
    cellsMap[51] = {x: 2 * cellSize.width, y: 5 * cellSize.height}
    cellsMap[52] = {x: 3 * cellSize.width, y: 5 * cellSize.height}
    cellsMap[53] = {x: 4 * cellSize.width, y: 5 * cellSize.height}

    // Blue Bases
    cellsMap[60] = {x: 5 * cellSize.width, y: 1 * cellSize.height}
    cellsMap[61] = {x: 5 * cellSize.width, y: 2 * cellSize.height}
    cellsMap[62] = {x: 5 * cellSize.width, y: 3 * cellSize.height}
    cellsMap[63] = {x: 5 * cellSize.width, y: 4 * cellSize.height}

    // Red Bases
    cellsMap[70] = {x: 9 * cellSize.width, y: 5 * cellSize.height}
    cellsMap[71] = {x: 8 * cellSize.width, y: 5 * cellSize.height}
    cellsMap[72] = {x: 7 * cellSize.width, y: 5 * cellSize.height}
    cellsMap[73] = {x: 6 * cellSize.width, y: 5 * cellSize.height}
}

export const generateHomeCellsMaps = (cellSize) => {
    // Green home
    cellsHomeMap[0] = {x: 0 * cellSize.width, y: 10 * cellSize.height}
    cellsHomeMap[1] = {x: 0 * cellSize.width, y: 9 * cellSize.height}
    cellsHomeMap[2] = {x: 0 * cellSize.width, y: 8 * cellSize.height}
    cellsHomeMap[3] = {x: 0 * cellSize.width, y: 7 * cellSize.height}

    // Yellow home
    cellsHomeMap[10] = {x: 0 * cellSize.width, y: 0 * cellSize.height}
    cellsHomeMap[11] = {x: 0 * cellSize.width, y: 1 * cellSize.height}
    cellsHomeMap[12] = {x: 0 * cellSize.width, y: 2 * cellSize.height}
    cellsHomeMap[13] = {x: 0 * cellSize.width, y: 3 * cellSize.height}
    
    // Blue home
    cellsHomeMap[20] = {x: 10 * cellSize.width, y: 0 * cellSize.height}
    cellsHomeMap[21] = {x: 10 * cellSize.width, y: 1 * cellSize.height}
    cellsHomeMap[22] = {x: 10 * cellSize.width, y: 2 * cellSize.height}
    cellsHomeMap[23] = {x: 10 * cellSize.width, y: 3 * cellSize.height}

    // Red home
    cellsHomeMap[30] = {x: 10 * cellSize.width, y: 10 * cellSize.height}
    cellsHomeMap[31] = {x: 10 * cellSize.width, y: 9 * cellSize.height}
    cellsHomeMap[32] = {x: 10 * cellSize.width, y: 8 * cellSize.height}
    cellsHomeMap[33] = {x: 10 * cellSize.width, y: 7 * cellSize.height}
}

export const generateDicesMap = (cellSize) => {
    //Player one
    dicesMap[0] = {x: 1 * cellSize.width, y: 8 * cellSize.height}
    //Player two
    dicesMap[1] = {x: 1 * cellSize.width, y: 1 * cellSize.height}
    //Player three
    dicesMap[2] = {x: 8 * cellSize.width, y: 1 * cellSize.height}
    //Player four
    dicesMap[3] = {x: 8 * cellSize.width, y: 8 * cellSize.height}
}

export const generateYouMap = (cellSize) => {
    //Player one
    youMap[0] = {x: 1 * cellSize.width, y: 7 * cellSize.height}
    //Player two
    youMap[1] = {x: 1 * cellSize.width, y: 0 * cellSize.height}
    //Player three
    youMap[2] = {x: 8 * cellSize.width, y: 0 * cellSize.height}
    //Player four
    youMap[3] = {x: 8 * cellSize.width, y: 7 * cellSize.height}
}

export const generateMedalsMap = (cellSize) => {
    //Player one
    medalsMap[0] = {x: 3 * cellSize.width, y: 7 * cellSize.height}
    //Player two
    medalsMap[1] = {x: 3 * cellSize.width, y: 0 * cellSize.height}
    //Player three
    medalsMap[2] = {x: 7 * cellSize.width, y: 0 * cellSize.height}
    //Player four
    medalsMap[3] = {x: 7 * cellSize.width, y: 7 * cellSize.height}
}