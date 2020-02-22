import React, { Component } from 'react'
import Authentication from '../Authentication/Authentication'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import classes from './Console.css'
const log = msg => window.Twitch.ext.rig.log(msg);

//@IMPORTANT
// This component is a console for faking server events for testing
// Before build, disable this component, and remove references in App.js

class Console extends Component {

    state = {
        screen: 'FIGHT',
        timer: 10,
        playerOneHp: 3,
        playerTwoHp: 3,
        playerOneActions: [],
        playerTwoActions: [],
        round: 1
    }

    componentDidMount = () => {
        // set initial 'screen' state
        this.props.onGameStateUpdate(this.state)
    }

    componentDidUpdate = () => {
        this.props.onGameStateUpdate(this.state);
    }

    getStartScreen = () => {
        this.setState({screen: "START"})
    }

    getSelectScreen = () => {
        this.setState({screen: "SELECT"})
    }

    getFightScreen = () => {
        this.setState({screen: "FIGHT"})
    }

    incrementTimer = () => {
        this.setState({timer: this.state.timer + 1})
    }

    decrementTimer = (timer) => {
        this.setState({timer: this.state.timer - 1})
    }

    incrementPlayerHp = (player, hp) => {
        if (hp + 1 <= 3) {
            if (player === 1) {
                this.setState({playerOneHp: hp  + 1})
            } else {
                this.setState({playerTwoHp: hp + 1})
            }
        }
    }

    decrementPlayerHp = (player, hp) => {
        if (hp - 1 >= 0) {
            if (player === 1) {
                this.setState({playerOneHp: hp - 1})
            } else {
                this.setState({playerTwoHp: hp - 1})
            }
        }
    }

    playerAction = (action, player, round) => {
        log(action + " for player: " + player + " @ round: " + round)
        if (player === 1) {
            let newActions = [...this.state.playerOneActions];
            newActions[round - 1] = action;
            this.setState({playerOneActions: newActions});
        } else {
            let newActions = [...this.state.playerTwoActions];
            newActions[round - 1] = action;
            this.setState({playerTwoActions: newActions});
        }
    }

    nextRound = (round) => {
        this.setState({ round: round + 1});
    }

    render(){
        return (
            <div className={classes.Console}>
                <div>                
                    <button onClick={this.getStartScreen}> start screen </button>
                    <button onClick={this.getSelectScreen}> select screen </button>
                    <button onClick={this.getFightScreen}> fight screen </button> 
                </div>
                <div>
                    <button onClick={this.incrementTimer}> + Time </button>
                    <button onClick={this.decrementTimer}> - Time </button>
                </div>
                <div>
                    <button onClick={() => this.decrementPlayerHp(1, this.state.playerOneHp)}> - HP(1) </button>
                    <button onClick={() => this.incrementPlayerHp(1, this.state.playerOneHp)}> + HP(1)</button>
                    <button onClick={() => this.decrementPlayerHp(2, this.state.playerTwoHp)}> - HP(2) </button>
                    <button onClick={() => this.incrementPlayerHp(2, this.state.playerTwoHp)}> + HP(2)</button>
                </div>
                <div className={classes.roundConsole}> 
                    <div>
                        <h2> ROUND {' ' + this.state.round}</h2>
                        <button onClick={() => this.nextRound(this.state.round)}> + </button>
                    </div>
                    <div className={classes.p1Actions}>
                        <button onClick={() => this.playerAction("PA", 1, this.state.round)}> PA </button>
                        <button onClick={() => this.playerAction("SC", 1, this.state.round)}> SC </button>
                        <button onClick={() => this.playerAction("RO", 1, this.state.round)}> RO </button>
                    </div>
                    <div className={classes.p2Actions}>
                        <button onClick={() => this.playerAction("PA", 2, this.state.round)}> PA </button>
                        <button onClick={() => this.playerAction("SC", 2, this.state.round)}> SC </button>
                        <button onClick={() => this.playerAction("RO", 2, this.state.round)}> RO </button>
                    </div>
                </div>
            </div>
        )
    }
}

/*
    <p>Hello world!</p>
    <h1> DOES THIS UPDATE? SUCK ME OFF</h1>
    <p>My tokena is: {this.Authentication.state.token}</p>
    <p>My opaque ID is {this.Authentication.getOpaqueId()}.</p>
    <div>{this.Authentication.isModerator() ? <p>I am currently a mod, and here's a special mod button <input value='mod button' type='button'/></p>  : 'I am currently not a mod.'}</div>
    <p>I have {this.Authentication.hasSharedId() ? `shared my ID, and my user_id is ${this.Authentication.getUserId()}` : 'not shared my ID'}.</p>
    <button onClick={this.props.onTest}>TEST ME</button>
*/

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGameStateUpdate: (gameState) => dispatch({type: actionTypes.GAME_STATE_UPDATE, payload: { gameState: gameState }})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Console);