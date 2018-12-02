import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deletePerson } from '../../ducks/people'
import { deleteEvent } from '../../ducks/events'

class Trash extends Component {
  static propTypes = {}

  render() {
    const { dropTarget, canDrop, isOver } = this.props
    const backgroundColor = canDrop
      ? isOver
        ? 'green'
        : 'orange'
      : 'transparent'
    return dropTarget(
      <div
        style={{
          backgroundColor: backgroundColor,
          display: 'inline-block'
        }}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGsSURBVGhD7dq/K0VxGMfxm19FoSQpm4lB2FHKRBJlMtiUxWJAFpuN7Fb/gQmLVVlMFoVsiuRHIT/eT91vPenp3HM7v255PvVa7nPP934/0b3nnnNLKWUGJ3jBTwyfOMcKGlAT2YK12biO0IhCM4pvWBusxhoKzT70hr5wh6sI13iHPu4SheYCekNjiJMOPEAf245M0oZJzEe4h97MAqznWeSvo49dhvU8MYseVJ1W/H2hor1iGLHSjSXswFqsaIeQ/Q0hMiOwFqg164iMF8lZxSKdsN41ak0f/memcVwDNpAo8iFl/Y/m7QCJ4kVS5kVCKhV5gpzFisfyY8EHwky8Qc+foefyFUDPtcyLDCBETsP1TM6LdORDTM+noHMDPde8SIgXgRcxeJEQLwIvYvAiIV4EXsTgRUK8CLyIwYuEeBF4EYMXCalUZBXhCvli+bFAfhCgr6DLZvR8G3r+936klnmRvHiRkDlYC+dtF4kid7Dk0qe1eJ7kfn/i7MFaPC9nqEPiNOMU1otk7Ra9SC1N2ETUW2Sa5Mq9/GCnC5mkHv0Yx0RGBtGCKlIq/QI+C+St9GvhtAAAAABJRU5ErkJggg==" />
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const item = monitor.getItem()
    const itemType = monitor.getItemType()
    if (itemType === 'person') props.deletePerson(item.id)
    if (itemType === 'event') props.deleteEvent(item.id)
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

export default connect(
  null,
  { deletePerson, deleteEvent }
)(DropTarget(['person', 'event'], spec, collect)(Trash))
