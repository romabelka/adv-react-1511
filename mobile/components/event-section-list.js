import React, {Component} from 'react'
import { SectionList, View, Text } from 'react-native'
import EventSection from './event-section'

export default class EventsSectionList extends Component {

  /**
   *  по идее нужно вынести в utils/normalizeEvents...
   *  но может жить или в инстансе класса или где-то рядом с ним. так как не факт
   *  что еще пригодится...
   */
  get sections() {
    const { events } = this.props
    const sectionsByFirstLetter = Object.entries(events).reduce( (acc, [id, value]) => {
      const firstLetter = value.title && value.title[0].toUpperCase() || ''
      acc[firstLetter]  = acc[firstLetter] || { data: []}

      acc[firstLetter].data.push({
        id,
        month: value.month,
        where: value.where,
        submissionDeadline: value.submissionDeadline,
        title: value.title,
        url: value.url,
        when: value.when,
      })
      return acc
    }, {})


    const sections = Object.keys(sectionsByFirstLetter).sort().map( k => {
      return {
        title: k,
        data: sectionsByFirstLetter[k].data.sort( (i, j) => (i.title > j.title ? 1 : -1))
      }
    })

    console.log('sections ', sections)

    return sections
  }

  renderSectionHeader = ({section: {title = 't', data = []}}) => {
    const style = {
      color: 'dimgrey',
      fontWeight: 'bold',
      fontSize: 20
    }
    return <Text style={style}>{title} (total events: {data.length})</Text>
  }

  renderItem = ({item}) => {
    return <EventSection item={item} />
  }

  render() {
    return <SectionList
      sections={this.sections}
      renderItem={this.renderItem}
      renderSectionHeader={this.renderSectionHeader}
      keyExtractor={ (item) => item.id}
    />
  }
}