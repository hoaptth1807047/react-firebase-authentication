import React from 'react';
import {AuthUserContext, withAuthorization} from '../Session';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">{authUser.uid}</th>
                        <td>{authUser.email}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )}
    </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);