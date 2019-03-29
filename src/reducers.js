import React from 'react';
import { combineReducers } from 'redux';
import LineDropdown from './LineDropdown/LineDropdown';

const currentPageReducer = (state, action) => {
    if (!state) {
        state = {
            currentPage: <LineDropdown />,
        }
    }
    switch (action.type) {
        case "changeCurrentPage":
            return state = {
                ...state,
                currentPage: action.currentPage,
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