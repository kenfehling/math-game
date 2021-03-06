import * as React from 'react'
import {Component} from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import * as styles from './Block.scss'
import {connect} from 'react-redux'
import {rotateBlock, moveBlock} from '../actions/ProblemActions'
import {IndexedBlock, IValue} from '../model'
import {BLOCK} from '../constants/ItemTypes'
import {findDOMNode} from 'react-dom'
import {createStructuredSelector} from 'reselect'
import {getBlock} from '../selectors'
import DragPreview from './DragPreview'
import * as bowser from 'bowser'

const isTouch = bowser.mobile || bowser.tablet
const noop = () => {}

interface BlockProps {
  id: number
}

interface ConnectedBlockProps {
  block: IndexedBlock,
  rotate: () => void
  move: (id:number, toIndex) => void
  connectDragSource: Function
  connectDropTarget: Function
  connectDragPreview: Function
  isDragging: boolean
}

interface BlockState {
  rotate: boolean
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
    connectDragPreview: connect.dragPreview(),
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

const SideWithoutUnit = ({value=1}) => (
  <div className='side no-unit'><div className='text'>{value}</div></div>
)

const Side = ({value, unit}:IValue) => {
  if (unit) {
    const {shortName, pluralShortName, abbrev} = unit
    return (
      <div className={`side ${abbrev.replace(' ', '-')}`}>
        <div className='text'>
          {value} {value === 1 ? shortName : pluralShortName}
        </div>
      </div>
    )
  }
  else {
    return <SideWithoutUnit value={value} />
  }
}

const BaseBlock = ({sides, className}) => (
  <div className={className}>
    <Side {...sides[0]} />
    {sides.length > 1 ? <Side {...sides[1]} /> : <SideWithoutUnit />}
  </div>
)

class Block extends Component<ConnectedBlockProps, BlockState> {
  constructor(props) {
    super(props)
    this.state = {
      rotate: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const oldId:number = this.props.block.id
    const newId:number = nextProps.block.id
    const oldIndex:number = this.props.block.index
    const newIndex:number = nextProps.block.index
    const oldRot:boolean = !!this.props.block.rotated
    const newRot:boolean = !!nextProps.block.rotated
    if (oldId === newId && oldIndex === newIndex && oldRot !== newRot) {
      this.setState({rotate: true})
    }
    else if (this.state.rotate) {
      this.setState({rotate: false})
    }
  }

  getClass():string {
    const {rotate} = this.state
    const {rotated} = this.props.block
    const r1 = rotate ? 'rotate' : ''
    const r2 = rotated ? 'rotated' : 'unrotated'
    return ['inner-container', r1, r2].join(' ')
  }

  render() {
    const {
      block:{sides},
      rotate,
      connectDragSource,
      connectDropTarget,
    } = this.props
    if (isTouch) {
      return connectDragSource(<span>
      <DragPreview {...this.props}>
        <div className={styles.container} onClick={noop}>
          <BaseBlock sides={sides} className={this.getClass()} />
        </div>
      </DragPreview>
        {connectDropTarget(
          <div className={styles.container} onClick={rotate}>
            <BaseBlock sides={sides} className={this.getClass()} />
          </div>
        )}

    </span>)
    }
    else {
      return connectDragSource(connectDropTarget(
        <div className={styles.container} onClick={rotate}>
          <BaseBlock sides={sides} className={this.getClass()} />
        </div>
      ))
    }
  }
}

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