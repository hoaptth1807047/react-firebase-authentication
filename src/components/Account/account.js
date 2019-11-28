import React from 'react';
import {withAuthorization} from '../Session';
import {Link} from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import "../Form/form.css";

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
            key: '',
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        this.unsubscribe = this.props.firebase
            .users()
            .onSnapshot(snapshot => {
                let users = [];
                snapshot.forEach(doc =>
                    users.push({
                        ...doc.data(),
                        key: doc.id,
                    }),
                );
                this.setState({
                    users,
                    loading: false,
                });
            })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleClick = key => {
        const deleteRef = this.props.firebase.users().doc(key);
        let users = [];
        if (users.filter(user => user.key === key)) {
            deleteRef.delete().then(() => {
                console.log("Document successfully deleted!");
                this.props.history.push("/accounts")
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    };

    render() {
        const {users} = this.state;
        console.log(users);
        return (
            <div className="container">
                <div>
                    <Link to={ROUTES.CREATE} className="btn btn-create btn-success">Create</Link>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">User Name</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    {users.map(user => (
                        <tbody key={user.key}>
                        <tr>
                            <th scope="row">{user.key}</th>
                            <td>{user.username}</td>
                            <td>
                                <Link to={`/account/detail/${user.key}`} className="btn btn-secondary">Detail</Link>
                            </td>
                            <td>
                                <Link to={`/account/edit/${user.key}`} className="btn btn-secondary">Edit</Link>
                            </td>
                            {/*<td>*/}
                            {/*    <button type="submit" className="btn btn-danger">Delete</button>*/}
                            {/*</td>*/}
                            <td>
                                <button onClick={() => this.handleClick(user.key)} type="submit"
                                        className="btn btn-danger">Delete
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);