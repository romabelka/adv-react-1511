import React, { Component } from 'react'
import {View, Text, StyleSheet, Alert, Button, Linking, TouchableHighlight, Image, ScrollView} from 'react-native'
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'

class EventList extends Component {
  static propTypes = {

  };

  onDelete(title) {
    Alert.alert(
      'Delete item',
      `Do you really want to delete ${title} from your schedule?`,
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'Ok', onPress: () => {}}
      ]
    )
  }

  onAdd(title) {
    Alert.alert(
      'Add item',
      `Do you really want to add ${title} in your schedule?`,
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'Ok', onPress: () => {}}
      ]
    )
  }


  render() {
    const { event } = this.props;
    return (
      <View style={styles.container}>
        <View  style={styles.topContainer}>
          <Text style={styles.title}>{event.title}</Text>
        </View>
        <View  style={styles.middleContainer}>
          <Image style={styles.image} source = {require('../assets/frontendCon.png')}  />
          <View style={styles.row}>
            <Text style={styles.subTitle}>When:</Text>
            <Text style={styles.rowData}>{event.when}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.subTitle}>Where:</Text>
            <Text style={styles.rowData}>{event.where}</Text>
            </View>
          <View style={styles.row}>
            <Text style={styles.subTitle}>Submission deadline:</Text>
            <Text style={styles.rowData}>{event.submissionDeadline ? event.submissionDeadline : 'no information'}</Text>
            </View>
          <View style={styles.row}>
            <Text style={styles.subTitle}>More information:</Text>
            <TouchableHighlight onPress={() => Linking.openURL(event.url)}><Text style={styles.link}>here</Text></TouchableHighlight>
          </View>
        </View>
        <View  style={styles.bottomContainer}>
          <TouchableHighlight style={[styles.button, styles.buttonSusseccful]} onPress={() => this.onAdd(event.title)}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.button, styles.buttonDanger]}  onPress={() => this.onDelete(event.title)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor : '#64B5F6',
    padding: 5,
  },
  title: {
    fontSize : 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  middleContainer: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: "#ffffff",
    width: '100%',
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5
  },
  rowData: {
    fontSize: 16,
    padding: 5
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    color: '#64B5F6',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor : '#64B5F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSusseccful: {
    backgroundColor: '#84bb2a',
  },
  buttonDanger: {
    backgroundColor: '#ff4f5e',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
});
export default EventList