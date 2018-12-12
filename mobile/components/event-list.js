import React, { Component } from 'react'
import { Text, StyleSheet, SectionList } from 'react-native'
import { sortByFirstChar, objToMap } from '../services/utils'
class EventList extends Component {
    static propTypes = {

    };

    renderTitle = () => objToMap(sortByFirstChar(this.props.events))

    render() {
        return (
            <SectionList
                renderItem={({ item }) => <Text key={item.id} style={styles.items}>{item.title} </Text>}
                renderSectionHeader={({ section: { title, data } }) => (
                    <Text style={styles.header}> {title} --- Записей: {data.length}</Text>
                )}
                contentContainerStyle={styles.container}
                sections={this.renderTitle()}
                keyExtractor={(item, index) => item.id}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    header: {
        borderWidth: 1,
        fontWeight: 'bold'
    },
    items: {
        height: 50,
        // ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        // android
        elevation: 2,

    }

})

export default EventList