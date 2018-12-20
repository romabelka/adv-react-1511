import React, { Component } from 'react'
import PersonPhoto from '../people/person-photo'

class PersonPhotoScreen extends Component {
    static propTypes = {

    };

    render() {
        return <PersonPhoto id = {this.props.navigation.state.params.id} />
    }

}


export default PersonPhotoScreen