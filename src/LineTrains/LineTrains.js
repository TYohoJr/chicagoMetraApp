import React, { Component } from 'react';
import './LineTrains.css';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Input, Label } from 'reactstrap';

class LineTrains extends Component {
    constructor() {
        super();
        this.mapTrips = this.mapTrips.bind(this);
        this.filterTripsByCalendar = this.filterTripsByCalendar.bind(this);
        this.state = {
            stopOptions: ''
        }
    }

    componentDidMount() {
        Axios.post('/access-api', { url: 'schedule/trips' }).then((result) => {
            this.filterTripsByCalendar(result.data.body.filter(trip => trip.route_id === this.props.line))
        });
        Axios.post('access-api', { url: 'tripUpdates' }).then((result)=>{
            console.log(result)
        })
    }

    filterTripsByCalendar(unfilteredTrips) {
        let filteredTrips = [];
        unfilteredTrips.map((item) => {
            for (let i = 0; i < this.props.currentPageReducer.calendarDates.length; i++) {
                if (item.service_id === this.props.currentPageReducer.calendarDates[i]) {
                    return filteredTrips.push(item);
                }
            }
        });
        this.mapTrips(filteredTrips);
    }

    mapTrips(data) {
        console.log(data)
    }

    render() {
        return (
            <div>
                <div id='line-trains-container'>
                    From:
                    <select placeholder='From'>
                        {this.state.stopOptions}
                    </select>
                    <br />
                    To:
                    <select placeholder='From'>
                        {this.state.stopOptions}
                    </select>
                </div>
            </div>
        )
    }
}

export default connect((state) => (state))(LineTrains);