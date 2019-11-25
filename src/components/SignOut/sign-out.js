import React from 'react';
import {withFirebase} from '../Firebase';

const SignOutButton = ({firebase}) => (
    <button className="btn btn-primary my-2 my-sm-0" type="button" onClick={firebase.doSignOut}>
        Sign Out
    </button>
);
export default withFirebase(SignOutButton);