import React from 'react';
import './MyLogInModal.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

class MyLogInModal extends React.Component {
    constructor(props) {
        super(props);
        this.logInUser = this.logInUser.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onLogInPasswordChange = this.onLogInPasswordChange.bind(this);
        this.onLogInUsernameChange = this.onLogInUsernameChange.bind(this);
        this.onShowPasswordChange = this.onShowPasswordChange.bind(this);
        this.state = {
            modal: false
        };
    }

    toggle() {
        if (this.state.modal === false) {
            this.props.dispatch({
                type: "resetLogInData",
            })
        }
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    logInUser() {
        if(cookie.get('username')) {
            return alert('You are already logged in. If you would like to use a different account, please log out and then back in.')
        }
        axios.post("/userLogIn", { username: this.props.logInReducer.logInUsername, password: this.props.logInReducer.logInPassword }).then((result) => {
            if (result.data.message === "Login successful!") {
                localStorage.setItem('token', result.data.myToken);
                cookie.set('username', result.data.user.username);
                cookie.set('data', result.data.user);
                this.props.dispatch({
                    type: "changeLogInStatus",
                    accountUsername: result.data.user.username,
                    logInGreeting: result.data.user.username
                });
            } else {
                return alert(result.data.message);
            }
        })
    }

    onLogInPasswordChange(e) {
        this.props.dispatch({
            type: "changeLogInPassword",
            logInPassword: e.target.value
        })
    }

    onLogInUsernameChange(e) {
        this.props.dispatch({
            type: "changeLogInUsername",
            logInUsername: e.target.value
        })
    }

    onShowPasswordChange() {
        if (this.props.logInReducer.showPassword === "password") {
            this.props.dispatch({
                type: "changeLogInShowPassword",
                showPassword: "text"
            })
        } else if (this.props.logInReducer.showPassword === "text") {
            this.props.dispatch({
                type: "changeLogInShowPassword",
                showPassword: "password"
            })
        }
    }

    render() {
        return (
            <div>
                <Button color="success" onClick={this.toggle}>Log In</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Log In</ModalHeader>
                    <ModalBody>
                        <div>
                            <p>Username</p>
                            <Input type="text" value={this.props.logInReducer.logInUsername} onChange={this.onLogInUsernameChange} />
                            <p>Password</p>
                            <Input type={this.props.logInReducer.showPassword} value={this.props.logInReducer.logInPassword} onChange={this.onLogInPasswordChange} />
                            <small><input type="checkbox" onChange={this.onShowPasswordChange} />Show Password</small>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="success" onClick={this.logInUser}>Log In</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect((state) => (state))(MyLogInModal);
