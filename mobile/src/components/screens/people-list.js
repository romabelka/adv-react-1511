import React, { Component } from 'react'
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native'
import PeopleList from '../people/people-list'
import {observer, inject} from 'mobx-react'

@inject('people')
@observer
class PeopleListScreen extends Component {
  static propTypes = {

  };


  componentDidMount () {
    this.props.people.loadPeopleList()
  }

  render() {
    return (
      <View>
        {this.props.people.loading && <ActivityIndicator  size="large" color="#0000ff"/>}
        {!this.props.people.loading &&<PeopleList people={this.props.people.peopleList} />}
      </View>
    )
  }

}

const styles = StyleSheet.create({
})

export default PeopleListScreen