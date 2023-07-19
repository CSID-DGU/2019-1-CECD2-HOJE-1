import React from 'react';
import {render} from 'react-dom';
import ResponsiveDrawer from './client/ResponsiveDrawer';
import {Redirect, BrowserRouter as Router} from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    {window.location.pathname.includes('index.html') && <Redirect to={"/"}/>}
                    <ResponsiveDrawer/>
                </Router>
            </div>
        )
    }
}

render(<App/>, document.getElementById("root"));
