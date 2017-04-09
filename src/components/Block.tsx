import * as React from 'react'
import {DragSource} from 'react-dnd'
import * as styles from './Block.scss'
import {connect} from 'react-redux'
import {rotateBlock} from '../actions/ProblemActions'
import {IBlock, IState, IValue} from '../model'
import {BLOCK} from '../constants/ItemTypes'

type ConnectedBlockProps = IBlock & {
  rotate: () => void
  connectDragSource: Function
}

/**
 * Implements the drag source contract.
 */
const blockSource = {
  beginDrag(props:IBlock) {
    return {
      id: props.id
    }
  }
}

/**
 * Specifies the props to inject into your component.
 */
function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const Side = ({amount, unit:{shortName, pluralShortName, abbrev}}:IValue) => (
  <div className={`side ${abbrev}`}>
    <div className='text'>
      {amount} {amount === 1 ? shortName : pluralShortName}
    </div>
  </div>
)

const Block = ({sides, rotated, rotate, connectDragSource}:ConnectedBlockProps) =>
  connectDragSource(
    <div className={styles.container} onClick={rotate}>
      <div className={['inner-container', rotated ? 'rotated' : ''].join(' ')}>
        <Side {...sides[0]} />
        <Side {...sides[1]} />
      </div>
    </div>
  )

const mapDispatchToProps = (dispatch, ownProps:IBlock) => ({
  rotate: () => dispatch(rotateBlock(ownProps.id))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default DragSource(BLOCK, blockSource, sourceCollect)(
  connect(
    () => ({}),
    mapDispatchToProps,
    mergeProps
  )(Block)
)