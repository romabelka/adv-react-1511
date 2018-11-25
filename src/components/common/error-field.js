import React, { Component } from 'react'

class ErrorField extends Component {
  static propTypes = {}

  render() {
    const {
      input,
      meta: { error, touched },
      label,
      ...rest
    } = this.props
    const errorText = error && touched && (
      <h4 style={{ color: 'red' }}>{error}</h4>
    )
    return (
      <div>
        {label}
        <input {...input} {...rest} />
        {errorText}
      </div>
    )
  }
}

export default ErrorField
