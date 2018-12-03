import React, { Component } from 'react'
import { defaultTableRowRenderer } from 'react-virtualized'
import { DragSource } from 'react-dnd'

export class VirtualizedLazyRow extends Component {
  render() {
    const { connectDragSource, key, style, ...rest } = this.props
    const DefaultRowRenderer = defaultTableRowRenderer
    return connectDragSource(
      <div key={key} style={style}>
        <DefaultRowRenderer style={undefined} {...rest} />
      </div>
    )
  }
}

const spec = {
  beginDrag({ rowData: { id: eventId } }) {
    console.log('event-tables', eventId, this)
    return {
      eventId
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  dragPreview: connect.dragPreview()
})

export default DragSource('events-table-row', spec, collect)(VirtualizedLazyRow)
