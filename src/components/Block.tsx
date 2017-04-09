import * as React from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import * as styles from './Block.scss'
import {connect} from 'react-redux'
import {rotateBlock, moveBlock} from '../actions/ProblemActions'
import {IBlock, IState, IValue} from '../model'
import {BLOCK} from '../constants/ItemTypes'
import {findDOMNode} from 'react-dom'

type BlockProps = IBlock

type ConnectedBlockProps = BlockProps & {
  rotate: () => void
  move: (id:number, index:number) => void
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

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const blockTarget = {
  hover(props:ConnectedBlockProps, monitor, component) {
    const {move} = props;
    const dragIndex = monitor.getItem().index;
    const hoverId = props.id;

    // Don't replace items with themselves
    if (dragIndex === hoverId) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverId && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverId && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    move(dragIndex, hoverId);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverId;
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

const mapDispatchToProps = (dispatch, ownProps:BlockProps) => ({
  rotate: () => dispatch(rotateBlock(ownProps.id)),
  move: (index:number) => dispatch(moveBlock(ownProps.id, index))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default connect(
  () => ({}),
  mapDispatchToProps,
  mergeProps
)(DropTarget<BlockProps>(BLOCK, blockTarget, targetCollect)(
  DragSource<BlockProps>(BLOCK, blockSource, sourceCollect)(Block)))