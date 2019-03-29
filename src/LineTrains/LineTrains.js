import React, { Component } from 'react';
import './LineTrains.css';
import { connect } from 'react-redux';
import Axios from 'axios';

class LineTrains extends Component {
    constructor() {
        super();
        this.mapTrips = this.mapTrips.bind(this);
        this.filterTripsByCalendar = this.filterTripsByCalendar.bind(this)
    }

    componentDidMount() {
        Axios.get('/get-trips').then((result) =>{
            this.filterTripsByCalendar(result.data.body.filter(trip => trip.route_id === this.props.line))
        })
    }

    filterTripsByCalendar(unfilteredTrips) {
        let filteredTrips = [];
        unfilteredTrips.map((item) =>{
            for (let i = 0; i < this.props.currentPageReducer.calendarDates.length; i++) {
                if (item.service_id === this.props.currentPageReducer.calendarDates[i]) {
                    return filteredTrips.push(item);
                }
            }
        });
        console.log(filteredTrips);
    }

    mapTrips(data) {
        console.log(data)
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default connect((state) => (state))(LineTrains);