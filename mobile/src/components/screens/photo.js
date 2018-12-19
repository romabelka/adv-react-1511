import React from 'react'
import Camera from '../common/camera'
import { inject } from 'mobx-react';

@inject('people')
export default class Photo extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.id
  })


  takePhoto = photo => {
    const { id } = this.props.navigation.state.params
    this.props.people.takePhoto(id, photo)
  }

  render() {
    return (
      <Camera takePhoto={this.takePhoto} />
    )
  }
}