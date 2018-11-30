import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/events'
import { peopleSelector } from '../../ducks/people'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event, dropTarget, canDrop, isOver, people } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'

    const eventsElement = people && (
      <span style={{ color: 'tomato' }}>
        {people.map((item) => item.email).join(', ')}
      </span>
    )

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
        {eventsElement}
      </div>
    )
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
  (state, props) => ({
    people: peopleSelector(state).filter((people) =>
      props.event.peopleIds.includes(people.id)
    )
  }),
  { addPersonToEvent }
)(DropTarget(['person'], spec, collect)(SelectedEventCard))
