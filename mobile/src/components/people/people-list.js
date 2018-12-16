import React, { Component } from 'react'
import {Text, StyleSheet, FlatList, View} from 'react-native'

class PeopleList extends Component {
  static propTypes = {

  };

  render() {
    const { people } = this.props
    return (
      <FlatList
        data={people}
        renderItem={({item}) => (
          <View style = {styles.item}>
            <Text>{item.firstName} {item.lastName} {item.email}</Text>
          </View>
        )}
      />)
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginBottom: 10
  }
})

export default PeopleList