import * as React from 'react'
import {Link} from 'react-router-dom'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import * as styles from './Home.scss'

const levels = [
  'Beginner',
  'Intermediate',
  'Advanced'
]

const Category = ({name, icon}) => (
  <div className='category'>
    <Card>
      <CardHeader title={name} />
      <List>
        {levels.map((level) => (
          <Link to='/problems/1' key={level}>
            <ListItem primaryText={level}
                      leftIcon={
                        <FontIcon className={icon + ' ' + level.toLowerCase()} />
                      }
            />
          </Link>
        ))}
      </List>
    </Card>
  </div>
)

const Home = () => (
  <div className={styles.container}>
    <p>
      <b>Math Blocks</b> is an educational game based around
      dragging and rotating blocks.
    </p>
    <p>
      Try a problem:
    </p>
    <div className='categories'>
      <Category name='Chemistry' icon='icon-flask' />
      <Category name='Physics' icon='icon-atom' />
      <Category name='Algebra' icon='icon-calculator' />
    </div>
  </div>
)

export default Home