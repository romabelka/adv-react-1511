import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deleteEvent } from '../../ducks/events'
import { deletePerson } from '../../ducks/people'

class Trash extends Component {
  static propTypes = {}

  render() {
    const { connectDropTarget, isOver } = this.props
    const style = {
      border: `1px solid ${isOver ? 'green' : 'black'}`,
      width: 100,
      height: 100,
      position: 'fixed',
      top: 0,
      right: 0
    }
    return connectDropTarget(<div style={style}>Trash</div>)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

const spec = {
  drop({ deleteEvent, deletePerson }, monitor) {
    const itemACMapping = {
      event: deleteEvent,
      person: deletePerson
    }

    const item = monitor.getItem()
    const itemType = monitor.getItemType()

    itemACMapping[itemType](item.id)
  }
}

export default connect(
  null,
  { deleteEvent, deletePerson }
)(DropTarget(['event', 'person'], spec, collect)(Trash))
