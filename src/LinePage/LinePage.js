import React, { Component } from 'react';
import './LinePage.css';
import { connect } from 'react-redux';
import LineAlerts from '../LineAlerts/LineAlerts';

class LinePage extends Component {
    render() {
        return (
            <div>
                <LineAlerts line={this.props.line}/>
            </div>
        )
    }
}

export default connect((state) => (state))(LinePage);