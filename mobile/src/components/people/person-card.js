import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'
import Card from '../common/card'
import { observer, inject } from 'mobx-react'

@inject('navigation')
@observer
class PersonCard extends Component {
    static propTypes = {

    };

    render() {
        const { email, firstName, lastName, id, avatar } = this.props.person
        return (
            <View>
                <Card style={styles.container}>
                    <Image source={{ uri: avatar || 'http://lorempixel.com/200/100/people/' }} style={styles.avatar} />
                    <View style={styles.content}>
                        <Text style={styles.email}>{email}</Text>
                        <Text>{firstName} {lastName}</Text>
                    </View>

                </Card>
                <Button
                    title={'Take Photo'}
                    onPress={() => this.handleEventPress(id)}
                />
            </View>
        )
    }

    handleEventPress = id => { this.props.navigation.goTo('photo', { id }) }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    avatar: {
        width: 200,
        height: 100,
        margin: 5
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    email: {
        fontWeight: 'bold'
    }
})

export default PersonCard