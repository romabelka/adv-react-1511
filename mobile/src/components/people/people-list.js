import React, { Component } from 'react'
import {Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import PersonCard from './person-card'
import {observer, inject} from 'mobx-react'

@inject('people')
@observer
class PersonList extends Component {
    componentDidMount(){
        this.props.people.fetchAllPeople()
    }

    render() {
        const { onPersonPress } = this.props
        const {persons} = this.props.people
        return <FlatList
            data={persons}
            renderItem = {({person}) =>
                <TouchableOpacity onPress = {() => onPersonPress(person)}>
                    <PersonCard person = {person} />
                </TouchableOpacity>
            }
        />
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F0F0F0',
        height: 40,
        lineHeight: 40,
        marginBottom: 5,
        shadowOffset: {
            height: 2, width: 0
        },
        shadowOpacity: 0.3,
        elevation: 3
    }
})

export default PersonList