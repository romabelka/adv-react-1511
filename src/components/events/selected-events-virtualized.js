import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from 'react-virtualized'
import 'react-virtualized/styles.css'

const cache = new CellMeasurerCache({
  defaultHeight: 500,
  defaultWidth: 800,
  fixedWidth: true
})

const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 2,
  columnWidth: 400,
  spacer: 10
})

class SelectedEvents extends Component {
  static propTypes = {}

  cellRenderer = ({ index, key, parent, style }) => {
    const { events } = this.props
    const event = events[index]

    if (!event) return

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <SelectedEventCard event={event} />
        </div>
      </CellMeasurer>
    )
  }

  render() {
    const { events } = this.props
    return (
      <Masonry
        cellCount={events.length}
        cellMeasurerCache={cache}
        cellPositioner={cellPositioner}
        cellRenderer={this.cellRenderer}
        height={300}
        width={1000}
      />
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
