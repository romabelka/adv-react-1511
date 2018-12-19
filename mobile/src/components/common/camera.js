import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

@observer
export default class CameraExample extends React.Component {

  @observable hasCameraPermission = null

  @action setCameraPermission = granted => this.hasCameraPermission = granted

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setCameraPermission(status === 'granted')
  }

  takePhoto = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
      }
      let photo = await this.camera.takePictureAsync(options);
      const { uri } = photo
      this.props.takePhoto(uri)
    }
  }

  setting = {
    type: Camera.Constants.Type.front,
    autofocus: Camera.Constants.AutoFocus.on,
  }

  render() {

    if (this.hasCameraPermission === null) {
      return <View />;
    } else if (this.hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} ref={ref => { this.camera = ref; }} {...this.setting}>

            <View
              style={{
                flex: 2,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
            </View>
            <TouchableOpacity
              style={{
                flex: 0,
                height: 100,
                backgroundColor: '#cccddd29',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={this.takePhoto}>
              <Ionicons name="md-camera" size={64} color="white" />
            </TouchableOpacity>

          </Camera>
        </View>
      );
    }
  }
}