import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {moduleName} from '../../ducks/auth'
import UnAuthorized from './un-authorized'

class ProtectedRoute extends Component {
    static propTypes = {};

    render() {
        const {component, ...rest} = this.props
        return <Route {...rest} render={this.renderProtected}/>
    }

    renderProtected = (routeProps) => {
        const {component: ProtectedComponent, auth} = this.props
        return auth ? <ProtectedComponent {...routeProps}/> : <UnAuthorized />
    }
}

export default connect(state => ({
    auth: !!state[moduleName].user
}), null, null, {pure: false})(ProtectedRoute)