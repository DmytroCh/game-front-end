import React from "react";
import "../css/canvas.css";
import GameContext from "../Contexts/GameContext";
import * as canvasUtils from "../Model/canvasOperations";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        boardSize: {
            height: window.innerHeight,
            width: window.innerHeight
        }
    };
    this.canvasBackgroundLayer = React.createRef();
    this.canvasGameLayer = React.createRef();
    this.board = React.createRef();
    this.blue = React.createRef();
    this.blueActive = React.createRef();
    this.green = React.createRef();
    this.greenActive = React.createRef();
    this.red = React.createRef();
    this.redActive = React.createRef();
    this.yellow = React.createRef();
    this.yellowActive = React.createRef();
  }

  static contextType = GameContext;

  componentDidMount() {
    canvasUtils.setSizes(this.state.boardSize);
    canvasUtils.initCanvasObjects(this);
  }

  render() {
    return (
      <div id="canvas-wrap">
        <canvas
          id="background-layer"
          ref={this.canvasBackgroundLayer}
          width={this.state.boardSize.height}
          height={this.state.boardSize.width}
        />
        <canvas
          id="game-layer"
          ref={this.canvasGameLayer}
          width={this.state.boardSize.height}
          height={this.state.boardSize.width}
        />
        <img
          ref={this.board}
          src={require("../assets/board.svg")}
          alt="board"
          className="hidden"
        />
        <div id="powns">
          <img
            ref={this.blue}
            src={require("../assets/powns/pown-blue.svg")}
            alt="pown-blue"
            className="hidden pown"
          />
          <img
            ref={this.blueActive}
            src={require("../assets/powns/pown-blue-active.svg")}
            alt="pown-blue-active"
            className="hidden pown"
          />
          <img
            ref={this.green}
            src={require("../assets/powns/pown-green.svg")}
            alt="pown-green"
            className="hidden pown"
          />
          <img
            ref={this.greenActive}
            src={require("../assets/powns/pown-green-active.svg")}
            alt="pown-green-active"
            className="hidden pown"
          />
          <img
            ref={this.red}
            src={require("../assets/powns/pown-red.svg")}
            alt="pown-red"
            className="hidden pown"
          />
          <img
            ref={this.redActive}
            src={require("../assets/powns/pown-red-active.svg")}
            alt="pown-blue-active"
            className="hidden pown"
          />
          <img
            ref={this.yellow}
            src={require("../assets/powns/pown-yellow.svg")}
            alt="pown-yellow"
            className="hidden pown"
          />
          <img
            ref={this.yellowActive}
            src={require("../assets/powns/pown-yellow-active.svg")}
            alt="pown-yellow-active"
            className="hidden pown"
          />
        </div>
      </div>
    );
  }
}
