import * as React from 'react'
import {Component, ComponentClass} from 'react'
import {HashRouter as Router} from 'react-router-dom'
import * as HTML5Backend from 'react-dnd-html5-backend'
import * as TouchBackend from 'react-dnd-touch-backend'
import {DragDropContext} from 'react-dnd'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import About from './About'
import Problem from './Problem'
import Home from './Home'
import * as bowser from 'bowser'
import * as styles from './App.scss'
import Navigation from '../components/Navigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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
      <MuiThemeProvider>
        <div className={styles.container}>
          <Router>
            <div>
              <Navigation className={cssClass} />
              <div className={`content ${cssClass}`}>
                  <Route path='/' exact component={Home} />
                  <Route path='/about' component={About} />
                  <Route path='/problems/:id' component={Problem} />
              </div>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(
  () => ({}),
  {fetchProblems}
)(DragDropContext(backend)(App) as ComponentClass<{}>)