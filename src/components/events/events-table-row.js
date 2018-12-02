import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import DragPreview from './events-dnd-preview'
import getEmptyImage from 'react-dnd-html5-backend/lib/getEmptyImage'

class EventTableRow extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.dragPreview(getEmptyImage())
  }

  render() {
    const { event, connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div
        style={{ opacity: isDragging ? 0.2 : 1 }}
        className="test--events-table__row"
      >
        <span>{event.title}</span>
        <span>{event.when}</span>
        <span>{event.where}</span>
      </div>
    )
  }

  handleClick = () => {
    const { onClick, event } = this.props
    onClick(event.id)
  }
}

const specDrag = {
  beginDrag(props) {
    return {
      id: props.event.id,
      DragPreview
    }
  }
}

const collectDrag = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  dragPreview: connect.dragPreview()
})

export default DragSource('event', specDrag, collectDrag)(EventTableRow)
