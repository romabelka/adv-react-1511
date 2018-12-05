import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { selectedEventsSelector } from '../../ducks/events'
import SelectedEventCard from './selected-event-card'
import { TransitionMotion, spring, presets } from 'react-motion'

class SelectedEvents extends Component {
  static propTypes = {}

  componentDidUpdate() {
    this.list.forceUpdateGrid()
  }

  willLeave() {
    return {
      opacity: spring(0, { stiffness: 200, damping: 40 }),
      transparency: spring(0, { stiffness: 100, damping: 40 })
    }
  }

  willEnter() {
    return {
      opacity: 0,
      transparency: 0
    }
  }

  render() {
    const { events } = this.props
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        willEnter={this.willEnter}
        styles={
          events &&
          events.map((event) => ({
            key: event.id,
            style: {
              opacity: spring(1, { stiffness: 100, damping: 15 }),
              transparency: spring(1, {
                stiffness: presets.gentle.stiffness,
                damping: presets.gentle.damping
              })
            },
            data: event
          }))
        }
      >
        {(interpolatedStyles) => (
          <List
            ref={this.setListRef}
            width={600}
            height={300}
            rowCount={interpolatedStyles.length}
            rowHeight={150}
            rowRenderer={this.rowRenderer(interpolatedStyles)}
          />
        )}
      </TransitionMotion>
    )
  }

  setListRef = (ref) => (this.list = ref)

  rowRenderer = (interpolatedStyles) => ({ index, key, style }) => {
    const event = interpolatedStyles[index]
    return (
      <div
        key={event.key}
        style={{
          ...style,
          opacity: event.style.opacity,
          backgroundColor: `rgba(${165 / event.style.transparency}, 174, ${238 /
            event.style.transparency}, ${event.style.transparency})`
        }}
      >
        <SelectedEventCard event={event.data} />
      </div>
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
