import React, { Component } from 'react'
import {View, ScrollView, Text, StyleSheet, SectionList} from 'react-native'
import _  from 'lodash'

class EventList extends Component {
    static propTypes = {

    }

    getSections() {
        const { events } = this.props

        const groopedEvents = _.groupBy(events, (item) => {
            return item.title[0].toLowerCase()
        })

        const letters = Object.keys(groopedEvents).sort()
        return letters.map(item => ({title: item.toUpperCase(), data: groopedEvents[item]}))
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.sectionContainer}>
                    <SectionList
                        renderItem={({item, index, section}) => <Text key={index}>{item.title}</Text>}
                        renderSectionHeader={({section: {title, data}}) => (
                            <Text style={{fontWeight: 'bold'}}>{title} count: {data.length}</Text>
                        )}
                        sections={this.getSections()}
                        keyExtractor={(item, index) => item + index}
                    />
                </View>
            </ScrollView>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "slategray",
        paddingTop: 50,
        paddingRight: 20,
        paddingLeft: 20
    },
    sectionContainer: {
        backgroundColor: "white",
        padding: 20,
        marginBottom: 80
    }
})

export default EventList
