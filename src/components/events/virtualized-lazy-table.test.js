import React from 'react'
import { mount } from 'enzyme'
import events from '../../mocks/conferences'

import { EventLazyTable } from './virtualized-lazy-table'

const eventList = events.map((event) => ({ ...event, uid: Math.random() }))

describe('EventLazyTable', () => {
  it('should render few rows', () => {
    const table = mount(
      <EventLazyTable events={eventList.slice(0, 5)} fetchLazy={() => {}} />
    )

    expect(table.find('.test__event_table_row').length).toBe(6)
  })

  it('should render no more then 9 rows', () => {
    const table = mount(
      <EventLazyTable events={eventList} fetchLazy={() => {}} />
    )

    expect(table.find('.test__event_table_row').length).toBe(9)
  })
})
