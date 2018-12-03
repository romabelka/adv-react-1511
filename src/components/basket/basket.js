import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { deleteEvent } from '../../ducks/events'
import { deletePerson } from '../../ducks/people'

const getStyle = (isOver, canDrop) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  display: 'block',
  width: '300px',
  height: '60px',
  border: '1px solid green',
  backgroundColor: canDrop ? (isOver ? 'green' : 'yellow') : ''
})

export class Basket extends Component {
  render() {
    const { dropTarget, isOver, canDrop } = this.props
    return dropTarget(<div style={getStyle(isOver, canDrop)}>basket</div>)
  }
}

const spec = {
  drop({ deleteEvent, deletePerson }, monitor) {
    let [item, type] = [monitor.getItem(), monitor.getItemType()]
    switch (type) {
      case 'person':
        console.log('person', item)
        deletePerson(item.id)
        break
      case 'events-table-row':
        console.log('events-table-row', item)
        deleteEvent(item.eventId)
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
  { deleteEvent, deletePerson }
)(DropTarget(['person', 'events-table-row'], spec, collect)(Basket))
