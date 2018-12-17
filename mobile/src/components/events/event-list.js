import React, { Component } from 'react'
import {Text, StyleSheet, SectionList, TouchableOpacity} from 'react-native'
import {inject} from 'mobx-react'
import EventCard from './event-card'
import groupBy from 'lodash/groupBy'

@inject('navigation')
class EventList extends Component {
    static propTypes = {

    };

    render() {
        const grouped = groupBy(this.props.events, event => event.title.charAt(0))
        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} events`,
            data: list.map(event => ({key: event.id, event}))
        }))
        return <SectionList
            sections = {sections}
            renderSectionHeader = {({section}) => <Text style={styles.header}>{section.title}</Text>}
            renderItem = {({item}) => <TouchableOpacity onPress = {() => this.handleEventPress(item.event)}>
                    <EventCard event = {item.event} />
                </TouchableOpacity>
                }
        />
    }

    handleEventPress = ({ id, title }) => this.props.navigation.goTo('event', { id, title })
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

export default EventList