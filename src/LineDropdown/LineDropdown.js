import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './LineDropdown.css';
import LinePage from '../LinePage/LinePage.js';
import { connect } from 'react-redux';

class LineDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.selectLine = this.selectLine.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    selectLine(e) {
        this.props.dispatch({
            type: 'changeCurrentPage',
            currentPage: <LinePage line={e.target.innerHTML}/>
        });
    }

    render() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    Choose Your Line
        </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.selectLine}>MD-N</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectLine}>NCS</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectLine}>UP-N</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectLine}>UP-NW</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectLine}>HC</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectLine}>ME</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectLine}>RI</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectLine}>SWS</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectLine}>BNSF</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectLine}>MD-W</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.selectLine}>UP-W</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

export default connect((state) => (state))(LineDropdown);