import { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './event-dnd-preview'
import { connect } from 'react-redux'
import { deleteEvent } from '../../ducks/events'
import { defaultTableRowRenderer } from 'react-virtualized'

class EventTableRow extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.connectPreview(getEmptyImage())
  }

  render() {
    const { connectDragSource, ...rest } = this.props
    return connectDragSource(defaultTableRowRenderer(rest))
  }

  handleDelete = () => {
    const { onClick, event } = this.props
    onClick(event.id)
  }
}

const spec = {
  beginDrag(props) {
    return {
      id: props.rowData.id,
      DragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectPreview: connect.dragPreview()
})

export default connect(
  null,
  { deleteEvent }
)(DragSource('event', spec, collect)(EventTableRow))
