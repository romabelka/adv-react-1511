import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './person-dnd-preview'
import { connect } from 'react-redux'
import { deletePerson } from '../../ducks/people'

class PersonCard extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.dragPreview(getEmptyImage())
  }

  render() {
    const { person, connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.2 : 1 }}>
        <table>
          <tbody>
            <tr>
              <td>{person.firstName}</td>
              <td>{person.email}</td>
              <td>
                <span onClick={this.handleDelete}>Delete</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  handleDelete = () => {
    const { person } = this.props
    this.props.deletePerson(person.id)
  }
}

const spec = {
  beginDrag(props) {
    return {
      id: props.person.id,
      DragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  dragPreview: connect.dragPreview()
})

export default connect(
  null,
  { deletePerson }
)(DragSource('person', spec, collect)(PersonCard))
