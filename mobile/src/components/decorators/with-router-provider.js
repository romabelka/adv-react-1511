import React, { Component } from 'react'
import stores from '../../stores'

const withRouterProvider = OriginalComponent => {
    return ( 
        class WithRouterProviderDecorator extends Component {

            setScreen = (screen, params) => {
                stores.router.setScreen(screen, params)
                this.props.navigation.navigate(screen, params)
            }

            render() {
                return (
                    <OriginalComponent
                        {...this.props}
                        setScreen={this.setScreen}
                    />

                )
            }
        }
    )
}

export default withRouterProvider