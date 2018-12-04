import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { Motion, spring } from 'react-motion'
import { addPersonToEvent } from '../../ducks/events'
import { peopleByIdsSelector } from '../../ducks/people'

class SelectedEventCard extends Component {
  static propTypes = {}

  render() {
    const { event, dropTarget, canDrop, isOver } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'

    return (
      <Motion
        defaultStyle={{
          opacityVal: 0,
          rotate: 10,
          translateX: -15,
          translateY: -30
        }}
        style={{
          opacityVal: spring(1),
          translateX: spring(0),
          translateY: spring(0, { stiffness: 150, damping: 10 }),
          rotate: spring(0)
        }}
      >
        {({ opacityVal, translateX, translateY, rotate }) =>
          dropTarget(
            <div
              style={{
                width: 400,
                height: 150,
                border: `1px solid ${borderColor}`,
                boxSizing: 'border-box',
                opacity: opacityVal,
                transform: `translate3d(${translateX}px, ${translateY}px, 0) rotateZ(${rotate}deg)`
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
