import React, { Component } from 'react'
import {View, Text} from 'react-native'

class HelloWorldAndroid extends Component {
    static propTypes = {

    };

    state = {
        count: 0
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(({ count }) => ({ count: count + 1 }))
        }, 500)
    }

    render() {
        return (
            <View>
                <Text>Hello World, Android {this.state.count}!!!!</Text>
            </View>
        )
    }
}

export default HelloWorldAndroid