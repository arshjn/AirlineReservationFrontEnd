import React from 'react';
import SearchPage from './SearchPage';

interface Flight {
    FlightId: number,
    source: string,
    destination: string,
    departure: Date,
    arrival: Date
}
interface flights {
    Flights: Flight[];
}

class SearchTable extends React.Component < any , any>{
    render(){
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
                                {this.props.Flights.map(flight => (
                                    <tr key={flight.FlightId}>
                                        <td>{flight.FlightId}</td>
                                        <td>{flight.source}</td>
                                        <td>{flight.destination}</td>
                                        <td>{flight.departure}</td>
                                        <td>{flight.arrival}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
        )
    }
}
export default SearchTable;