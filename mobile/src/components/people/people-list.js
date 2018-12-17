import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import {TouchableOpacity, Text, SectionList, ActivityIndicator, StyleSheet} from 'react-native'
import PersonCard from './person-card'

@inject('people')
@observer
class PeopleList extends Component {
    static defaultProps = {
        onPersonPress: () => {}
    };

    componentDidMount() {
        const {people} = this.props
        if (!people.loaded) people.loadAll()
    }

    render() {
        const {onPersonPress, people} = this.props
        if (people.loading) return <ActivityIndicator size='large'/>

        return <SectionList
            sections = {people.sections}
            renderSectionHeader = {({section}) => <Text style={styles.header}>{section.title}</Text>}
            renderItem = {({item}) => <TouchableOpacity onPress = {onPersonPress.bind(null, item.key)}>
                <PersonCard person = {item.person} />
            </TouchableOpacity>}
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