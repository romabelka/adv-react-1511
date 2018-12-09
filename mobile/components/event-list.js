import React, { Component } from 'react'
import {ScrollView, Text, StyleSheet, SectionList, Platform} from 'react-native'

class EventList extends Component {
    static propTypes = {

    };

  state = {
    sections: [],
    sectionListTitleList: []
  }

    GetSectionListItem = (item) =>{
      this.props.navigate('Event', item)
    }

    componentDidMount() {
        const sections = [];

        const removeDuplicates = (arr) => {
          let s = new Set(arr);
          let it = s.values();
          return Array.from(it);
        };

        const sortingByLetters = this.props.events
          .map(event => event.title.charAt(0))
          .sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);

        removeDuplicates(sortingByLetters).map(item => sections.push({title: item, data: []}))

        sections.map(item => {
            this.props.events.map(event => {
                if (event.title.charAt(0) === item.title) {
                  item.data.push(event)
                }
            })
        })

        this.setState({sections});
    }

    render() {
      return (
          <ScrollView>
              <SectionList
                sections={this.state.sections}
                renderSectionHeader={ ({section}) => <Text style={styles.SectionHeader}> { section.title } </Text> }
                renderItem={ ({item}) =>
                    <Text style={styles.SectionListItemS} onPress={this.GetSectionListItem.bind(this, item)}>
                      {item.title} ({item.when})
                    </Text>
                }
                keyExtractor={ (item, index) => index }
              />
          </ScrollView>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5"
  },
  SectionHeader:{
    backgroundColor : '#64B5F6',
    fontSize : 20,
    padding: 5,
    color: '#fff',
    fontWeight: 'bold'
  },
  SectionListItemS: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,

    // its for IOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,

    // its for android
    elevation: 5,
    position: 'relative',
  }
});
export default EventList