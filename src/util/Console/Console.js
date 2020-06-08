import React, { Component } from 'react'
import Authentication from '../Authentication/Authentication'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import classes from './Console.css'
const log = msg => window.Twitch.ext.rig.log(msg);

//@IMPORTANT
// This component is a console for faking server events for testing
// Before build, disable this component, and remove references in App.js

//@IMPORTANT
// appUserId is set on the front end.

class Console extends Component {
    state = {
        queue: [],
        scores: [],
        results: [],
        round: 0,
        victor: 0,
        smited: 0,
        players: {}
    }

    componentDidMount = () => {
        // set initial 'screen' state
        this.props.onGameStateUpdate(this.state)
    }

    render(){
        return (
            <div className={classes.Console}>
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
        onGameStateUpdate: (gameState) => dispatch({type: actionTypes.GAME_STATE_UPDATE, payload: { gamestate: gameState }})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Console);