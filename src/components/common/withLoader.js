import React, { Fragment } from 'react'

export default ({ isLoading, children }) => {
  if (isLoading) {
    return <Fragment>loading data...</Fragment>
  }

  return <Fragment>{children}</Fragment>
}
