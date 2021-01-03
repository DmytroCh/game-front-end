import React from 'react';
import '../css/content.css';
import '../css/loadingScreen.css';
import Canvas from "./Canvas";
import GameContext from '../Contexts/GameContext';
import {initWebSocketEvents} from '../Model/webSocketSupport.js';
import LoadingScreen from "./LoadingScreen";

export default class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                eventType: "type",
                response: {
                    isStarted: false
                }
            },
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
        //console.log(this.state);
    }

    loading(){
        // show loading screen until game start
        if(!this.state.data.response.isStarted){
            return <LoadingScreen/>
        }        
    }

    render(){
        return(
            <div>
                {this.loading()}
                <div id="content">
                    <GameContext.Provider value={this.state}>
                        <Canvas serverResponse={this.state}/>
                    </GameContext.Provider>
                </div>
            </div>
        )
    }
}