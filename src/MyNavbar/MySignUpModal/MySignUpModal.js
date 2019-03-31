import React from 'react';
import './MySignUpModal.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

class MySignUpModal extends React.Component {
    constructor(props) {
        super(props);
        this.signUpUser = this.signUpUser.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onCreatePassword1Change = this.onCreatePassword1Change.bind(this);
        this.onCreatePassword2Change = this.onCreatePassword2Change.bind(this);
        this.onCreateUsernameChange = this.onCreateUsernameChange.bind(this);
        this.onShowPasswordChange = this.onShowPasswordChange.bind(this);
        this.state = {
            modal: false
        };
    }

    toggle() {
        if (cookie.get('username')) {
            return alert('Please log out before creating a new account')
        }
        if (this.state.modal === false) {
            this.props.dispatch({
                type: "resetCreateAccount",
            })
        }
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    signUpUser() {
        let account = this.props.createAccountReducer
        if (account.createPassword1 !== account.createPassword2) {
            return alert("Passwords must match");
        } else if (!account.createPassword1) {
            return alert("Password can't be blank");
        } else if (account.createPassword1.length < 6) {
            return alert("Password must be at least 6 characters long");
        } else if (!account.createUsername) {
            return alert("Username can't be blank");
        }
        axios.post("/signUpData", { username: account.createUsername, password: account.createPassword1, dateCreated: new Date().toLocaleString(),}).then((result) => {
            if (result.data === "Sign Up Successful") {
                alert(result.data);
                this.toggle();
            } else {
                alert(result.data);
            }
        })
    }

    onCreatePassword1Change(e) {
        this.props.dispatch({
            type: "changeCreatePassword1",
            createPassword1: e.target.value
        })
    }

    onCreatePassword2Change(e) {
        this.props.dispatch({
            type: "changeCreatePassword2",
            createPassword2: e.target.value
        })
    }

    onCreateUsernameChange(e) {
        this.props.dispatch({
            type: "changeCreateUsername",
            createUsername: e.target.value
        })
    }

    onShowPasswordChange() {
        if (this.props.createAccountReducer.showPassword === "password") {
            this.props.dispatch({
                type: "changeShowPassword",
                showPassword: "text"
            })
        } else if (this.props.createAccountReducer.showPassword === "text") {
            this.props.dispatch({
                type: "changeShowPassword",
                showPassword: "password"
            })
        }
    }

    render() {
        var passwordMatchCheck = "Red";
        if (this.props.createAccountReducer.createPassword1 === this.props.createAccountReducer.createPassword2) {
            passwordMatchCheck = "Black";
        }
        return (
            <div>
                <Button onClick={this.toggle}>Create Account</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Create Account</ModalHeader>
                    <ModalBody>
                        <div>
                            <p>Username</p>
                            <Input type="text" value={this.props.createAccountReducer.createUsername} onChange={this.onCreateUsernameChange} />
                            <p>Password</p>
                            <Input type={this.props.createAccountReducer.showPassword} value={this.props.createAccountReducer.createPassword1} onChange={this.onCreatePassword1Change} />
                            <small id="password-requirements">
                                <ul>
                                    <li>At least 6 characters</li>
                                    <li>At least one capital letter</li>
                                </ul>
                            </small>
                            <span>Re-Type Password</span>
                            <Input style={{
                                "color": `${passwordMatchCheck}`
                            }} type={this.props.createAccountReducer.showPassword} value={this.props.createAccountReducer.createPassword2} onChange={this.onCreatePassword2Change} />
                            <small><input type="checkbox" onChange={this.onShowPasswordChange} />Show Password</small>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.signUpUser}>Create Account</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect((state) => (state))(MySignUpModal);