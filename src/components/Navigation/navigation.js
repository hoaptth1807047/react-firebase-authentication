import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut/sign-out';
import {AuthUserContext} from '../Session';
import './navigation.css';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth/> : <NavigationNonAuth/>
            }
        </AuthUserContext.Consumer>
    </div>
);
const NavigationAuth = () => (
    <div>
        <nav className="navbar navbar-light bg-light justify-content-between">
            <ul className="nav">
                <li className="nav-item">
                    <div className="nav-link active">
                        <Link to={ROUTES.ACCOUNT}>Account</Link>
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link active">
                        <Link to={ROUTES.ADMIN}>Admin</Link>
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link active">
                        <Link to={ROUTES.HOME}>Home</Link>
                    </div>
                </li>
                <li className="nav-link">
                    <SignOutButton/>
                </li>
            </ul>
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </nav>
    </div>
);
const NavigationNonAuth = () => (
    <div>
        <nav className="navbar navbar-light bg-light justify-content-between">
            <ul className="nav">
                <li className="nav-item">
                    <div className="nav-link active">
                        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
);
export default Navigation;