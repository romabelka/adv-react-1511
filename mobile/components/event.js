import React, { Component } from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'

class Event extends Component {
    static propTypes = {

    }

    render() {
        const { title, url, when, where } = this.props.event 
        return (
            <ScrollView style={styles.eventContainer}>
                <View>
                    <Text style={styles.header}> Event Card </Text>
                </View>    
                <Text style={styles.cardLine}> <Text style={styles.cardLineBold}>Name: </Text> {title} </Text>
                <Text style={styles.cardLine}> <Text style={styles.cardLineBold}>Date: </Text> {when} </Text>
                <Text style={styles.cardLine}> <Text style={styles.cardLineBold}>Place: </Text> {where} </Text>
                <Text style={styles.cardLine}> <Text style={styles.cardLineBold}>Link: </Text> {url} </Text>
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
    }
})

export default Event
