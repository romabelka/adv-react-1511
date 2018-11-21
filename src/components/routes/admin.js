import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class AdminPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Fragment>
                { this.props.hasToken && (
                    <div>
                        <h1>Admin page</h1>
                        <div>Email: {this.props.email}</div>
                    </div>
                )}
                { this.props.hasToken || (
                    <Redirect to="/auth/sign-in" />
                )}
            </Fragment>

        )
    }
}

export default connect(state => ({
    hasToken: Boolean(state.auth.token),
    email: state.auth.email,
}))(AdminPage)