import * as React from 'react'
import {Component} from 'react'
import UsedBank from '../components/UsedBank'
import UnusedBank from '../components/UnusedBank'
import * as styles from './Problem.scss'
import {connect} from 'react-redux'
import {fetchProblem} from '../actions/ProblemActions'
import {IBlock, IState} from '../model'

interface ProblemProps {
  id: number
}

type ConnectedProblemProps = ProblemProps & {
  load: () => void,
  question: string|undefined
}

class Problem extends Component<ConnectedProblemProps, undefined> {

  componentWillMount() {
    this.props.load()
  }

  render() {
    const {question} = this.props
    return (
      <div className={styles.container}>
        <div className='question'>
          {question}
        </div>
        <UsedBank />
        <UnusedBank />
      </div>
    )
  }
}

const mapStateToProps = (state:IState) => ({
  question: state.question
})

const mapDispatchToProps = (dispatch, ownProps:ProblemProps) => ({
  load: () => dispatch(fetchProblem(ownProps.id))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Problem)