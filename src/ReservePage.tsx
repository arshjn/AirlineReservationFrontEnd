import React from 'react';
import { Flight } from './SearchTable';


interface ReserveProp {
    flight?: Flight
    Class?: string
}


class ReservePage extends React.Component<ReserveProp, {}>{

    render() {
        return (
            <div>
                <h1>Flying from {this.getNameOfPlace(this.props.flight?.SourceCode!)} to {this.getNameOfPlace(this.props.flight?.DestinationCode!)}</h1>
                <h3>Flight Number: {this.props.flight?.FlightID}</h3>
                <h4>Departing {this.props.flight?.departure}</h4>
            </div>
        )
    }

    private getNameOfPlace(code: string): string {
        switch (code) {
            case "FLL": return "Fort Lauderdale-Hollywood, FL";
            case "DAL": return "Dallas-Fort Worth, TX";
            case "NYC": return "J.F.K, New York";
            case "LON": return "London Heathrow";
            default:
                return "Error, please try again";
        }
    }

}
export default ReservePage;