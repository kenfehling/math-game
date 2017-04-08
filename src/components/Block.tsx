import * as React from 'react'
import * as Draggable from 'react-draggable'
import * as styles from './Block.scss'
import IBlock from '../model/IBlock'
import {connect} from 'react-redux'
import {rotateBlock} from '../actions/ProblemActions'
import IValue from '../model/IValue'

type ConnectedBlockProps = IBlock & {
  rotate: () => void
}

const Side = ({amount, unit:{abbreviation, shortName}}:IValue) => (
  <div className={`side ${abbreviation}`}>{amount} {shortName}</div>
)

const Block = ({sides, rotate}:ConnectedBlockProps) => (
  <Draggable bounds='body'>
    <div className={styles.container} onClick={rotate}>
      <Side {...sides[0]} />
      <Side {...sides[1]} />
    </div>
  </Draggable>
)

const mapStateToProps = (state) => ({
  rotation: 0
})

const mapDispatchToProps = (dispatch, ownProps:IBlock) => ({
  rotate: () => dispatch(rotateBlock(ownProps.id))
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
)(Block)