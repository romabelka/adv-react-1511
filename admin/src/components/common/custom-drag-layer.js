import React, { Component } from 'react'
import { DragLayer } from 'react-dnd'

const layerStyle = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 9999,
  pointerEvents: 'none'
}

class CustomDragLayer extends Component {
  static propTypes = {}

  getPreview() {
    const { item, offset } = this.props
    if (!item || !item.DragPreview || !offset) return null

    const style = {
      transform: `translate(${offset.x}px,${offset.y}px)`
    }

    return (
      <div style={style}>
        <item.DragPreview {...item} />
      </div>
    )
  }

  render() {
    return <div style={layerStyle}>{this.getPreview()}</div>
  }
}

const collect = (monitor) => ({
  item: monitor.getItem(),
  offset: monitor.getSourceClientOffset()
})

export default DragLayer(collect)(CustomDragLayer)
