import React from 'react';
import './TrainModal.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

class TrainModal extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.loadTrainData = this.loadTrainData.bind(this);
        this.state = {
            modal: false,
            tripStops: null
        };

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount() {
        this.loadTrainData()
    }

    loadTrainData() {
        this.setState({
            tripStops: this.props.data.map((item) =>{
                return <li>{item.stop_id} - {item.arrival_time.slice(0, 5)}</li>
            })
        })
    }

    render() {
        console.log(this.props.data)
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>{this.props.tripId}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                    <ol>{this.state.tripStops}</ol>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect((state) => (state))(TrainModal);