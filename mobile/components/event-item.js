import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, Modal, Card } from 'react-native'


class EventItem extends Component {
  state = {
    open: false,
  };

  handleModal = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { id, where, title, when, url } = this.props.event
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.card_content}>
            <Text style={styles.item}>Title - {title} </Text>
            <Text style={styles.item}>Where - {where} </Text>
            <Text style={styles.item}>When - {when} </Text>
            <Text style={styles.item}>Url - {url} </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress={this.handleModal}
              title="Удалить"
              color="#f44336"
            />
          </View>
        </View>
        <View>
          <Modal
            animationType="fade"
            visible={this.state.open}
            presentationStyle="pageSheet"
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={styles.modal}>
              <View style={styles.modal_content}>
                <Text>Delete this item</Text>
              </View>
              <View style={styles.modal_footer}>
                <View style={styles.modal_btn}>
                  <Button
                    onPress={this.handleModal}
                    title="Ok"
                    color="#f44336"
                  />
                </View>
                <View style={styles.modal_btn}>
                  <Button
                    onPress={this.handleModal}
                    title="Cancle"
                    color="#ccc000"
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>

    )
  }
}

export default EventItem

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: 'steelblue',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  card_content: {
    flex: 2, alignContent: 'space-around'
  },
  modal: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  modal_content: {
    flex: 2,
    padding: 20,
  },
  modal_footer: {
    flex: 1, width: ' 100%', flexDirection: 'row', justifyContent: "space-around"
  },
  modal_btn: {
    width: 200
  },
  item: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  }
})
