import React from 'react'
import { render } from 'enzyme'
import EventsTableVirtualized from './events-table-virtualized'

describe('Events table virtualized', function() {
  it('should render few events', () => {
    const rowCount = 10
    const container = render(
      <EventsTableVirtualized
        rowCount={rowCount}
        rowGetter={() => {
          return {}
        }}
      />
    )

    // + 1, because header is event-row too
    expect(container.find('.event-row').length).toEqual(rowCount + 1)
  })

  it('should render max 15 rows with header', () => {
    const rowCount = 100
    const container = render(
      <EventsTableVirtualized
        rowCount={rowCount}
        rowGetter={() => {
          return {}
        }}
      />
    )

    // + 1, because header is event-row too
    expect(container.find('.event-row').length).toEqual(15 + 1)
  })
})
