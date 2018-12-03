import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/events'
import { peopleByIdsSelector } from '../../ducks/people'

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
        {this.getPeopleList()}
      </div>
    )
  }

  getPeopleList() {
    return <h4>{this.props.people.map((person) => person.email).join('; ')}</h4>
  }
}

const spec = {
  drop(props, monitor) {
    props.addPersonToEvent(monitor.getItem().id, props.event.id)
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

export default connect(
  (state, { event }) => ({
    people: peopleByIdsSelector(state, event.peopleIds)
  }),
  { addPersonToEvent }
)(DropTarget(['person'], spec, collect)(SelectedEventCard))
