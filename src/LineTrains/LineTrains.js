import React, { Component } from 'react';
import './LineTrains.css';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Input } from 'reactstrap';

class LineTrains extends Component {
    constructor() {
        super();
        this.mapTrips = this.mapTrips.bind(this);
        this.filterTripsByCalendar = this.filterTripsByCalendar.bind(this);
        this.filterStopsByLine = this.filterStopsByLine.bind(this);
        this.changeStartStop = this.changeStartStop.bind(this);
        this.changeEndStop = this.changeEndStop.bind(this);
        this.state = {
            stopStartOptions: [],
            stopEndOptions: [],
            todaysTrains: [],
            startStop: '',
            endStop: ''
        }
    }

    componentDidMount() {
        Axios.post('/access-api', { url: 'schedule/trips' }).then((result) => {
            this.filterTripsByCalendar(result)
        });
        Axios.post('access-api', { url: 'schedule/stops' }).then((result) => {
            this.filterStopsByLine(result)
        });
    }

    filterStopsByLine(unfilteredStops) {
        let filteredStartStops = [];
        let filteredEndStops = [];
        console.log(unfilteredStops);
        unfilteredStops.data.body.map((item) => {
            if (item.stop_url.search(this.props.line) !== -1) {
                filteredStartStops.push(item);
                filteredEndStops.unshift(item);
            }
            return null;
        });
        filteredStartStops.push({stop_id:'CUS', stop_name:'Chicago Union Station'})
        filteredEndStops.unshift({stop_id:'CUS', stop_name:'Chicago Union Station'})
        this.setState({
            stopStartOptions: filteredStartStops.map((item, i) => {
                return <option key={i} value={item.stop_id}>{item.stop_name}</option>
            }),
            stopEndOptions: filteredEndStops.map((item, i) => {
                return <option key={i} value={item.stop_id}>{item.stop_name}</option>
            }),
            startStop: filteredStartStops[0].stop_name,
            endStop: filteredEndStops[0].stop_name
        })
    }

    filterTripsByCalendar(unfilteredTrips) {
        var todaysCalendarDates = this.props.currentPageReducer.calendarDates
        var filteredTrips = unfilteredTrips.data.body.filter(trip => trip.route_id === this.props.line);
        let todaysFilteredTrips = [];
        filteredTrips.map((item) => {
            for (let i = 0; i < todaysCalendarDates.length; i++) {
                if (item.service_id === todaysCalendarDates[i]) {
                    todaysFilteredTrips.push(item);
                }
            }
            return null;
        })
        this.setState({
            todaysTrains: todaysFilteredTrips
        })
    }

    mapTrips(data) {

        console.log(data)
    }

    changeStartStop(e) {
        this.setState({
            startStop: e.target.value
        });
    }

    changeEndStop(e) {
        this.setState({
            endStop: e.target.value
        });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div id='line-trains-container'>
                    From:
                    <Input type='select' placeholder='test' onChange={this.changeStartStop} >
                        {this.state.stopStartOptions}
                    </Input>
                    <br />
                    To:
                    <Input type='select' onChange={this.changeEndStop}>
                        {this.state.stopEndOptions}
                    </Input>
                    <br />
                    <button>Search</button>
                </div>
            </div>
        )
    }
}

export default connect((state) => (state))(LineTrains);