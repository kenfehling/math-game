import * as React from 'react'
import {Link} from 'react-router-dom'
import * as bowser from 'bowser'
import {slide as SlideMenu} from 'react-burger-menu'
import * as TreeView from 'react-treeview'
import * as styles from './SideMenu.scss'
import {connect} from 'react-redux'
import {IProblemSet, IState} from '../model'

interface SideMenuProps {
  className: string
}

type ConnectedSideMenuProps = SideMenuProps & {
  problemSet: IProblemSet
}

const label = (name:string) => <span className='node'>{name}</span>

const ProblemSetGroup = ({name, sets}) => (
  <TreeView key={name} nodeLabel={label(name)} defaultCollapsed={false}>
    {sets.map((set, i) =>
      <ProblemSet key={i} set={set} />
    )}
  </TreeView>
)

const ProblemSetLeaf = ({name, problems}) => (
  <TreeView key={name} nodeLabel={label(name)} defaultCollapsed={false}>
    {problems.map(id =>
      <a key={id} className='info'>Problem #{id}</a>
    )}
  </TreeView>
)

const ProblemSet = ({set}) => set.sets ?
  <ProblemSetGroup {...set} /> :
  <ProblemSetLeaf {...set} />

const ConnectedSideMenu = ({className, problemSet}:ConnectedSideMenuProps) => (
  <div className={`${styles.container} ${className}`}>
    <div className='title'>Menu</div>
    <div className='menu'>
      <Link to='/'>
        <i className='fa fa-home' />
        Home
      </Link>
      <Link to='/about'>
        <i className='fa fa-question-circle' />
        About
      </Link>
    </div>
    <div className='title'>Problem sets</div>
    <div className='tree'>
      {problemSet && <ProblemSet set={problemSet} />}
    </div>
  </div>
)

const mapStateToProps = (state:IState) => ({
  problemSet: state.problemSet
})

const SideMenu = connect(
  mapStateToProps
)(ConnectedSideMenu)

const SlidingSideMenu = (props:SideMenuProps) => (
  <SlideMenu>
    <SideMenu {...props} />
  </SlideMenu>
)

export default bowser.mobile ? SlidingSideMenu : SideMenu