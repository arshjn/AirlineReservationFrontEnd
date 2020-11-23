import React from 'react';
import { Button } from 'react-bootstrap';


class HomePage extends React.Component<{}, {}>{

    render() {
        return (
            <div>
                <h1>Welcome to 3200 Airlines</h1>
                <Button variant = "light" className="ButtonSpacing"> Create New Reservation </Button>
                <Button variant = "light" className="ButtonSpacing"> Look up existing reservation </Button>

            </div>
        )
    }


}
export default HomePage;