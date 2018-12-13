import React from 'react'
import {configure} from 'mobx'
import AppNavigator from './src/components/navigator'

configure({
    enforceActions: 'always'
})

export default class App extends React.Component {
  render() {
    return <AppNavigator />
  }
}
