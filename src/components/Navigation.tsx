import * as React from 'react'
import {Link} from 'react-router-dom';
import SideMenu from '../components/SideMenu'
import * as styles from './Navigation.scss'
declare const require

interface NavigationProps {
  className: string
}

const Navigation = (props:NavigationProps) => (
  <div className={styles.container + ' ' + props.className}>
    <div className='nav'>
      <Link to='/'>
        <img className='icon' src={require('img/logo.svg')} />
      </Link>
      <Link to='/'>
        <h1 className='title'>Math Blocks</h1>
      </Link>
    </div>
    <SideMenu {...props} />
  </div>
)

export default Navigation