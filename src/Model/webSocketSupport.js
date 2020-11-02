import openSocket from 'socket.io-client';

let socket = null;

export const emitNewMove = (pownId) => {
    socket.emit('new-move', pownId);
};

export const initWebSocketEvents = (stateUpdate) => {
    socket = openSocket('https://unlucky-wolverine-48.loca.lt/');

    socket.on('new-player-joined', response => {
        stateUpdate({
            data: {eventType: 'new-player-joined', response},
            socketId: socket.id
        });
    });
    socket.on('player-leave', response => {
        stateUpdate({
            data: {eventType: 'player-leave', response},
            socketId: socket.id
        });
    });
    socket.on('start-game', response => {
        stateUpdate({
            data: {eventType: 'start-game', response},
            socketId: socket.id
        });
    });
    socket.on('board-changes', response => {
        stateUpdate({
            data: {eventType: 'board-changes', response},
            socketId: socket.id
        });
    });
}