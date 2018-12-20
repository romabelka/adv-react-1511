import React, {Component} from 'react'
import Photo from '../common/photo'
import {inject} from 'mobx-react'

@inject('people')
class PersonPhoto extends Component {
    static propTypes = {};

    render() {
        return <Photo getPhoto={this.getPhoto} />
    }

    getPhoto = ({uri}) => {
        const {id, people} = this.props

        people.takePhoto(id, uri)
    }
}

export default PersonPhoto