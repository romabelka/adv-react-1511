import React, { Component } from 'react'
import {View, Text} from 'react-native'

class HelloWorldIos extends Component {
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
                <Text>Hello World, Ios {this.state.count}!!!!</Text>
            </View>
        )
    }
}

export default HelloWorldIos