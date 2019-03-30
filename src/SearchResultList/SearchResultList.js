import React, { Component } from 'react';
import './SearchResultList.css';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

class SearchResultList extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.createTable = this.createTable.bind(this);
        this.state = {
            collapse: false,
            list: '',
            tableData: null,
            searchResults: this.props.searchResults
        };
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    componentDidMount() {
        this.createTable();
    }

    createTable() {
        this.setState({
            tableData: this.props.searchResults.map((item) => {
                debugger
                return <tr>
                    <td>{item[0].trip_id}</td>
                    <td>{item[0].stop_id}</td>
                    <td>{item[item.length - 1].stop.id}</td>
                </tr>
            })
        })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{this.props.startStop}</th>
                            <th>{this.props.endStop}</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.tableData}</tbody>
                </Table>
                {this.state.list}
            </div>
        );
    }
}

export default connect((state) => (state))(SearchResultList);