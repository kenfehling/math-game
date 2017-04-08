import * as React from 'react'
import * as styles from './App.scss'
import Problem from './Problem'

const App = () => (
  <div className={styles.container}>
    <Problem id={1} />
  </div>
)

export default App