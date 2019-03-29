import React from 'react';
import { combineReducers } from 'redux';
import LineDropdown from './LineDropdown/LineDropdown';

const currentPageReducer = (state, action) => {
    if (!state) {
        state = {
            currentPage: <LineDropdown />,
            calendarDates: []
        }
    }
    switch (action.type) {
        case "changeCurrentPage":
            return state = {
                ...state,
                currentPage: action.currentPage,
            }
        case "changeCalendarDates":
            return state = {
                ...state,
                calendarDates: action.calendarDates
            }
        default:
            return state = {
                ...state
            }
    }
}

export default combineReducers({
    currentPageReducer
});

// import { connect } from 'react-redux';
// export default connect((state) => (state))(StaticDotsOptions);