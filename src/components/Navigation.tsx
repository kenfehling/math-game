import * as React from 'react'
import SideMenu from '../components/SideMenu'
import * as styles from './Navigation.scss'

interface NavigationProps {
  className: string
}

const Navigation = (props:NavigationProps) => (
  <div className={styles.container}>
    <div className='nav'>
      <h1 className='title'>Math Blocks</h1>
    </div>
    <SideMenu {...props} />
  </div>
)

export default Navigation