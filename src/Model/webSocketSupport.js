import openSocket from 'socket.io-client';

let socket = null;

/*const handleNewBoard = (board) => {
    this.setState({
        board: board
    });
}

const sendMessage = message => {
    console.log("message", message);
    this.setState(prevState =>{
        const updatedMessages = [...prevState.messages, message];
        return{
            messages: updatedMessages,
        };
    });
    console.log(this.state);
};

const handleChange = event => {
    this.setState({actualValue: event.target.value});
};


const handleSubmit = event => {
    console.log(event);
    /*this.sendMessage(this.state.actualValue);
    this.setState({actualValue:''});//
    const frm = document.getElementsByName('sform')[0];
    frm.reset();
    event.preventDefault();
    const pown = this.state.board.powns.find(pown => pown.ownerId === this.socket.id);
    console.log("pownId", pown.id);
    this.socket.emit('new-move', pown.id);
};*/


export const emitNewMove = (pownId) => {
    socket.emit('new-move', pownId);
};

export const initWebSocketEvents = (stateUpdate) => {
    socket = openSocket('http://localhost:4000');

    socket.on('new-player-joined', response => {
        console.log('new-player-joined', response);
        stateUpdate({
            data: {eventType: 'new-player-joined', response},
            socketId: socket.id
        });
    });
    socket.on('player-leave', response => {
        console.log('player-leave', response);
        stateUpdate({
            data: {eventType: 'player-leave', response},
            socketId: socket.id
        });
    });
    socket.on('start-game', response => {
        //handleNewBoard(response);
        //const player = response.players.find(player => player.id === this.socket.id);
        //console.log("you are the player", player);
        /*this.setState({playerNo: player.startPosition});*/
        console.log('start-game', response);
        stateUpdate({
            data: {eventType: 'start-game', response},
            socketId: socket.id
        });
    });
    socket.on('board-changes', response => {
        console.log('board-changes', response);
        stateUpdate({
            data: {eventType: 'board-changes', response},
            socketId: socket.id
        });
    });
}