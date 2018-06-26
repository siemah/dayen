import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'

import routes from './routes'
import NavBar from './NavBar'
import NoMatch from './NoMatch'

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          {
            routes.map(({ path, exact, component: Component, ...rest }) => (
              <Route key={path} path={path} exact={exact} render={(props) => (
                <Component {...props} {...rest} />
              )} />
            ))
          }
          <Route render={ props => (<NoMatch {...props} />)} />
        </Switch>
      </div>
    )
  }
}
