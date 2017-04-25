import * as React from 'react'
import {Component} from 'react'
import UsedBank from '../components/UsedBank'
import UnusedBank from '../components/UnusedBank'
import ComputedTotal from '../components/ComputedTotal'
import * as styles from './Problem.scss'
import {connect} from 'react-redux'
import {fetchProblem} from '../actions/ProblemActions'
import {IState} from '../model'

interface ProblemProps {
  match: {params: {id: number}}
}

type ConnectedProblemProps = ProblemProps & {
  id: number
  fetchProblem: (id:number) => void
  question: string|undefined
}

class Problem extends Component<ConnectedProblemProps, undefined> {

  componentWillMount() {
    this.props.fetchProblem(this.props.id)
  }

  componentDidUpdate(newProps) {
    if (newProps.id !== this.props.id) {
      this.props.fetchProblem(this.props.id)
    }
  }

  render() {
    const {question} = this.props
    return (
      <div className={styles.container}>
        <div className='question'>
          {question}
        </div>
        <UsedBank />
        <ComputedTotal />
        <UnusedBank />
      </div>
    )
  }
}

const mapStateToProps = (state:IState, ownProps) => ({
  question: state.problem.question,
  id: ownProps.match.params.id
})

const mapDispatchToProps = (dispatch, ownProps:ProblemProps) => ({
  fetchProblem: (id:number) => dispatch(fetchProblem(id))
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