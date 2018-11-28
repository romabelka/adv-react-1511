import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Column } from 'react-virtualized'
import {
  eventListSelector,
  loadedSelector,
  loadingSelector,
  toggleSelectEvent,
  fetchAllEvents,
  chunkLoading,
  CHUNK_LIMIT
} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.chunkLoading({ startIndex: 0, stopIndex: CHUNK_LIMIT })
    // this.props.fetchAllEvents()
  }

  render() {
    if (this.props.loading) {
      return <Loader />
    }
    /**
     * Хочу кое-что выяснить для своего понимания проблемы.
     *
     * внутрь Table  в качестве свойства onRowClick мы передаем анонимную функцию.
     * Разве это не будет заставлять перерисовываться children у Table каждый раз при прорисовке самого Table просто потому,
     * что каждый раз будет создаваться новая анонимная функция и передаваться как props в children компнонент?
     * Разные анонимные функции (текущая и новая) в теории не должны пройти shallowCompare и React перерисует весь компонент, хотя по сути props теже самые
     *
     */
    return (
      <Table
        ref={this.props.registerChild}
        rowCount={this.props.events.length}
        width={500}
        height={300}
        rowHeight={50}
        headerHeight={50}
        rowGetter={this.rowGetter}
        onRowClick={({ rowData }) => this.props.selectEvent(rowData.id)}
        onRowsRendered={this.props.onRowsRendered}
      >
        <Column dataKey="title" width={200} label="Title" />
        <Column dataKey="where" width={200} label="Place" />
        <Column dataKey="when" width={200} label="When" />
      </Table>
    )
  }

  rowGetter = ({ index }) => this.props.events[index]
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { selectEvent: toggleSelectEvent, fetchAllEvents, chunkLoading }
)(EventsTableVirtualized)
//export default connect(
//    (state) => ({
//        events: eventListSelector(state),
//        loading: loadingSelector(state),
//        loaded: loadedSelector(state)
//    }),
//    { fetchAllEvents, chunkLoading, selectEvent: toggleSelectEvent }
//)(EventsTableVirtualized)
