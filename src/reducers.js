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

const createAccountReducer = (state, action) => {
    if (!state) {
        state = {
            createUsername: "",
            createPassword1: "",
            createPassword2: "",
            showPassword: "password"
        }
    }
    switch (action.type) {
        case "changeCreateUsername":
            return state = {
                ...state,
                createUsername: action.createUsername
            }
        case "changeCreatePassword1":
            return state = {
                ...state,
                createPassword1: action.createPassword1
            }
        case "changeCreatePassword2":
            return state = {
                ...state,
                createPassword2: action.createPassword2
            }
        case "changeShowPassword":
            return state = {
                ...state,
                showPassword: action.showPassword
            }
        case "resetCreateAccount":
            return state = {
                createUsername: "",
                createPassword1: "",
                createPassword2: "",
                showPassword: "password",
            }
        default:
            return state = {
                ...state,
            }
    }
}

const changePasswordReducer = (state, action) => {
    if (!state) {
        state = {
            oldPassword: "",
            newPassword1: "",
            newPassword2: "",
            showPassword: "password"
        }
    }
    switch (action.type) {
        case "changeOldPassword":
            return state = {
                ...state,
                oldPassword: action.oldPassword
            }
        case "changeNewPassword1":
            return state = {
                ...state,
                newPassword1: action.newPassword1
            }
        case "changeNewPassword2":
            return state = {
                ...state,
                newPassword2: action.newPassword2
            }
        case "changeShowPassword":
            return state = {
                ...state,
                showPassword: action.showPassword
            }
        case "resetChangePassword":
            return state = {
                oldPassword: "",
                newPassword1: "",
                newPassword2: "",
                showPassword: "password",
            }
        default:
            return state = {
                ...state,
            }
    }
}

const logInReducer = (state, action) => {
    if (!state) {
        state = {
            logInUsername: "",
            logInPassword: "",
            showPassword: "password",
        }
    }
    switch (action.type) {
        case "changeLogInUsername":
            return state = {
                ...state,
                logInUsername: action.logInUsername
            }
        case "changeLogInPassword":
            return state = {
                ...state,
                logInPassword: action.logInPassword
            }
        case "changeLogInShowPassword":
            return state = {
                ...state,
                showPassword: action.showPassword
            }
        case "resetLogInData":
            return state = {
                logInUsername: "",
                logInPassword: "",
                showPassword: "password",
            }
        default:
            return state = {
                ...state,
            }
    }
}

export default combineReducers({
    currentPageReducer,
    logInReducer,
    createAccountReducer,
    changePasswordReducer,
});

// import { connect } from 'react-redux';
// export default connect((state) => (state))(StaticDotsOptions);