import React from 'react';
import { Button, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ReservePage from './ReservePage';
//import SearchPage from './SearchPage';

export interface Flight {
    FlightID?: number,
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
var flight1: Flight = { FlightID: 0, SourceCode: "XXX", DestinationCode: "YYY", departure: undefined, arrival: undefined };
var Class1: string = "E";
var displayPrice = 0;
class SearchTable extends React.Component<flights, Prices>{
    //output: number = 0;
    constructor(props: flights, state: Prices) {
        super(props, state);
        this.state = {
            Eprice: 0,
            Bprice: 0,
            Fprice: 0,
        };
        flight1 = { FlightID: undefined, SourceCode: "XXX", DestinationCode: "NYC", departure: undefined, arrival: undefined };
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
        flight1.FlightID = undefined;
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
                <ReservePage flight={flight1} Class={Class1} price={displayPrice} />
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
                    <td>{new Date(flight?.departure!).toString().substr(0,21)}</td>
                    <td>{new Date(flight?.arrival!).toString().substr(0,21)}</td>
                    <td>
                        <OverlayTrigger trigger="focus" placement="bottom" overlay={this.popover(flight)}>
                            <Button variant="primary" id={Number(flight.FlightID).toString()} >Reserve this Flight</Button>
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
                        <Button onClick={e => this.goReserve(flight, "E")} variant="success">Economy ${this.state.Eprice}</Button>
                        <Button onClick={e => this.goReserve(flight, "B")} variant="warning">Business ${this.state.Bprice}</Button>
                        <Button onClick={e => this.goReserve(flight, "F")} variant="danger">First ${this.state.Fprice}</Button>
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

    private goReserve(flight: Flight, Class: string) {
        //some code to go to reserve page
        flight1 = flight;
        Class1 = Class;
        switch (Class) {
            case "E": displayPrice = this.state.Eprice;
                break;
            case "B": displayPrice = this.state.Bprice;
                break;
            case "F": displayPrice = this.state.Fprice;
                break;
        }
        this.setState({});
    }

}
export default SearchTable;