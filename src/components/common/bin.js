import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deleteEvent } from '../../ducks/events'
import { deletePerson } from '../../ducks/people'

function Bin({ connectDropTarget, isOver }) {
  const style = {
    background: `${isOver ? 'blue' : 'gray'}`,
    width: 50,
    height: 50,
    position: 'fixed',
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return connectDropTarget(<div style={style}>Bin</div>)
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
  {
    deleteEvent,
    deletePerson
  }
)(DropTarget(['event', 'person'], spec, collect)(Bin))
