import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import MySignUpModal from './MySignUpModal/MySignUpModal';
import MyLogInModal from './MyLogInModal/MyLogInModal.js';
import Cookies from 'universal-cookie';
import './MyNavbar.css';
import MyAccountModal from './MyAccountModal/MyAccountModal.js';

const cookie = new Cookies();

class MyNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logOutUser() {
    localStorage.clear();
    cookie.remove('data');
    cookie.remove('username');
    window.location.reload();
  }

  render() {
    var logOutButton;
    var logInButton = <MyLogInModal />;
    var navbarDropdownName = 'Log In/Create Account';
    var logInGreeting = 'Guest';
    if (cookie.get('username')) {
      logOutButton = <Button color="danger" onClick={this.logOutUser}>Log Out</Button>
      logInButton = <MyAccountModal />;
      navbarDropdownName = 'Account';
      logInGreeting = cookie.get('username');
    }
    return (
      <div id="navbar-div" hidden={this.props.currentPageReducer.hidden}>
        <Navbar color="light" light expand="md">
          <Button color="muted" href='/'>Home</Button>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>User: {logInGreeting}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {navbarDropdownName}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    {logInButton}
                  </DropdownItem>
                  <DropdownItem>
                    {logOutButton}
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <MySignUpModal />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default connect((state) => (state))(MyNavbar);