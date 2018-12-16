import React, { Component } from 'react'
import {Text, StyleSheet, SectionList, TouchableOpacity} from 'react-native'
import EventCard from './event-card'
import groupBy from 'lodash/groupBy'
import {observer, inject} from 'mobx-react'

@inject('events') @observer
class EventList extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.events.loadEvents()
    }

    render() {
        if (this.props.events.loading) return <Text>LOADING</Text>
        
        const { onEventPress, events } = this.props
        const grouped = groupBy(events.events, event => event.title.charAt(0))
        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} events`,
            data: list.map(event => ({key: event.id, event}))
        }))
        

        return <SectionList
            sections = {sections}
            renderSectionHeader = {({section}) => <Text style={styles.header}>{section.title}</Text>}
            renderItem = {({item}) =>
                <TouchableOpacity onPress = {() => onEventPress(item.event)}>
                    <EventCard event = {item.event} />
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

export default EventList