import * as React from 'react'
import {Component} from 'react'
import * as HTML5Backend from 'react-dnd-html5-backend'
import * as TouchBackend from 'react-dnd-touch-backend'
import {DragDropContext} from 'react-dnd'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import * as bowser from 'bowser'
import * as styles from './App.scss'
import Navigation from '../components/Navigation'
import Problem from '../components/Problem'
import {ComponentClass} from 'react'
import {fetchProblems} from '../actions/ProblemActions'

const cssClass = bowser.mobile ? 'mobile' : 'desktop'
const backend = bowser.mobile || bowser.tablet ? TouchBackend : HTML5Backend

interface ConnectedAppProps {
  fetchProblems: () => void
}

class App extends Component<ConnectedAppProps, undefined> {
  constructor(props) {
    super(props)
    props.fetchProblems()
  }

  render() {
    return (
      <div className={styles.container}>
        <Navigation className={cssClass} />
        <div className={`content ${cssClass}`}>
          <Problem id={1} />
        </div>
      </div>
    )
  }
}

export default connect(
  () => ({}),
  {fetchProblems}
)(DragDropContext(backend)(App) as ComponentClass<{}>)