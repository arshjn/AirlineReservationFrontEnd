import React from 'react';
import { Button, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ReservePage from './ReservePage';
//import SearchPage from './SearchPage';

export interface Flight {
    FlightID: number,
    SourceCode: string,
    DestinationCode: string,
    departure?: Date,
    arrival?: Date
}
interface flights {
    listOfFlights: Array<Flight>;
}
interface Prices {
    Eprice: number,
    Bprice: number,
    Fprice: number
}
class SearchTable extends React.Component<flights, Prices>{
    //output: number = 0;
    //flight: Flight = {FlightID = 0, SourceCode = "XXX", DestinationCode = "YYY", departure = new Date(), arrival = new Date()};
    constructor(props: flights, state: Prices) {
        super(props, state);
        this.state = {
            Eprice: 0,
            Bprice: 0,
            Fprice: 0,
        };
    }

    componentDidMount() {
        if (this.props.listOfFlights.length > 0) {
            console.log("ComponentDidMount called");
            var flight = this.props.listOfFlights[0];
            this.getFare("E", flight.SourceCode, flight.DestinationCode)
            this.getFare("B", flight.SourceCode, flight.DestinationCode)
            this.getFare("F", flight.SourceCode, flight.DestinationCode)
        }
    }

    componentDidUpdate(prevProps: flights) {
        /*if (prevProps.listOfFlights.length > 0 && this.props.listOfFlights.length > 0) {
            if (prevProps.listOfFlights[0].FlightID !== this.props.listOfFlights[0].FlightID) {

                var flight = this.props.listOfFlights[0];
                this.getFare("E", flight.SourceCode, flight.DestinationCode)
                this.getFare("B", flight.SourceCode, flight.DestinationCode)
                this.getFare("F", flight.SourceCode, flight.DestinationCode)
            }
        }*/

        if (prevProps.listOfFlights && prevProps.listOfFlights[0] && prevProps.listOfFlights[0].FlightID && this.props.listOfFlights && this.props.listOfFlights[0] && this.props.listOfFlights[0].FlightID && prevProps.listOfFlights[0].FlightID === this.props.listOfFlights[0].FlightID) return;
        var flight = this.props.listOfFlights[0];
        this.getFare("E", flight.SourceCode, flight.DestinationCode)
        this.getFare("B", flight.SourceCode, flight.DestinationCode)
        this.getFare("F", flight.SourceCode, flight.DestinationCode)
    }
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
                <ReservePage />
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
                        <OverlayTrigger trigger="click" placement="bottom" overlay={this.popover(flight)}>
                            <Button variant="light" id={Number(flight.FlightID).toString()} >Reserve this Flight</Button>
                        </OverlayTrigger>
                    </td>
                </tr>
            )
        )
    }

    private popover(flight: Flight) {
        return (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Let's goooo</Popover.Title>
                <Popover.Content>
                    <ButtonGroup>
                        <Button onClick = {e => this.goReserve(flight, "E")} variant="light">Economy ${this.state.Eprice}</Button>
                        <Button onClick = {e => this.goReserve(flight, "B")} variant="secondary">Business ${this.state.Bprice}</Button>
                        <Button onClick = {e => this.goReserve(flight, "F")} variant="dark">First ${this.state.Fprice}</Button>
                    </ButtonGroup>
                </Popover.Content>
            </Popover>
        );
    }

    private getFare(Class: string, S: string, D: string) {
        var api = "https://localhost:44387/api/Route?source=" + S + "&destination=" + D + "&Class=" + Class;
        console.log("getFare called with class = " + Class);
        switch (Class) {
            case "E":
                fetch(api)
                    .then(res => res.json())
                    .then((result) => {
                        this.setState({
                            Eprice: result
                        }
                        )
                    });
                break;
            case "B":
                fetch(api)
                    .then(res => res.json())
                    .then((result) => {
                        this.setState({
                            Bprice: result
                        }
                        )
                    });
                break;
            case "F":
                fetch(api)
                    .then(res => res.json())
                    .then((result) => {
                        this.setState({
                            Fprice: result
                        }
                        )
                    });
                break;
            default:
                break;
        }
    }

    private goReserve(flight: Flight, Class: string){
        //some code to go to reserve page

    }

}
export default SearchTable;