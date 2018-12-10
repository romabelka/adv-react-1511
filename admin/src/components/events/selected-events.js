import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { selectedEventsSelector } from '../../ducks/events'
import { TransitionMotion, spring } from 'react-motion'
import SelectedEventCard from './selected-event-card'

class SelectedEvents extends Component {
  render() {
    return (
      <TransitionMotion
        styles={this.styles}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {(interpolated) => (
          <List
            rowCount={interpolated.length}
            width={500}
            height={400}
            rowHeight={100}
            rowRenderer={this.rowRenderer(interpolated)}
          />
        )}
      </TransitionMotion>
    )
  }

  willEnter = () => ({
    opacity: 0
  })

  willLeave = () => ({
    opacity: spring(0, { stiffness: 20, damping: 40 })
  })

  get styles() {
    return this.props.events.map((event) => ({
      key: event.id,
      style: {
        opacity: spring(1, { stiffness: 50, damping: 40 })
      },
      data: event
    }))
  }

  rowRenderer = (interpolated) => ({ index, key, style }) => {
    const rowCtx = interpolated[index]
    return (
      <div key={rowCtx.key} style={{ ...style, ...rowCtx.style }}>
        <SelectedEventCard event={rowCtx.data} />
      </div>
    )
  }
}

export default connect((state) => ({
  events: selectedEventsSelector(state)
}))(SelectedEvents)
