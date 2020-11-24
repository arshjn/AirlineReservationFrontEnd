import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { Flight } from './SearchTable';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';


interface ReserveProp {
    flight?: Flight
    Class?: string
    price?: number
}


class ReservePage extends React.Component<ReserveProp, {}>{

    componentDidUpdate() {
        document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    render() {
        if (this.props.flight?.FlightID === undefined) {
            return (<div></div>);
        }
        return (
            <div id="reserve">
                <CardDeck>
                    <Card>
                        <Card.Title>
                            Selected Flight Details
                        </Card.Title>
                        <Card.Body>
                            <h5>Flight AA{this.props.flight?.FlightID}</h5>
                            <br></br>
                            <h3>From: {this.getNameOfPlace(this.props.flight?.SourceCode!)} </h3>
                            <h3>To: {this.getNameOfPlace(this.props.flight?.DestinationCode!)}</h3>
                            <h6>Departing {new Date(this.props.flight?.departure!).toString()} </h6>
                            <h6> Arriving {new Date(this.props.flight?.arrival!).toString()}</h6>
                            <h6>Class Code: {this.props.Class}</h6>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control id="fname" required />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control id="lname" required />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control type="tel" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridAddress1">
                                        <Form.Label>Credit Card/Debit Card number</Form.Label>
                                        <Form.Control type="number" placeholder="Visa, Mastercard or American Express" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formCardName">
                                        <Form.Label>Name of Cardholder</Form.Label>
                                        <Form.Control />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Card Expiration</Form.Label>
                                        <Form.Control type="month" placeholder="MM/YY" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>Security Code</Form.Label>
                                        <Form.Control placeholder="CVC" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control />
                                    </Form.Group>
                                </Form.Row>


                                <Form.Group>
                                    <Button onClick = {() => {window.location.href = this.ReserveURL()}} variant="dark" block>
                                        Submit Payment Total: ${this.props.price}
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </CardDeck >
            </div >
        )
    }
    private ReserveURL() {
        return "/RConf/" + this.props.flight?.FlightID + "/" + (document.getElementById("fname") as HTMLInputElement).value + "/" + (document.getElementById("lname") as HTMLInputElement).value + "/" + this.props.Class;
    }

    private getNameOfPlace(code: string): string {
        switch (code) {
            case "FLL": return "Fort Lauderdale-Hollywood, Florida";
            case "DAL": return "Dallas-Fort Worth, Texas";
            case "NYC": return "J.F.K, New York";
            case "LON": return "London Heathrow, England";
            default:
                return "Error, please try again";
        }
    }
}
export default ReservePage;