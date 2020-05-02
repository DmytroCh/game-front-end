import React from 'react';
import '../css/canvas.css';

export default class Canvas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            height: window.innerHeight,
            width: window.innerHeight
        }
    }

    componentDidMount(){
        const canvas = this.refs.canvas;
        const boardImg = this.refs.board;
        const ctx = canvas.getContext("2d");
        /*const path = new Path2D("board");
        ctx.stroke(path);*/
        boardImg.onload = () => {
            ctx.drawImage(boardImg,0,0);
        }
        
    }


    render(){
        return(
            <div id="canvas-wrap">
                <canvas ref="canvas" width={this.state.height} height={this.state.width}/>
                <img ref="board" src={require("../assets/board.svg")} alt="board" className="hidden"/>
            </div>
        )
    }
}