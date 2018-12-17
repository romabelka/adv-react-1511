import React, { Component } from 'react'
import {Text, StyleSheet} from 'react-native'
import {observer} from 'mobx-react'
import Card from '../common/card'

@observer
class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const { event } = this.props
        return (
            <Card>
                <Text>{event.title}</Text>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventCard