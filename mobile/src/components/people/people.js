import React, { Component } from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import ConfirmModal from '../common/confirm-modal'

class People extends Component {
    static propTypes = {

    };

    state = {
        confirmModal: false
    }

    render() {
        const people = this.props.people
        return (
            <View style = {styles.container}>
                <View>
                    <Text>{people.lastName}</Text>
                    <Text>{people.firstName}</Text>
                    <Text>{people.email}</Text>
                </View>
                <View style = {styles.button}>
                    <Button
                        onPress={this.handleDelete}
                        title="Delete Person"
                        color="#F55"
                    />
                </View>
                <ConfirmModal visible = {this.state.confirmModal}
                              onConfirm = {this.confirmDelete}
                              onCancel = {this.cancelDelete}
                >
                    Are you sure you want to delete person?
                </ConfirmModal>
            </View>
        )
    }

    handleDelete = () => {
        this.setState({
            confirmModal: true
        })
    }

    confirmDelete = () => this.setState({ confirmModal: false })
    cancelDelete = () => this.setState({ confirmModal: false })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#F2F2F2',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 5
    },
    text: {
        width: '100%',
        height: 100,
        marginBottom: 20,
        textAlign: 'center'
    },
    image: {
        width: 200,
        height: 100
    },
    button: {
        width: '100%',
        height: 100,
        marginBottom: 30
    }
})

export default People