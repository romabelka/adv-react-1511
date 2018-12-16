import {NavigationActions} from 'react-navigation'
class NavigatorStore {
  ref = null
  follow = (route, params) => {
    action = NavigationActions.navigate({ routeName: route, params: params})
    this.ref.dispatch(action)
  }
}
export default NavigatorStore 