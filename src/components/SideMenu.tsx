import * as React from 'react'
import {Link} from 'react-router-dom'
import * as bowser from 'bowser'
import {slide as SlideMenu} from 'react-burger-menu'
import * as TreeView from 'react-treeview'
import * as styles from './SideMenu.scss'
import {connect} from 'react-redux'
import {IProblem} from '../model'
import {createStructuredSelector} from 'reselect'
import {getDifficulties, getProblemSet, getSubjects} from '../selectors'
import {getProblems} from '../utils/problems'

interface SideMenuProps {
  className: string
}

type ConnectedSideMenuProps = SideMenuProps & {
  problemSet: IProblem[]
  subjects: string[]
  difficulties: string[]
}

const label = (name:string) => <span className='node'>{name}</span>

const Difficulty = ({name, problems}) => (
  <TreeView key={name} nodeLabel={label(name)} defaultCollapsed={false}>
    {problems.map(({id}) =>
      <Link to={`/problems/${id}`} key={id} className='info'>
        Problem #{id}
      </Link>
    )}
  </TreeView>
)

const Subject = ({name, problems, difficulties}) => (
  <TreeView key={name} nodeLabel={label(name)} defaultCollapsed={false}>
    {difficulties.map((difficulty, i) =>
      <Difficulty key={i}
                  name={difficulty}
                  problems={getProblems(problems, {difficulty})}
      />
    )}
  </TreeView>
)

const ConnectedSideMenu = ({className, problemSet, subjects, difficulties}:
                             ConnectedSideMenuProps) => (
  <div className={`${styles.container} ${className}`}>
    <div className='title'>Menu</div>
    <div className='menu'>
      <Link to='/'>
        <span className='icon icon-home' />
        Home
      </Link>
      <Link to='/about'>
        <span className='icon icon-info' />
        About
      </Link>
    </div>
    <div className='title'>Problem sets</div>

    {subjects.map((subject, i) => (
      <div className='tree' key={i}>
        <Subject name={subject}
                 difficulties={difficulties}
                 problems={getProblems(problemSet, {subject})}
        />
      </div>
    ))}
  </div>
)

const mapStateToProps = createStructuredSelector({
  problemSet: getProblemSet,
  subjects: getSubjects,
  difficulties: getDifficulties
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