import * as React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import * as styles from './Home.scss'

const Category = ({name}) => (
  <div className='category'>
    <Card>
      <CardHeader
        title={name}
      />
      <CardTitle title='Card title' subtitle='Card subtitle' />
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>
      <CardActions>
        <FlatButton label='Action1' />
        <FlatButton label='Action2' />
      </CardActions>
    </Card>
  </div>
)

const Home = () => (
  <div className={styles.container}>
    <p>
      <b>Math Blocks</b> is an educational game based around dragging and rotating
      blocks.
    </p>
    <p>
      Try a problem:
    </p>
    <div className='categories'>
      <Category name='Chemistry'>

      </Category>
      <Category name='Physics'>

      </Category>
    </div>
  </div>
)

export default Home