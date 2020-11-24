import React from 'react';
import { Button, Card, CardDeck, Form } from 'react-bootstrap';

interface reservation {
    pnr: number,
    FlightID: number,
    fname: string,
    lname: string,
    Class: string
}


class ConfirmPage extends React.Component<{}, reservation>{

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            pnr: 0,
            FlightID: 0,
            fname: "",
            lname: "",
            Class: ""
        }
    }

    render() {
        return (
            <div>
                <CardDeck>
                    <Card>
                        <Card.Title>Welcome to 3200 Airlines</Card.Title>
                        <Card.Body>
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>PNR</Form.Label>
                                    <Form.Control id="pnr" placeholder="1234" />
                                </Form.Group>
                                <Form.Group>
                                    <Button type = "submit" variant="dark" block>
                                        Look up reservation
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    {this.Data()}
                </CardDeck>
            </div>
        )
    }

    private handleSubmit(event: any){
        event?.preventDefault();
        var input = document.getElementById("pnr") as HTMLInputElement;
        var api = "https://localhost:44387/api/checkReservation?pnr=" + input.value;
        
        fetch(api)
            .then(res => res.json())
            .then((result) =>
                this.setState({
                    pnr: result['Pnr'],
                    fname: result['FirstName'],
                    lname: result['LastName'],
                    FlightID: result['flightID'],
                    Class: result['Class']
                }));

    }

    private Data() {
        
        var input = document.getElementById("pnr") as HTMLInputElement;
        if ((input) === null) {
            console.log("It was null");
            return (<div></div>);
        }
        return (
            <Card>
                <Card.Title>Reservation Details</Card.Title>
                <Card.Body>
                    <h3>PNR: {this.state.pnr}</h3>
                    <h3>Passenger First Name: {this.state.fname}</h3>
                    <h3>Passenger Last Name: {this.state.lname}</h3>
                    <h4>Flight Number: {this.state.FlightID}</h4>
                    <h5>Enjoy your trip in {this.getClass()}</h5>
                    <h5>Please save the PNR number for your records.</h5>
                </Card.Body>
            </Card>
        );
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
export default ConfirmPage;