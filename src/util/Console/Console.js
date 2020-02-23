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
        screen: 'NEXT',
        timer: 10,
        playerOneHp: 3,
        playerTwoHp: 3,
        playerOneActions: [],
        playerTwoActions: [],
        playerOneUsername: '',
        playerTwoUsername: '',
        round: 1,
        winner: [],
        overallWinner: null,
        characterOne: "test",
        characterTwo: "test",
        nextPlayerOne: 'asdasd123',
        nextPlayerTwo: 'asda12312'
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

    getScoreScreen = () => {
        this.setState({screen: "SCORE"})
    }

    getNextScreen = () => {
        this.setState({screen: "NEXT"})
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

        if (hp - 1 === 0) {
            log(`[Console] Player ${player} has 0 hp`);
            log(`[Console] Overall winner is player ${player === 1 ? 2 : 1}`);
            this.setState({overallWinner: player === 1 ? 2 : 1})
        }
    }

    playerAction = (action, player, round) => {

        // keeping it dry
        let actionsArray = [this.state.playerOneActions, this.state.playerTwoActions]
        let newActions = [...actionsArray[player - 1]];
        newActions[round - 1] = action;

        // wrote if with if, because i can't figure out
        // how to set state more dryly conditionally.
        if (player === 1) {
            this.setState({ playerOneActions: newActions},
            () => {
                this.shouldSetWinner();
            })
        } else {
            this.setState({ playerTwoActions: newActions},
            () => {
                this.shouldSetWinner();
            })
        }
    }

    shouldSetWinner = () => {

        let round = this.state.round - 1;
        // if both players acted for this round && winner result has not been recorded already
        if(this.state.playerOneActions[round] && this.state.playerTwoActions[round] && !this.state.winner[round]) {
            let winner = null;
            const actions = ["PA", "SC", "RO"]; // use indexes to calculate result
            let a = actions.indexOf(this.state.playerOneActions[round])
            let b = actions.indexOf(this.state.playerTwoActions[round]);

            /*https://stackoverflow.com/questions/11377117/rock-paper-scissors-determine-win-loss-tie-using-math*/
            if (a === b) { 
                winner = 3; // tie
            } else if ((a - b + 3) % 3 == 1) {
                winner = 1; // player 1 wins
            } else {
                winner = 2; // player 2 wins
            }

            let newArray = [...this.state.winner];
            newArray[round] = winner;
            this.setState({winner: newArray}, () => {
                // log('[Console] Round winner is: ' + this.state.winner[round]);
            })
        }

    }

    nextRound = (round) => {
        this.setState({ round: round + 1});
    }

    setPlayerUsername = (name, player) => {
        if (player === 1) { 
            this.setState({playerOneUsername: name})
        } else {
            this.setState({playerTwoUsername: name})
        }
    }

    render(){
        return (
            <div className={classes.Console}>
                <div>                
                    <button onClick={this.getStartScreen}> start screen </button>
                    <button onClick={this.getSelectScreen}> select screen </button>
                    <button onClick={this.getFightScreen}> fight screen </button> 
                    <button onClick={this.getScoreScreen}> score screen </button> 
                    <button onClick={this.getNextScreen}> next screen </button> 
                </div>
                <div>
                    <input onChange={(event) => this.setPlayerUsername(event.target.value, 1)}/>
                    <input onChange={(event) => this.setPlayerUsername(event.target.value, 2)}/>
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