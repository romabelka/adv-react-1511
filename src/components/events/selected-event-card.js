import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event, dropTarget, canDrop, isOver } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'

    return dropTarget(
      <div
        style={{
          width: 400,
          height: 150,
          border: `1px solid ${borderColor}`,
          boxSizing: 'border-box'
        }}
      >
        <h3>{event.title}</h3>
        <h4>{event.where}</h4>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    console.log('---', 'event: ', props.event.id, 'person: ', monitor.getItem())
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

export default DropTarget(['person'], spec, collect)(SelectedEventCard)
