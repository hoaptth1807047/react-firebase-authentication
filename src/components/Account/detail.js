import React from 'react';
import {Link} from "react-router-dom";
import {withAuthorization} from "../Session";

class DetailPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: {},
            key: ''
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        const detailRef = this.props.firebase.users().doc(this.props.match.params.id);
        detailRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    user: doc.data(),
                    key: doc.id,
                    loading: false
                });
            } else {
                console.log("No such document!");
            }
        });
    }
    // delete(id) {
    //     this.props.firebase.users().doc(id).delete().then(() => {
    //         console.log("Document successfully deleted!");
    //         this.props.history.push("/accounts")
    //     }).catch((error) => {
    //         console.error("Error removing document: ", error);
    //     });
    // }
    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4><Link to="/">User Detail</Link></h4>
                        {/*<h3 className="panel-title">*/}
                        {/*    {this.state.user.title}*/}
                        {/*</h3>*/}
                    </div>
                    <div className="panel-body">
                        <dl>
                            <dt>User Name:</dt>
                            <dd>{this.state.user.username}</dd>
                            <dt>Email:</dt>
                            <dd>{this.state.user.email}</dd>
                        </dl>
                        <Link to={'/accounts'} className="btn btn-success"> Back</Link>&nbsp;
                        {/*<button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(DetailPage);