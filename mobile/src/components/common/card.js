import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'

class Card extends Component {
    static propTypes = {

    };

    render() {
        return (
            <View style = {styles.container}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        margin: 10,
        elevation: 5,
        backgroundColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 3, height: 3
        },
        shadowOpacity: 0.7
    }
})

export default Card