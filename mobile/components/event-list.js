import React, { Component } from 'react'
import {View, ScrollView, Text, StyleSheet, SectionList} from 'react-native'
import {BoxShadow} from 'react-native-shadow'
import _  from 'lodash'

class EventList extends Component {
    static propTypes = {

    }

    getSections() {
        const { events } = this.props

        const groopedEvents = _.groupBy(events, (item) => {
            return item.title[0].toLowerCase()
        })

        const letters = Object.keys(groopedEvents).sort()
        return letters.map(item => ({title: item.toUpperCase(), data: groopedEvents[item]}))
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.sectionsContainer}>
                    <SectionList
                        renderItem={({item, index, section}) => (
                                    /*<BoxShadow setting={shadowOpt}>*/
                                        <View style={styles.sectionItem}>
                                            <Text key={index}>{item.title}</Text>
                                        </View>
                                    /*</BoxShadow>*/
                        )}
                        renderSectionHeader={({section: { data, title }}) => (
                            <View style={styles.sectionHeader}><Text style={{fontWeight: 'bold'}}>{title} count: {data.length}</Text></View>
                        )}
                        sections={this.getSections()}
                        keyExtractor={(item, index) => item + index}
                    />
                </View>
            </ScrollView>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "slategray",
        paddingTop: 50,
        paddingRight: 20,
        paddingLeft: 20
    },
    sectionsContainer: {
        backgroundColor: "white",
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        marginBottom: 80
    },
    sectionHeader: {
        marginTop: 20,
        marginBottom: 10
    },
    sectionItem: {
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'white',
        shadowColor:'red',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5
    }
})

const shadowOpt = {
	width:500,
	height:30,
	color:"#FFFF00",
	border:0,
	radius:0,
	opacity:0.2,
	x:0,
    y:0
}


export default EventList
