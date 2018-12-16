import { observable, action } from 'mobx'

export default class AuthStore {
  @observable navRef = null

  @action setNavRef = navRef => this.navRef = navRef
}