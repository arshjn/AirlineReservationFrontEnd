import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Dropdown from 'react-bootstrap/Dropdown';
import SearchTable from './SearchTable';
import { Flight } from './SearchTable';
import { Col } from 'react-bootstrap';

interface SearchState {
    flights: Array<Flight>
}
/*
const flight1: Flight = {
    FlightId: 1,
    source: "source",
    destination: "destination",
    departure: "date1",
    arrival: "data2"
}*/
class SearchPage extends React.Component<{}, SearchState>{
    //Flights: any;

    constructor(state: SearchState) {
        super(state);
        this.state = {
            flights: []
        };
    }

    //list1 = [];
    render() {
        return (
            <div>
                <div className="InputArea">
                    <h1 className="CenterText">Search Criteria</h1>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group>
                            <div>
                                <Form.Row>
                                    <Col>
                                    <Form.Group>
                                        <Form.Label>Source</Form.Label>
                                        <Form.Control id="source" as="select">
                                            <option>Fort Lauderdale</option>
                                            <option>Dallas</option>
                                            <option>New York City</option>
                                            <option>London</option>
                                        </Form.Control>
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group>
                                        <Form.Label>Destination</Form.Label>
                                        <Form.Control id="destination" as="select">
                                            <option>New York City</option>
                                            <option>Fort Lauderdale</option>
                                            <option>Dallas</option>
                                            <option>London</option>
                                        </Form.Control>
                                    </Form.Group>
                                    </Col>
                                </Form.Row>
                            </div>
                        </Form.Group>
                        <Button type="submit" className="ButtonSpacing"> Search </Button>
                    </Form>
                </div>
                <div>
                    <SearchTable listOfFlights={this.state.flights} />
                </div>
            </div>
        )
    }

    handleSubmit(event: any) {
        event?.preventDefault();
        var source = (document.getElementById("source") as HTMLSelectElement).value;
        var dest = (document.getElementById("destination") as HTMLSelectElement).value;
        var s, d;
        switch (source) {
            case "Fort Lauderdale":
                s = "FLL";
                break;
            case "Dallas":
                s = "DAL";
                break;
            case "New York City":
                s = "NYC";
                break;
            case "London":
                s = "LON";
                break;
        }
        switch (dest) {
            case "Fort Lauderdale":
                d = "FLL";
                break;
            case "Dallas":
                d = "DAL";
                break;
            case "New York City":
                d = "NYC";
                break;
            case "London":
                d = "LON";
                break;
        }

        var api = "https://localhost:44387/api/Flight?s=" + s + "&d=" + d;
        fetch(api)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        flights: result
                    });

                    //this.Flights = result;
                    //console.log("Done");
                    //console.log(this.state.flights);
                }
            );

    }
}


export default SearchPage;