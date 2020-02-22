import React, { Component } from 'react';
const log = msg => window.Twitch.ext.rig.log(msg);

// HOC for delaying dismount to allow animations to play

const delayUnmounting = Comp => {
    return class extends Component {

        constructor(props) {
            super(props);
            this.state = {
                shouldRender: this.props.isMounted
            };
        }

        componentDidUpdate(prevProps) {
            if (prevProps.isMounted && !this.props.isMounted) {
                setTimeout(() => {
                    log('dismounting')
                    this.setState({ shouldRender: false })
                }, this.props.delayTime);
        	} else if (!prevProps.isMounted && this.props.isMounted) {
                this.setState({ shouldRender: true });
            }
        }

        render() {
            return this.state.shouldRender ? <Comp {...this.props} /> : null;
        }
    };
}

export default delayUnmounting;