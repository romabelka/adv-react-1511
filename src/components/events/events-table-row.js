import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { defaultTableRowRenderer } from 'react-virtualized'

class EventTableRow extends Component {
  static propTypes = {}

  render() {
    const { connectDragSource, ...otherProps } = this.props
    return connectDragSource(defaultTableRowRenderer(otherProps))
  }

  handleClick = () => {
    const { onClick, event } = this.props
    onClick(event.id)
  }
}

const spec = {
  beginDrag(props) {
    return {
      id: props.rowData.id
    }
  }
}

const collect = (connect) => ({
  connectDragSource: connect.dragSource()
})

export default DragSource('event', spec, collect)(EventTableRow)
