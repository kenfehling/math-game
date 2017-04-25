import * as React from 'react'
import {Link} from 'react-router-dom'
import {Card, CardHeader} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import * as styles from './Home.scss'
import {connect} from 'react-redux'
import {getProblemSet, getSubjects} from '../selectors'
import {createStructuredSelector} from 'reselect'
import {getDifficulties, getRandomProblem} from '../utils/problems'

const icons = {
  Chemistry: 'flask',
  Physics: 'atom',
  Algebra: 'calculator'
}

const Subject = ({name, icon, problemSet, difficulties}) => (
  <div className='subject'>
    <Card>
      <CardHeader title={name} />
      <List>
        {difficulties.map(d => {
          const p = getRandomProblem(problemSet, {subject: name, difficulty: d})
          return (
            <Link to={'/problems/' + p.id} key={d}>
              <ListItem primaryText={d}
                        leftIcon={
                          <FontIcon className={icon + ' ' + d.toLowerCase()} />
                        }
              />
            </Link>
          )
        })}
      </List>
    </Card>
  </div>
)

const Home = ({problemSet, subjects}) => (
  <div className={styles.container}>
    <p>
      <b>Math Blocks</b> is an educational game based around
      dragging and rotating blocks.
    </p>
    <p>
      Try a problem:
    </p>
    <div className='subjects'>
      {subjects.map(subject => (
        <Subject name={subject}
                 key={subject}
                 icon={`icon-${icons[subject]}`}
                 problemSet={problemSet}
                 difficulties={getDifficulties(problemSet, {subject})}
        />
      ))}
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  problemSet: getProblemSet,
  subjects: getSubjects
})

export default connect(
  mapStateToProps
)(Home)