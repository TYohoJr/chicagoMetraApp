import React, { Component } from 'react';
import './LineTrains.css';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Input } from 'reactstrap';
import { Table } from 'reactstrap';
import TrainModal from '../TrainModal/TrainModal';

class LineTrains extends Component {
    constructor() {
        super();
        this.filterTripsByCalendar = this.filterTripsByCalendar.bind(this);
        this.filterStopsByLine = this.filterStopsByLine.bind(this);
        this.changeStartStop = this.changeStartStop.bind(this);
        this.changeEndStop = this.changeEndStop.bind(this);
        this.searchForTrains = this.searchForTrains.bind(this);
        this.updateTable = this.updateTable.bind(this);
        this.state = {
            stopStartOptions: [],
            stopEndOptions: [],
            todaysTrains: [],
            startStop: '',
            endStop: '',
            trainList: '',
            searchResults: [],
            showSearchResults: '',
            tableData: null,
            showTrainModal: null
        }
    }

    componentDidMount() {
        if (!this.state.startStop) {
            Axios.post('/access-api', { url: 'schedule/trips' }).then((result) => {
                this.filterTripsByCalendar(result)
            });
            Axios.post('access-api', { url: 'schedule/stops' }).then((result) => {
                this.filterStopsByLine(result)
            });
        }
    }

    filterStopsByLine(unfilteredStops) {
        let filteredStartStops = [];
        let filteredEndStops = [];
        unfilteredStops.data.body.map((item) => {
            if (item.stop_url.search(this.props.line) !== -1) {
                filteredStartStops.push(item);
                filteredEndStops.unshift(item);
            }
            return null;
        });
        filteredStartStops.push({ stop_id: 'CUS', stop_name: 'Chicago Union Station' })
        filteredEndStops.unshift({ stop_id: 'CUS', stop_name: 'Chicago Union Station' })
        this.setState({
            stopStartOptions: filteredStartStops.map((item, i) => {
                return <option key={i} value={item.stop_id}>{item.stop_name}</option>
            }),
            stopEndOptions: filteredEndStops.map((item, i) => {
                return <option key={i} value={item.stop_id}>{item.stop_name}</option>
            }),
            startStop: filteredStartStops[0].stop_id,
            endStop: filteredEndStops[0].stop_id
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
        });
    }

    searchForTrains() {
        let searchResults = [];
        for (let i = 0; i < this.state.todaysTrains.length; i++) {
            Axios.post('/access-api', { url: `schedule/stop_times/${this.state.todaysTrains[i].trip_id}` }).then((result) => {
                for (let j = 0; j < result.data.body.length; j++) {
                    if (result.data.body[j].stop_id === this.state.startStop) {
                        for (let k = j; k < result.data.body.length; k++) {
                            if (result.data.body[k].stop_id === this.state.endStop) {
                                searchResults.push(result.data.body);
                                this.setState({
                                    searchResults: searchResults
                                });
                                this.updateTable(searchResults);
                            }
                        }
                    }
                }
            });
        }
    }

    updateTable(data) {
        // data.sort((a, b) => {
        //     a = a[0].departure_time.replace(':', '');
        //     b = b[0].departure_time.replace(':', '');
        //     if (parseInt(a) < parseInt(b)) {
        //         return -1;
        //     }
        //     if (parseInt(a) > parseInt(b)) {
        //         return 1;
        //     }
        //     return 0;
        // })
        this.setState({
            tableData: data.map((item, i, arr) => {
                return <tr key={i}>
                    <td><TrainModal tripId={item[0].trip_id} data={item} /></td>
                    <td>{item[0].departure_time}</td>
                    <td>{item[item.length - 1].arrival_time}</td>
                </tr>
            })
        })
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
                    <button onClick={this.searchForTrains}>Search</button>
                    <button onClick={() => console.log(this.state.searchResults)}>Test</button>
                    <div id='search-results-table-container'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{this.state.startStop}</th>
                                    <th>{this.state.endStop}</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.tableData}</tbody>
                        </Table>
                        {this.state.showTrainModal}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => (state))(LineTrains);