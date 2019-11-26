import React from 'react';
import '../Form/form.css'
import {withAuthorization} from "../Session";
import * as ROUTES from '../../constants/routes';
import {Link} from "react-router-dom";

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            loading: false,
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: ''
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        const userRef = this.props.firebase.users().doc(this.props.match.params.id);
        userRef.get().then(doc => {
            if (doc.exists) {
                const user = doc.data();
                this.setState({
                    loading: true,
                    key: doc.id,
                    username: user.username,
                    email: user.email,
                });
            } else {
                console.log("No such document!");
            }
        })
    }

    onSubmit = e => {
        const {username, email, passwordOne, passwordTwo} = this.state;
        const updateRef = this.props.firebase.users().doc(this.state.key);
        updateRef.set({
            username,
            email,
            passwordOne,
            passwordTwo
        }).then(doc => {
            this.setState({
                username: '',
                email: '',
                passwordOne: '',
                passwordTwo: ''
            });
            alert('Updated Success!');
            this.props.history.push(ROUTES.ACCOUNT);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
        e.preventDefault();
    };

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({user: state});
    };


    render() {
        return (
            <form onSubmit={this.onSubmit} className="container formCss">
                <div className="headerTitle">
                    <h2>Edit</h2>
                </div>
                <Link to={'/accounts'} className="btn btn-success"> Back</Link>&nbsp;
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(EditPage);