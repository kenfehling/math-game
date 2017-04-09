import * as React from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import * as styles from './Block.scss'
import {connect} from 'react-redux'
import {rotateBlock, moveBlock} from '../actions/ProblemActions'
import {IndexedBlock, IValue} from '../model'
import {BLOCK} from '../constants/ItemTypes'
import {findDOMNode} from 'react-dom'
import {createStructuredSelector} from 'reselect'
import {getBlock} from '../selectors'

interface BlockProps {
  id: number
}

interface ConnectedBlockProps {
  block: IndexedBlock,
  rotate: () => void
  move: (id:number, toIndex) => void
  connectDragSource: Function
  connectDropTarget: Function
}

/**
 * Implements the drag source contract.
 */
const blockSource = {
  beginDrag(props:ConnectedBlockProps) {
    return props.block
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
    const item:{id:number, index:number} = monitor.getItem()
    const dragId = item.id
    const hoverId = props.block.id
    const dragIndex = item.index;
    const hoverIndex = props.block.index;

    // Don't replace items with themselves
    if (dragId === hoverId) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    // Time to actually perform the action
    move(item.id, hoverIndex);
  }
}

const Side = ({value, unit:{shortName, pluralShortName, abbrev}}:IValue) => (
  <div className={`side ${abbrev}`}>
    <div className='text'>
      {value} {value === 1 ? shortName : pluralShortName}
    </div>
  </div>
)

const Block = ({block:{sides, rotated}, rotate, connectDragSource,
                connectDropTarget}:ConnectedBlockProps) =>
  connectDragSource(connectDropTarget(
    <div className={styles.container} onClick={rotate}>
      <div className={['inner-container', rotated ? 'rotated' : ''].join(' ')}>
        <Side {...sides[0]} />
        <Side {...sides[1]} />
      </div>
    </div>
  ))

const mapStateToProps = createStructuredSelector({
  block: getBlock
})

const mapDispatchToProps = (dispatch, ownProps:BlockProps) => ({
  rotate: () => dispatch(rotateBlock(ownProps.id)),
  move: (id:number, toIndex:number) => dispatch(moveBlock(id, toIndex))
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
)(DropTarget<ConnectedBlockProps>(BLOCK, blockTarget, targetCollect)(
  DragSource<ConnectedBlockProps>(BLOCK, blockSource, sourceCollect)(Block)))