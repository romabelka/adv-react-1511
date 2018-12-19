import React, { Component } from 'react'
import {View, Text, Image, StyleSheet, Button} from 'react-native'
import Card from '../common/card'
import {observer, inject} from 'mobx-react'

@inject('navigation')
@observer
class PersonCard extends Component {
    static propTypes = {

    };

    handlePressButton = ( {id} ) => this.props.navigation.goTo('camera',  {id} )
    

    render() {
        const { email, firstName, lastName, photo} = this.props.person
        const image = (photo == null || photo === '')  ? {uri: 'http://lorempixel.com/200/100/people/'} : {uri: photo}
        return (
            <Card style = {styles.container}>
                <Image source={image} style = {styles.avatar}/>
                <View style = {styles.content}>
                    <Text style = {styles.email}>{email}</Text>
                    <Text>{firstName} {lastName}</Text>
                </View>
                <Button title="Change Photo" onPress={() => this.handlePressButton(this.props.person)}/>
            </Card>
        )
    }
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