import React from 'react';
import './MyAccountModal.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
// import axios from 'axios';
import Cookies from 'universal-cookie';
import ChangePasswordModal from './ChangePasswordModal/ChangePasswordModal.js';

const cookie = new Cookies();

class MyAccountModal extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        let accountDetails = cookie.get('data')
        return (
            <div>
                <Button color="info" onClick={this.toggle}>Account</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Account</ModalHeader>
                    <ModalBody>
                        <p>Account Name: {accountDetails.username}</p>
                        <p>Date Created: {accountDetails.dateCreated}</p>
                    </ModalBody>
                    <ModalFooter>
                        <div id="account-btns-div">
                            <Button id="account-done-btn" onClick={this.toggle}>Done</Button>
                            <ChangePasswordModal  id="account-password-btn" />
                            {/* <Button onClick={this.toggle}>Change Password</Button> */}
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect((state) => (state))(MyAccountModal);
