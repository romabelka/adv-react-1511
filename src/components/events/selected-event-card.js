import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/events'
import { peopleByIdsSelector } from '../../ducks/people'
import { Motion, spring } from 'react-motion'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event, dropTarget, canDrop, isOver } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'

    return (
      <Motion
        defaultStyle={{ x: 1, y: 0.01 }}
        style={{ x: spring(2), y: spring(1, { stiffness: 20, damping: 1 }) }}
      >
        {(value) =>
          dropTarget(
            <div
              style={{
                width: 400,
                height: 150,
                border: `${value.x}px solid ${borderColor}`,
                background: `rgba(240,140,140,${value.y})`,
                boxSizing: 'border-box'
              }}
            >
              <h3>{event.title}</h3>
              <h4>{event.where}</h4>
              {this.getPeopleList()}
            </div>
          )
        }
      </Motion>
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
