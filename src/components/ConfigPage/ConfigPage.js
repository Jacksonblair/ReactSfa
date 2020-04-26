import React, { Component } from 'react'
import Authentication from '../../util/Authentication/Authentication'
import classes from './Config.css'

import ConfigCharacterRow from '../ConfigCharacterRow/ConfigCharacterRow'
const log = window.Twitch ? msg => window.Twitch.ext.rig.log(msg) : null;

class ConfigPage extends Component {

    constructor(props) {
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state={
            finishedLoading:false,
            roster: [],
            showConfirmation: false,
            defaultRoster: [
                { name: 'Koala', url: 'url', portraitUrl: 'url', enabled: true},
                { name: 'Coffee', url: 'url', portraitUrl: 'url', enabled: true},
                { name: 'Dickhead', url: 'url', portraitUrl: 'url', enabled: true}
            ] 
        }
    }

    componentDidMount = () => {
        console.log('Component mounted')

        if(this.twitch){
            this.twitch.onAuthorized((auth)=>{
                this.Authentication.setToken(auth.token, auth.userId)

                // If no broadcaster config, set default (add default characters)
                // $$DEV RIG NOTE: Need to reload config view upon save INSIDE DEV RIG, or it wont update config
                if (this.twitch.configuration.broadcaster == undefined) {
                    console.log("[ConfigPage] No config, adding default roster.")
                    this.twitch.configuration.set("broadcaster", "", JSON.stringify(this.state.defaultRoster));
                }

                console.log(this.twitch.configuration.broadcaster.content)

                // Store roster in state, to reference later
                this.setState({
                    roster: JSON.parse(this.twitch.configuration.broadcaster.content), 
                    finishedLoading: true, 
                })
            })
        }

    }


    clickedSubmitHandler = () => {
        // Update config with new roster
        this.twitch.configuration.set("broadcaster", "", JSON.stringify(this.state.roster))
        console.log('Updated config');
        // Dont need to get config again, because we used local roster to update config.
        // And updated roster will be loaded when this container is reloaded

        // Show confirmation element
        this.setState({showConfirmation: true})
        setTimeout(() => {
            this.setState({showConfirmation: false})
        }, 1000)
    }

    clickedDeleteHandler = (index) => {
        this.state.roster.splice(index, 1)
        this.forceUpdate()
    }

    newCharacterHandler = () => {
        this.state.roster.push({ name: '', url: ''},)
        this.forceUpdate()
    }

    nameChangedHandler = (e, index) => {
        this.state.roster[index].name = e.target.value;
        this.forceUpdate()
    }   

    urlChangedHandler = (e, index) => {
        this.state.roster[index].url = e.target.value;
        this.forceUpdate()
    }

    portraitUrlChangedHandler = (e, index) => {
        this.state.roster[index].portraitUrl = e.target.value;
        this.forceUpdate()
    }

    changedEnabledHandler = (index) => {
        this.state.roster[index].enabled = !this.state.roster[index].enabled;
        this.forceUpdate()
    }

    clickedDefaultHandler = () => {
        this.setState({roster: this.state.defaultRoster})
    }

    render() {

        // Populate list of custom characters + default characters (if enabled)
        let characterRows = [];
        this.state.roster.forEach((char, index) => {
            // dont include default characters (by checking if char has 'enabled' property, which only default chars have)
            if (!char.hasOwnProperty('enabled')) {
                characterRows.push(
                    <ConfigCharacterRow 
                        key={index}
                        index={index}
                        name={char.name} 
                        url={char.url}
                        deleted={this.clickedDeleteHandler}
                        changedName={this.nameChangedHandler}
                        changedUrl={this.urlChangedHandler}
                        changedPortraitUrl={this.portraitUrlChangedHandler}
                    /> 
                )
            } else {
                characterRows.push(
                    <ConfigCharacterRow
                        key={index}
                        index={index}
                        name={char.name}
                        default={true}
                        enabled={char.enabled}
                        changeEnabled={this.changedEnabledHandler}
                    />
                )
            }
        }) 

        // show confirmation is changes have been submitted
        let confirmation = this.state.showConfirmation ? 
        ( <p className={classes.confirmation}> Changes saved! </p>) : null

        return(
            <React.Fragment>
                <h2> Roster Configuration</h2>
                <button onClick={() => this.clickedSubmitHandler()}> Submit changes </button> 
                <button onClick={() => this.newCharacterHandler()}> Add new </button> 
                <button onClick={() => this.clickedDefaultHandler()}> Default </button> 
                {characterRows}
                <div>
                    <h3> TIPS </h3>
                    <p> Character sprites must be n high, with a frame every n pixels, and need to have 5 frames. </p>
                    <p> Portrait images need to be n by n pixels, with only one frame </p>
                </div>
                {confirmation}
            </React.Fragment> 
        )   

    }

}

export default ConfigPage;