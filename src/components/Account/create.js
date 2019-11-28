import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import '../Form/form.css'

const CreatePage = () => (
    <div>
        <CreateForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class CreateFormBase extends Component {
    firebase;
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {username, email,passwordOne} = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // tạo người dùng trong database realtime.
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        passwordOne
                    });
            })
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.ACCOUNT)
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        return (
            <form onSubmit={this.onSubmit} className="container formCss">
                <div className="headerTitle">
                    <h2>Create</h2>
                </div>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Full Name"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email Address"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-control"
                        name="passwordOne"
                        value={this.state.passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        className="form-control"
                        name="passwordTwo"
                        value={this.state.passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </div>
                <button disabled={isInvalid} type="submit" className="btn btn-primary">Submit</button>
                <div>
                    {error && <p>{error.message}</p>}
                </div>
            </form>
        );
    }
}

const CreateForm = compose(withRouter, withFirebase)(CreateFormBase);
export default CreatePage;
export {CreateForm};