import React, {Component} from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  view: {
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 0.5,
        shadowOpacity: 1,
        shadowColor: 'black',
        paddingHorizontal: 30,
        paddingVertical: 10
      },
      android: {
        padding: 10
      }
    }),
  },
  text: {
    fontSize: 13,
    color: 'grey',
  }
})

export default class EventSection extends Component {

  render() {
    const {index, item: {when, title} } = this.props
    return <View style={styles.view}>
      <Text key={index} style={styles.text}>{title} - {when}</Text>
    </View>
  }
}