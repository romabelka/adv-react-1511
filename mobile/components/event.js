import React, { Component } from 'react'
import {View, ScrollView, Text, StyleSheet, Button, Alert} from 'react-native'

class Event extends Component {
    static propTypes = {

    }
    onPressDeleteEvent(){
        Alert.alert(
            'Delete Event',
            'Do you want delete this Event?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => console.log('Delete Event')},
            ],
            { cancelable: true }
          )
    }

    render() {
        const { title, url, when, where } = this.props.event 
        return (
            <ScrollView style={styles.eventContainer}>
                <View>
                    <Text style={styles.header}> Event Card </Text>
                </View>
                <View>    
                    <Text style={styles.cardLine}> <Text style={styles.cardLineBold}>Name: </Text> {title} </Text>
                    <Text style={styles.cardLine}> <Text style={styles.cardLineBold}>Date: </Text> {when} </Text>
                    <Text style={styles.cardLine}> <Text style={styles.cardLineBold}>Place: </Text> {where} </Text>
                    <Text style={styles.cardLine}> <Text style={styles.cardLineBold}>Link: </Text> {url} </Text>
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={this.onPressDeleteEvent}
                        title="Delete Event"
                        color="red"
                        accessibilityLabel="Delete Event"
                    />
                </View>    
            </ScrollView>    
        )
    }
}

const styles = StyleSheet.create({
    eventContainer: {
        backgroundColor: "white",
        padding: 20,
        alignSelf: 'stretch'
    },
    header: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20
    },
    cardLine: {
        marginBottom: 20
    },
    cardLineBold: {
        fontWeight: 'bold'
    },
    button: {
        marginTop: 50
    }
})

export default Event
