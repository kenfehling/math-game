import * as React from 'react'
import DragLayer from 'react-dnd/lib/DragLayer'
import * as styles from './DragPreview.scss'

function collect (monitor) {
  const item = monitor.getItem()
  return {
    id: item && item.id,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

function getItemStyles (currentOffset) {
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }

  // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
  const x = currentOffset.x
  const y = currentOffset.y - 36
  const transform = `translate(${x}px, ${y}px)`

  return {
    pointerEvents: 'none',
    transform: transform,
    WebkitTransform: transform
  }
}

function ItemPreview ({
                        isDragging,
                        currentOffset,
                        block,
                        id,
                        children
                      }) {
  if (!isDragging || id !== block.id) {
    return null
  }

  return (
    <div
      className={styles.container}
      style={getItemStyles(currentOffset)}
    >
      {children}
    </div>
  )
}

/*
ItemPreview.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  currentOffset: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  isDragging: React.PropTypes.bool
}
*/

export default DragLayer(collect)(ItemPreview)