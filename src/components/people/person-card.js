import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './person-dnd-preview'

class PersonCard extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.dragPreview(getEmptyImage())
  }

  render() {
    const { person, connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.2 : 1 }}>
        <h3>{person.firstName}</h3>
        <h5>{person.email}</h5>
      </div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      id: props.person.id,
      DragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  dragPreview: connect.dragPreview()
})

export default DragSource('person', spec, collect)(PersonCard)
