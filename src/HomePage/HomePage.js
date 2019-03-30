import React, { Component } from 'react';
import './HomePage.css';
import { connect } from 'react-redux';
import MyNavbar from '../MyNavbar/MyNavbar.js';
import Axios from 'axios';

class HomePage extends Component {
    constructor() {
        super();
        this.getCalendarDates = this.getCalendarDates.bind(this);
    }

    getCalendarDates() {
        if (!this.props.currentPageReducer.calendarDates.length) {
            Axios.post('/access-api', { url: 'schedule/calendar_dates' }).then((result) => {
                this.props.dispatch({
                    type: 'changeCalendarDates',
                    calendarDates: result.data.body.map((item) => item.service_id)
                });
            });
        }
        // Axios.post('/access-api', { url: 'schedule/stop_times/BNSF_BN1201_V1_A' }).then((result) => {
        //     console.log(result.data)
        // });
    }

    componentDidMount() {
        this.getCalendarDates()
    }

    render() {
        return (
            <div id='homepage-container'>
                <MyNavbar />
                {this.props.currentPageReducer.currentPage}
            </div>
        )
    }
}

export default connect((state) => (state))(HomePage);