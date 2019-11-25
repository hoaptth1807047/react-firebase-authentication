import React from 'react';
import * as firebase from "firebase";
import firestore from "firestore";

class UserPage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            username: '',
        };
    }

    addUser = e => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection('users').
        add({
            username: this.state.username,
            email: this.state.email
        });
        this.setState({
            username: '',
            email: ''
        });
    };
    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <form onSubmit={this.addUser}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.updateInput}
                    value={this.state.username}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={this.updateInput}
                    value={this.state.email}
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default UserPage