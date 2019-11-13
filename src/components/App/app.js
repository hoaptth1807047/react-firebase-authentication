import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Navigation from '../Navigation/navigation';
import SignUpPage from '../SignUp/sign-up';
import SignInPage from '../SignIn/sign-in';
import HomePage from '../Home/home';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: null,
        };
    }
    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                    ? this.setState({ authUser })
                    : this.setState({ authUser: null });
            },
        );
    }
    componentWillUnmount() {
        this.listener();
    }
    render() {
        return (
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser} />
                    <hr />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route exact path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.ADMIN} component={HomePage} />

                </div>
            </Router>
        )
    }
}
export default withFirebase(App);