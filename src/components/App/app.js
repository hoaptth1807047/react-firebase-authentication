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
import DetailPage from '../Account/detail';
import EditPage from '../Account/edit';
import UserPage from '../../test/user';
import * as ROUTES from '../../constants/routes';
import {withAuthentication} from '../Session';

const App = () => (
    <Router>
        <div>
            <Navigation/>
            <Route exact path={ROUTES.HOME} component={HomePage}/>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
            <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
            <Route path={ROUTES.ADMIN} component={AdminPage}/>
            <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
            <Route path='/account/detail/:id' component={DetailPage}/>
            <Route path='/account/edit/:id' component={EditPage}/>
            <Route path={ROUTES.USER} component={UserPage}/>
        </div>
    </Router>
);

export default withAuthentication(App);