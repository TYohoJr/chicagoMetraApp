import React, { Component } from 'react';
import './LinePage.css';
import { connect } from 'react-redux';
import LineAlerts from '../LineAlerts/LineAlerts';
import LineTrains from '../LineTrains/LineTrains';

class LinePage extends Component {
    render() {
        return (
            <div>
                <LineTrains line={this.props.line}/>
                <LineAlerts line={this.props.line} />
            </div>
        )
    }
}

export default connect((state) => (state))(LinePage);