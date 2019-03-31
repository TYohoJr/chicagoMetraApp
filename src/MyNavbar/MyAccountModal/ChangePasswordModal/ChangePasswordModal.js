import React from 'react';
import './ChangePasswordModal.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

class ChangePasswordModal extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onOldPasswordChange = this.onOldPasswordChange.bind(this);
        this.onNewPassword1Change = this.onNewPassword1Change.bind(this);
        this.onNewPassword2Change = this.onNewPassword2Change.bind(this);
        this.onShowPasswordChange = this.onShowPasswordChange.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.state = {
            modal: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onOldPasswordChange(e) {
        this.props.dispatch({
            type: "changeOldPassword",
            oldPassword: e.target.value
        })
    }

    onNewPassword1Change(e) {
        this.props.dispatch({
            type: "changeNewPassword1",
            newPassword1: e.target.value
        })
    }

    onNewPassword2Change(e) {
        this.props.dispatch({
            type: "changeNewPassword2",
            newPassword2: e.target.value
        })
    }

    onShowPasswordChange() {
        if (this.props.changePasswordReducer.showPassword === "password") {
            this.props.dispatch({
                type: "changeShowPassword",
                showPassword: "text"
            })
        } else if (this.props.changePasswordReducer.showPassword === "text") {
            this.props.dispatch({
                type: "changeShowPassword",
                showPassword: "password"
            })
        }
    }

    changePassword() {
        let account = this.props.changePasswordReducer
        if (account.newPassword1 !== account.newPassword2) {
            return alert("Passwords must match");
        } else if (!account.newPassword1) {
            return alert("Password can't be blank");
        } else if (account.newPassword1.length < 6) {
            return alert("Password must be at least 6 characters long");
        }
        axios.post("/changePassword", { username: cookie.get('username'), oldPassword: account.oldPassword, newPassword1: account.newPassword1 }).then((result) => {
            if (result.data === "Successfully updated password") {
                alert(result.data);
                this.toggle();
            } else {
                alert(result.data);
            }
        })
    }

    render() {
        var passwordMatchCheck = "Red";
        if (this.props.changePasswordReducer.newPassword1 === this.props.changePasswordReducer.newPassword2) {
            passwordMatchCheck = "Black";
        }
        return (
            <div>
                <Button color="info" onClick={this.toggle}>Change Password</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Change Password</ModalHeader>
                    <ModalBody>
                        <div>
                            <p>Old Password</p>
                            <Input type="password" value={this.props.changePasswordReducer.oldPassword} onChange={this.onOldPasswordChange} />
                            <p>New Password</p>
                            <Input type={this.props.changePasswordReducer.showPassword} value={this.props.changePasswordReducer.newPassword1} onChange={this.onNewPassword1Change} />
                            <small><input type="checkbox" onChange={this.onShowPasswordChange} />Show Password</small>
                            <p>Re-Type New Password</p>
                            <Input style={{
                                "color": `${passwordMatchCheck}`
                            }} type="password" value={this.props.changePasswordReducer.newPassword2} onChange={this.onNewPassword2Change} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.changePassword}>Submit</Button>
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect((state) => (state))(ChangePasswordModal);