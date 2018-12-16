import { observable, action, computed } from 'mobx'

export default class NavigationStore {
    @observable screen = {
        name: '',
        params: {}
    }

    @action setScreen = (screen, params ) => this.screen = {
        screen,
        params
    }
}