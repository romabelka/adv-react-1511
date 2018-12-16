import React, { Component } from 'react'
import {Text, StyleSheet, SectionList, TouchableOpacity} from 'react-native'
import PeopleCard from './people-card'
import groupBy from 'lodash/groupBy'
import {observer, inject} from 'mobx-react'

@inject('people') @observer
class PeopleList extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.people.loadPeople()
    }

    render() {
        if (this.props.people.loading) return <Text>LOADING</Text>
        
        const { onPersonPress, people } = this.props
        const grouped = groupBy(people.people, person => person.lastName.charAt(0))
        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} person`,
            data: list.map(person => ({key: person.id, person}))
        }))
        

        return <SectionList
            sections = {sections}
            renderSectionHeader = {({section}) => <Text style={styles.header}>{section.title}</Text>}
            renderItem = {({item}) =>
                <TouchableOpacity onPress = {() => onPersonPress(item.person)}>
                    <PeopleCard person = {item.person} />
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

export default PeopleList