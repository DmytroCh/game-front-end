import React from 'react';
import openSocket from 'socket.io-client';
import '../css/content.css';
import Canvas from "./Canvas";


export default class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages:["Hi Joe"],
            actualValue:'',
            board: null,
            playerNo: null
        };
        this.socket = null;
    }

    componentDidMount(){        
        this.socket =openSocket('http://localhost:4000');

        this.socket.on('response', response => {
            console.log("response", response);
        });
        this.socket.on('new-player-joined', response => {
            console.log('new-player-joined', response);

        });
        this.socket.on('player-leave', response => {
            console.log('player-leave', response);
        });
        this.socket.on('start-game', response => {
            this.handleNewBoard(response);
            const player = response.players.find(player => player.id === this.socket.id);
            console.log("you are the player", player);
            this.setState({playerNo: player.startPosition});
            console.log('start-game', response);
        });
        this.socket.on('board-changes', response => {
            console.log('board-changes', response);
        });
    }

    handleNewBoard = (board) => {
        this.setState({
            board: board
        });
    }

    sendMessage = message => {
        console.log("message", message);
        this.setState(prevState =>{
            const updatedMessages = [...prevState.messages, message];
            return{
                messages: updatedMessages,
            };
        });
        console.log(this.state);
    };
    
    handleChange = event => {
        this.setState({actualValue: event.target.value});
    };

 
    handleSubmit = event => {
        console.log(event);
        /*this.sendMessage(this.state.actualValue);
        this.setState({actualValue:''}); */
        const frm = document.getElementsByName('sform')[0];
        frm.reset();
        event.preventDefault();
        const pown = this.state.board.powns.find(pown => pown.ownerId === this.socket.id);
        console.log("pownId", pown.id);
        this.socket.emit('new-move', pown.id);
    };

    render(){
        return(
            <div id="content">
                <Canvas/>
            </div>
        )
    }
}

/*
                <p>WebSockets test</p>
                <form name="sform" onSubmit={this.handleSubmit}>
                <label htmlFor="zipcode">Zip Code</label>
                    <input
                        className="form-control"
                        type="input"
                        name="message"
                        onChange={this.handleChange}/>
                    <button type="submit" className='btn btn-success'>Get the forecast!!</button>
                </form>
                <ul>
                    {this.state.messages.map(item => (
                    <li key={item}>{item}</li>
                    ))}
                </ul>
                <div>You are player No {this.state.playerNo}</div>*/