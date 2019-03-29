import React, { Component } from 'react';
import './HomePage.css';
import { connect } from 'react-redux';
import MyNavbar from '../MyNavbar/MyNavbar.js';

class HomePage extends Component {
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