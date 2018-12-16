import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {inject, observer} from 'mobx-react'
import withRouterProvider from '../decorators/with-router-provider'
import Loader from '../common/loader'
import PeopleList from '../people/people-list'
import stores from '../../stores'


@inject('people')
@observer
class PeopleScreen extends Component {
    static propTypes = {

    }

    componentWillMount(){
        const { loaded } = this.props.people
        if(!loaded) stores.people.getPeople()
    }

    render() {
        const { people, loading } = this.props.people
        const peopleList = stores.people.selectPeopleAsArray() 

        if(loading) return <Loader />
        return <PeopleList people={peopleList}/>
    }
}

const styles = StyleSheet.create({
})

export default withRouterProvider(PeopleScreen)