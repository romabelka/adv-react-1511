import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './event-dnd-preview'

class EventTableRow extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.dragPreview(getEmptyImage())
  }

  render() {
    const { event, connectDragSource, isDragging, className } = this.props
    return connectDragSource(
      <div
        className={className}
        style={{ opacity: isDragging ? 0.2 : 1, display: 'flex' }}
        onClick={this.handleClick}
      >
        <div>{event.title}</div>
        <div>{event.when}</div>
        <div>{event.where}</div>
      </div>
    )
  }

  handleClick = () => {
    const { onClick, event } = this.props
    onClick(event.id)
  }
}

const spec = {
  beginDrag(props) {
    return {
      id: props.event.id,
      DragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  dragPreview: connect.dragPreview()
})

export default DragSource('event', spec, collect)(EventTableRow)
