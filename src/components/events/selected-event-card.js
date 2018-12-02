import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent, cleanEvent } from '../../ducks/events'

class SelectedEventCard extends Component {
  static propTypes = {}

  cleanEvent = () => {
    const {
      event: { id },
      cleanEvent
    } = this.props
    cleanEvent(id)
  }

  render() {
    const { event, dropTarget, canDrop, isOver } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'

    const { peopleIds: people } = event
    const isPeopleAdded = people.length

    return dropTarget(
      <div
        style={{
          width: 400,
          height: 250,
          border: `1px solid ${borderColor}`,
          boxSizing: 'border-box'
        }}
      >
        <h3>{event.title}</h3>
        <h4>{event.where}</h4>
        {isPeopleAdded ? (
          <button onClick={this.cleanEvent}>To clean Event</button>
        ) : (
          ''
        )}
        <ul>
          {people.map((person) => (
            <li key={person}>{person}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    props.addPersonToEvent(monitor.getItem(), props.event.id)
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

export default connect(
  null,
  { addPersonToEvent, cleanEvent }
)(DropTarget(['person'], spec, collect)(SelectedEventCard))
