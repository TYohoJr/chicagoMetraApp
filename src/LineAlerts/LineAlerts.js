import React, { Component } from 'react';
import './LineAlerts.css';
import { connect } from 'react-redux';
import axios from 'axios';
import AlertCollapse from '../AlertCollapse/AlertCollapse.js';

class LinePage extends Component {
    constructor() {
        super();
        this.mapAlerts = this.mapAlerts.bind(this);
        this.state = {
            alerts: '',
            alertsTitle: null
        }
    }

    componentDidMount() {
        axios.get('/apiTest').then((result) => {
            this.mapAlerts(result.data)
        })
    }

    mapAlerts(data) {
        console.log(data);
        let alertsArray = [];
        data.body.map((item) => {
            return item.alert.informed_entity.map((itemEntity) => {
                if (itemEntity.route_id) {
                    if (itemEntity.route_id === this.props.line) {
                        return alertsArray.push({
                            alertHeader: item.alert.header_text.translation[0].text,
                            alertDetails: item.alert.description_text.translation[0].text,
                            alertId: item.id
                        })
                    }
                } else {
                    if (itemEntity.trip.route_id === this.props.line) {
                        return alertsArray.push({
                            alertHeader: item.alert.header_text.translation[0].text,
                            alertDetails: item.alert.description_text.translation[0].text,
                            alertId: item.id
                        })
                    }
                }
                return null;
            })
        })
        this.setState({
            alertsTitle: `Alerts: ${alertsArray.length}`,
            alerts: alertsArray.map((item) => {
                return <AlertCollapse key={item.alertId} alertHeader={item.alertHeader} alertDetails={item.alertDetails} />
            })
        })
    }

    render() {
        return (
            <div>
                <div id='alerts-container'>
                    <p>{this.state.alertsTitle}<br/>Click Alert To View More Details</p>
                    {this.state.alerts}
                </div>
            </div>
        )
    }
}

export default connect((state) => (state))(LinePage);