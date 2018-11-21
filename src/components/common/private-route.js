import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {isAuthorized} from '../../ducks/auth'

class PrivateRoute extends Component {
    render() {
        const {component: Component, isAuthorized, ...rest} = this.props
        console.log('=== Render private route');
        return <Route {...rest} render={(props) => (
            isAuthorized ?
                <Component {...props} /> :
                <Redirect to='/auth/sign-in' />
        )} />
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthorized: isAuthorized(state)
    }
}

export default connect(mapStateToProps, null, null, {pure: false})(PrivateRoute)