import React from 'react';
import SearchPage from './SearchPage';

export interface Flight {
    FlightId: number,
    source: string,
    destination: string,
    departure: string,
    arrival: string
}
interface flights {
    listOfFlights: Array<Flight>;
}

class SearchTable extends React.Component<flights, {}>{
    render() {
        return (
            <div>
                <h2>Flights</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Flight Number</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createRows()}
                    </tbody>
                </table>
            </div>
        )
    }
    private createRows(){
        return(
            this.props.listOfFlights.map((flight) =>
                <tr>
                    <td>{flight.FlightId}</td>
                    <td>{flight.source}</td>
                    <td>{flight.destination}</td>
                    <td>{flight.departure}</td>
                    <td>{flight.arrival}</td>
                </tr>
            )
        )
    }
}
export default SearchTable;