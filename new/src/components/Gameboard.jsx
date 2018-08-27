import React, {Component} from 'react';
import Tile from "./Tile";
import randomNumber from "../helpers";

class Gameboard extends Component {
  constructor() {
    super();

    this.state = {

      matrix: Gameboard.createMatrix()
    }
  }

  static createMatrix() {
    const tileMatrix = [];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let numb = randomNumber(-9, 9);

        if (!tileMatrix[i]) {
          tileMatrix[i] = [];
        }

        if (!tileMatrix[i][j]) {
          tileMatrix[i][j] = [];
        }

        tileMatrix[i][j] = numb;
      }
    }

    console.log(tileMatrix)
    return tileMatrix;
  }

  render() {
    const { matrix } = this.state;
    const rnd = randomNumber(0, 4);

    return (
        <div className='playing-area d-flex flex-wrap'>
          {
            matrix.map((row, rowidx) => {
              return row.map((n, colidx) => {
                const props = {
                  number: n,
                  row: rowidx,
                  col: colidx,
                };

                if (rowidx === rnd) {
                  props.colorClass = 'bg-pink';
                }

                return <Tile key={n * Math.random()} {...props}/>
              });
            })
          }
        </div>
    );
  }
}

export default Gameboard;
