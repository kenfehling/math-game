import * as React from 'react'
import * as HTML5Backend from 'react-dnd-html5-backend'
import * as TouchBackend from 'react-dnd-touch-backend'
import {DragDropContext} from 'react-dnd'
import * as bowser from 'bowser'
import * as styles from './App.scss'
import Problem from './Problem'

const App = () => (
  <div className={styles.container}>
    <Problem id={1} />
  </div>
)

const touch = bowser.mobile || bowser.tablet
export default DragDropContext(touch ? TouchBackend : HTML5Backend)(App)