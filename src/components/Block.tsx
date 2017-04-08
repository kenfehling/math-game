import * as React from 'react'
import * as Draggable from 'react-draggable'
import * as styles from './Block.scss'
import {connect} from 'react-redux'
import {rotateBlock} from '../actions/ProblemActions'
import {IBlock, IValue} from '../model'

type ConnectedBlockProps = IBlock & {
  rotate: () => void
}

const Side = ({amount, unit:{shortName, pluralShortName, abbrev}}:IValue) => (
  <div className={`side ${abbrev}`}>
    <div className='text'>
      {amount} {amount === 1 ? shortName : pluralShortName}
    </div>
  </div>
)

const Block = ({sides, rotated, rotate}:ConnectedBlockProps) => (
  <Draggable bounds='body'>
    <div className={styles.container} onClick={rotate}>
      <div className={['inner-container', rotated ? 'rotated' : ''].join(' ')}>
        <Side {...sides[0]} />
        <Side {...sides[1]} />
      </div>
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