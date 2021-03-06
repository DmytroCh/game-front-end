import React from "react";
import "../css/canvas.css";
import GameContext from "../Contexts/GameContext";
import * as canvasUtils from "../Model/canvasOperations";
import * as win from "../Model/window";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        boardSize: {
            height: win.getBoardSize(),
            width: win.getBoardSize()
        }
    };
    this.canvasBackgroundLayer = React.createRef();
    this.canvasGameLayer = React.createRef();
    this.board = React.createRef();
    this.you = React.createRef();
    this.blue = React.createRef();
    this.blueActive = React.createRef();
    this.green = React.createRef();
    this.greenActive = React.createRef();
    this.red = React.createRef();
    this.redActive = React.createRef();
    this.yellow = React.createRef();
    this.yellowActive = React.createRef();
    this.diceOne = React.createRef();
    this.diceTwo = React.createRef();
    this.diceThree = React.createRef();
    this.diceFour = React.createRef();
    this.diceFive = React.createRef();
    this.diceSix = React.createRef();
    this.medals = React.createRef();

    this.movesQueue = -1;
    this.canvasStyle = {
      marginLeft: win.getLeftMargin()
    };
    this.wrapStyle = {
      paddingTop: win.getTopMargin()
    }
  }

  static contextType = GameContext;

  componentDidMount() {
    canvasUtils.setSizes(this.state.boardSize);
    canvasUtils.initCanvasObjects(this);
  }

  // this method update queue for constructor
  updateQueue = (i) => {
    this.movesQueue = this.movesQueue + i;
  }



  render() {
    return (
      <GameContext.Consumer>
        {(response) => {
          setTimeout(canvasUtils.updateGame, this.movesQueue * 1000, response, this.updateQueue);
          this.updateQueue(1);
          return (
            <div id="canvas-wrap" style={this.wrapStyle}>
            <canvas
              style={this.canvasStyle}
              id="background-layer"
              ref={this.canvasBackgroundLayer}
              width={this.state.boardSize.height}
              height={this.state.boardSize.width}
            />
            <canvas
              style={this.canvasStyle}
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
            <img
              ref={this.you}
              src={require("../assets/text/you.svg")}
              alt="you"
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
            <div id="dices">
              <img
                ref={this.diceOne}
                src={require("../assets/dice/1.svg")}
                alt="1"
                className="hidden dice"
              />
              <img
                ref={this.diceTwo}
                src={require("../assets/dice/2.svg")}
                alt="2"
                className="hidden dice"
              />
              <img
                ref={this.diceThree}
                src={require("../assets/dice/3.svg")}
                alt="3"
                className="hidden dice"
              />
              <img
                ref={this.diceFour}
                src={require("../assets/dice/4.svg")}
                alt="4"
                className="hidden dice"
              />
              <img
                ref={this.diceFive}
                src={require("../assets/dice/5.svg")}
                alt="5"
                className="hidden dice"
              />
              <img
                ref={this.diceSix}
                src={require("../assets/dice/6.svg")}
                alt="6"
                className="hidden dice"
              />
            </div>
            <div>
              <img
                  ref={this.medals}
                  src={require("../assets/medals.svg")}
                  alt="first-place"
                  className="hidden"
                />
            </div>
          </div>
          )
        }}

      </GameContext.Consumer>
    );
  }
}
