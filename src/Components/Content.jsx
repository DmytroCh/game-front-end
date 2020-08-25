import React from 'react';
import '../css/content.css';
import Canvas from "./Canvas";
import GameContext from '../Contexts/GameContext';
import {initWebSocketEvents} from '../Model/webSocketSupport.js';

export default class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {eventType: "type"},
            socketId: "socket id"
        }
    }

    componentDidMount(){        
        initWebSocketEvents(this.updateState);
    }

    /*e.g. data: {eventType: new-player-joined,
    response: [server response]}*/
    updateState = (data) => {
        this.setState(data);
        console.log(this.state);
    }

    render(){
        return(
            <div id="content">
                <GameContext.Provider value={this.state}>
                    <Canvas serverResponse={this.state}/>
                </GameContext.Provider>
            </div>
        )
    }
}