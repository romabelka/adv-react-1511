import React, { Component } from 'react'
import { connect } from 'react-redux'

import { DropTarget } from 'react-dnd'
import { deletePerson } from '../../ducks/people'
import { deleteEvent } from '../../ducks/events'

class TrashBin extends Component {
  static propTypes = {}
  render() {
    const { connectDropTarget, isOver } = this.props
    const style = {
      border: `1px solid ${isOver ? 'red' : 'black'}`,
      width: 50,
      height: 50
    }
    return connectDropTarget(
      <div style={style}>
        <img alt="BIN" src="../../../assets/bin.png" />
      </div>
    )
  }
}
const spec = {
  drop(props, monitor) {
    const item = monitor.getItem()
    const itemType = monitor.getItemType()
    if (itemType === 'event') props.deleteEvent(item.id)
    if (itemType === 'person') props.deletePerson(item.id)
  }
}
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

export default connect(
  null,
  { deleteEvent, deletePerson }
)(DropTarget(['event', 'person'], spec, collect)(TrashBin))
