import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

class PersonCard extends Component {
  static propTypes = {}

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
      id: props.person.id
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default DragSource('person', spec, collect)(PersonCard)
