import React, { Component } from 'react'
import { SectionList, Text, StyleSheet} from 'react-native'
import Event from "./event";

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <SectionList
                sections = {this.props.sections}
                renderItem = {({item, index}) => <Event entity={item} />}
                renderSectionHeader = {({section: {title, data}}) => (
                 <Text style={styles.title} >{title} ({data.length}) </Text>
                )}
                keyExtractor = {(item) => item.id}
            />
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        margin: 5
    }
})
export default EventList