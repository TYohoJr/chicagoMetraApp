import React, { Component } from 'react';
import './AlertCollapse.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { connect } from 'react-redux';

class AlertCollapse extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.props.alertHeader}</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody id='alert-collapse-body'>
                            {this.props.alertDetails}
                            {this.props.alertId}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default connect((state) => (state))(AlertCollapse);