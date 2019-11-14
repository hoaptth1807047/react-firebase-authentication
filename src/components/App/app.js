import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Navigation from '../Navigation/navigation';
import SignUpPage from '../SignUp/sign-up';
import SignInPage from '../SignIn/sign-in';
import HomePage from '../Home/home';
import AdminPage from '../Admin/admin';
import AccountPage from '../Account/account';
import * as ROUTES from '../../constants/routes';
import {withAuthentication} from '../Session';

const App = () => (
    <Router>
        <div>
            <Navigation/>
            <hr/>
            <Route exact path={ROUTES.HOME} component={HomePage}/>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
            <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
            <Route path={ROUTES.ADMIN} component={AdminPage}/>
            <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
        </div>
    </Router>
);

export default withAuthentication(App);