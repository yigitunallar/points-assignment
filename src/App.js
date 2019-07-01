import React from 'react'
import './App.css';
import Form from './Form'
import Result from './Result'
import { Route, BrowserRouter as Switch } from 'react-router-dom'

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <div>
          <Route exact path='/' component={Form} />
          <Route exact path='/result/:value' component={Result} />
        </div>
      </Switch>
    )
  }
}

