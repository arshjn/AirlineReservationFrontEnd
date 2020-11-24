import React from 'react';
import { RouteComponentProps } from 'react-router-dom';


interface Prop {
    flightID: string
    fname: string
    lname: string
    Class: string
}
export interface State {
    FlightID: number
    Class: string
    fname: string
    lname: string
    pnr: number
}

class RConf extends React.Component<RouteComponentProps<Prop>, State>{
    constructor(props: RouteComponentProps<Prop>) {
        super(props);
        this.state = {
            pnr: 0,
            FlightID: Number(this.props.match.params.flightID),
            Class: this.props.match.params.Class,
            fname: this.props.match.params.fname,
            lname: this.props.match.params.lname
        };
    }

    componentDidMount() {
        if (this.props.match.params) {
            try {
                console.log("Setting State in DidMount");
                this.setState({
                    FlightID: Number(this.props.match.params.flightID),
                    fname: this.props.match.params.fname,
                    lname: this.props.match.params.lname,
                    Class: this.props.match.params.Class
                })
                console.log("Caught Params: FlightID= " + this.state.FlightID);
                var api = "https://localhost:44387/api/Reservation?flightId=" + this.state.FlightID + "&firstName=" + this.state.fname + "&lastName=" + this.state.lname + "&Class=" + this.state.Class;
                console.log(api);
                fetch(api)
                    .then(res => res.json())
                    .then((result) => {
                        this.setState({
                            pnr: result
                        })
                    });
            }
            catch (err) {
                this.setState({
                    fname: "Error"
                })
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Your Flight is confirmed! Please Check Details below: </h1>
                <h3>PNR {this.state.pnr}</h3>
                <h3>Passenger First Name: {this.state.fname}</h3>
                <h3>Passenger Last Name: {this.state.lname}</h3>
                <h4>Flight Number: {this.state.FlightID}</h4>
                <h5>Enjoy your trip in {this.getClass()}</h5>
                <h5>Please save the PNR number for your records.</h5>
            </div >
        )
    }

    private getClass(): string {
        switch (this.state.Class) {
            case "E": return "Economy Class";
            case "B": return "Business Class";
            case "F": return "First Class";
        }
        return "";
    }
}
export default RConf;