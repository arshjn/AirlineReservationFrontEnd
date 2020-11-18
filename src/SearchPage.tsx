import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Dropdown from 'react-bootstrap/Dropdown';

class SearchPage extends React.Component<{}, {}>{
    render() {
        return (
            <div>
                <div className="InputArea">
                    <p className="CenterText">Search Criteria</p>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>

                            <div>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Source</Form.Label>
                                    <Form.Control id="source" as="select">
                                        <option>Fort Lauderdale</option>
                                        <option>Dallas</option>
                                        <option>New York</option>
                                        <option>London</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Destination</Form.Label>
                                    <Form.Control id="destination" as="select">
                                        <option>New York</option>
                                        <option>Fort Lauderdale</option>
                                        <option>Dallas</option>
                                        <option>London</option>
                                    </Form.Control>
                                </Form.Group>

                            </div>
                        </Form.Group>
                        <Button type="submit" className="ButtonSpacing"> Submit </Button>
                    </Form>
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

        var string = "https://localhost:44387/api/Flight?s=" + s + "&d=" + d;

    }
}


export default SearchPage;