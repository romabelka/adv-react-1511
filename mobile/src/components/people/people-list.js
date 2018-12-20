import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import {TouchableOpacity, Text, SectionList, StyleSheet} from 'react-native'
import PersonCard from './person-card'

@inject('people', 'navigation')
@observer
class PeopleList extends Component {
    static defaultProps = {
        onPersonPress: () => {}
    };

    render() {
        const {people} = this.props

        return <SectionList
            sections = {people.sections}
            renderSectionHeader = {({section}) => <Text style={styles.header}>{section.title}</Text>}
            renderItem = {({item}) => <TouchableOpacity onPress = {this.handlePress(item.key)}>
                <PersonCard person = {item.person} />
            </TouchableOpacity>}
        />
    }

    handlePress = (id) => () => this.props.navigation.goTo('personPhoto', { id })
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