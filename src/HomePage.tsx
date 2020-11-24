import React from 'react';
import { Button, Card, CardDeck } from 'react-bootstrap';


class HomePage extends React.Component<{}, {}>{

    render() {
        return (
            <div>
                <h1>Welcome to 3200 Airlines</h1>
                <br>
                </br>
                <CardDeck>
                    <Card>
                        <Button variant="light" onClick={() => { window.location.href = "/search" }} className="ButtonSpacing"> Create New Reservation </Button>
                    </Card>
                    <Card>
                        <Button variant="light" onClick={() => { window.location.href = "/confirm" }} className="ButtonSpacing"> Look up existing reservation </Button>
                    </Card>
                </CardDeck>
            </div>
        )
    }


}
export default HomePage;