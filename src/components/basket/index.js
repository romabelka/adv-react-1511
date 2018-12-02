import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deleteEvent } from '../../ducks/events'
import { deletePerson } from '../../ducks/people'

class Basket extends Component {
  static propTypes = {}

  render() {
    const { dropTarget, canDrop, isOver } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'

    return dropTarget(
      <div
        style={{
          width: 80,
          height: 40,
          border: `1px solid ${borderColor}`,
          boxSizing: 'border-box'
        }}
      >
        <h4>Basket</h4>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const { deletePerson, deleteEvent } = props
    const itemType = monitor.getItemType()
    const itemId = monitor.getItem()

    switch (itemType) {
      case 'person':
        deletePerson(itemId)
        break
      case 'event':
        deleteEvent(itemId)
        break
    }
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

export default connect(
  null,
  { deletePerson, deleteEvent }
)(DropTarget(['person', 'event'], spec, collect)(Basket))
