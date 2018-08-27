import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'font-awesome/css/font-awesome.css';

import Score from "./components/Score";
import Gameboard from "./components/Gameboard";

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="fluid-container min-container">
                    <div className="App">
                        <header>
                            <h1 className="title">
                                Plus Minus
                                <small className="small-title"><i>Javascript game</i></small>
                            </h1>
                        </header>

                        <div className="d-flex justify-content-between align-items-center">
                            <Score classes='bg-pink'/>

                            <a href="#" className="refresh-btn">
                                <i className="fa fa-refresh"></i>
                            </a>
                        </div>

                        <Gameboard />

                        <div className="d-flex justify-content-end">
                            <Score isBot={true}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
