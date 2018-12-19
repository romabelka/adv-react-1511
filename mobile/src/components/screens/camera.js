import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions  } from 'expo'
import {observer, inject} from 'mobx-react'
import {observable, action} from 'mobx'


@inject('people')
@observer
class FrontCamera extends Component {
    static propTypes = {

    };

    static navigationOptions = ({ navigation }) => ({
      id: navigation.state.params.id
  })

    @observable permissionGranted = false
  
    @action setPermission = granted => this.permissionGranted = granted

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setPermission(status === 'granted')
    }

    snap = async () => {
      if (this.camera) {
        const options = {
          quality: 0.2
        }
        const photo = await this.camera.takePictureAsync(options)
        this.props.people.setPhoto(this.props.navigation.state.params.id, photo.uri)
        this.props.navigation.goBack(null)
      }
    }

    render() {
      if (this.permissionGranted === false) {
        return <Text>No access to camera</Text>
      } else {
        return (
          <View style={{ flex: 1 }} ref={view => {
              this._container = view;
            }}>
            <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type = {Camera.Constants.Type.back} >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.snap()
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 50, color: 'white' }}>
      
                    {' '}Save photo{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        )
      }
    }
}

export default FrontCamera
