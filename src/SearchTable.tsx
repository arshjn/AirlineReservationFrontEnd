import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
//import SearchPage from './SearchPage';

export interface Flight {
    FlightID: number,
    SourceCode: string,
    DestinationCode: string,
    departure: Date,
    arrival: Date
}
interface flights {
    listOfFlights: Array<Flight>;
}

class SearchTable extends React.Component<flights, {}>{
    render() {
        return (
            <div>
                <h2>Flights</h2>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Flight Number</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Reserve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createRows()}
                    </tbody>
                </Table>
            </div>
        )
    }
    private createRows() {
        return (
            this.props.listOfFlights.map((flight) =>
                <tr>
                    <td>AA{flight.FlightID}</td>
                    <td>{flight.SourceCode}</td>
                    <td>{flight.DestinationCode}</td>
                    <td>{flight.departure}</td>
                    <td>{flight.arrival}</td>
                    <td>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={this.popover(flight.FlightID)}>
                            <Button variant="light" id={Number(flight.FlightID).toString()} >Reserve this Flight</Button>
                        </OverlayTrigger>
                    </td>
                </tr>
            )
        )
    }

    private popover(ID: number) {
        return (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Let's goooo</Popover.Title>
                <Popover.Content>
        <Button id={"E" + Number(ID).toString()} variant="dark">Economy {this.getFare()}</Button>
                    <Button id={"B" + Number(ID).toString()} variant="dark">Business</Button>
                    <Button id={"F" + Number(ID).toString()} variant="dark">First</Button>
                </Popover.Content>
            </Popover>
        )
    }

    
}
export default SearchTable;