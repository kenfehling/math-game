import * as React from 'react'
import {Component} from 'react'
import IBlock from '../model/IBlock'
import Block from '../components/Block'
import * as styles from './Problem.scss'
import {connect} from 'react-redux'
import {fetchProblem} from '../actions/ProblemActions'

interface ProblemProps {
  id: number
}

type ConnectedProblemProps = ProblemProps & {
  load: () => void,
  question: string|undefined,
  blocks: IBlock[]
}

class Problem extends Component<ConnectedProblemProps, undefined> {

  componentWillMount() {
    this.props.load()
  }

  render() {
    const {question, blocks} = this.props
    return (
      <div className={styles.container}>
        <div className='question'>
          {question}
        </div>
        <div className='blocks'>
          {blocks.map(block => <Block key={block.id} {...block} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  question: state.question,
  blocks: state.blocks
})

const mapDispatchToProps = (dispatch, ownProps:ProblemProps) => ({
  load: () => dispatch(fetchProblem(ownProps.id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Problem)