import * as React from 'react'
import {ReactNode} from 'react'
import * as styles from './About.scss'

interface LinkProps {
  to: string
  children?: ReactNode
}

const Link = ({to, children}:LinkProps) => (
  <a target='_blank' href={to}>{children}</a>
)

const About = () => (
  <div className={styles.container}>
    <h2>About</h2>
    <p>
      This game is geared towards getting people more interested in math
      and developing their problem solving skills.
    </p>
    <p>
      Creator: <Link to='http://www.kenfehling.com'>Ken Fehling</Link>
    </p>
    <p>
      Source: <Link to='https://github.com/kenfehling/math-game'>GitHub</Link>
    </p>
  </div>
)

export default About