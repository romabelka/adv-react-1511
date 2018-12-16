import React, { Component } from 'react'
import PeopleList from '../people/people-list'

class PeopleListScreen extends Component {

    render() {
        return <PeopleList onPersonPress = {this.handlePersonPress}/>
    }

    handlePersonPress = person => {
        this.props.navigation.navigate('person', { id: person.id })
    }
}

export default PeopleListScreen