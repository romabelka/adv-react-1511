import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deletePerson } from '../../ducks/people'
import { deleteEvent } from '../../ducks/events'
class Trash extends Component {
  static propTypes = {}

  render() {
    const { dropTarget, isOver } = this.props

    return dropTarget(
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: isOver ? 'lightgreen' : 'lightgrey'
        }}
      >
        {' '}
        Move person or event here to delete it{' '}
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const type = monitor.getItemType()
    const item = monitor.getItem()
    switch (type) {
      case 'person':
        props.deletePerson(item.id)
        return
      case 'event':
        props.deleteEvent(item.id)
    }
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

export default connect(
  null,
  {
    deletePerson,
    deleteEvent
  }
)(DropTarget(['person', 'event'], spec, collect)(Trash))
