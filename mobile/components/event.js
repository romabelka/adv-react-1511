import React, { Component } from 'react'
import { Text, StyleSheet, Platform, View, Alert, Button} from 'react-native'
import { WebBrowser } from 'expo';

class Event extends Component {
    static propTypes = {

    };

    render() {
       
        return (
            <View style={styles.view}>
                <Text style={styles.title}>{this.props.entity.title}</Text>
                <View style={styles.detailview}>
                    <Text style={styles.content}>On: {this.props.entity.when}</Text>
                    <Text style={styles.content}>At: {this.props.entity.where}</Text>
                    <Text style={styles.content}>URL: {this.props.entity.url}</Text>
                    <View style={styles.buttonsBox}>
                        <Button style={styles.button}
                                title='View'
                                onPress={() => {
                                    WebBrowser.openBrowserAsync(this.props.entity.url);
                                }}
                            />
                        <Button style={styles.button}
                            title='Delete'
                            onPress={() => {
                                Alert.alert(
                                    'Delete event',
                                    'Are you sure to delete this event?',
                                    [
                                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                    ],
                                    { cancelable: false }
                                )
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 8,
        marginTop: 2,
    }, 

    title: {
        marginLeft: 2,
        fontWeight: 'bold',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
            }, 
            android: {
                elevation: 2,
                backgroundColor: '#bbeeff'
            }
        })
    },

    detailview: {
        backgroundColor: '#99ccff',
        marginBottom: 2,
        marginTop: 2,
    }, 

    content: {
        marginLeft: 2,
        marginRight: 2,
    },

    buttonsBox: {
        flexDirection: 'row',
    },

    button: {
        marginLeft: 50,
        marginRight: 50,
    }
})

export default Event