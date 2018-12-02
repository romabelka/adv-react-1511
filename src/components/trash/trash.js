import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/events'

class Trash extends Component {
  static propTypes = {}

  render() {
    const { dropTarget, canDrop, isOver } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'

    return dropTarget(
      <div
        style={{
          width: 400,
          height: 150,
          border: `1px solid ${borderColor}`,
          boxSizing: 'border-box',
          float: 'right',
          lineHeight: 150
        }}
      >
        Drop here!
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    //@TODO here should be delete via sagas workflow
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

export default connect(
  null,
  { addPersonToEvent }
)(DropTarget(['person', 'event'], spec, collect)(Trash))
