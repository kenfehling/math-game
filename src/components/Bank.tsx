import * as React from 'react'
import {DropTarget} from 'react-dnd'
import * as Reorder from 'react-reorder'
import * as styles from './Bank.scss'
import Block from './Block'
import {BLOCK} from '../constants/ItemTypes'
import {connect} from 'react-redux'
import {moveBlock} from '../actions/ProblemActions'
import {IBlock, IState} from '../model'
import {neverUpdate} from '../enhancers'

export interface BankProps {
  blocks: IBlock[]
  title: string
  className: string
}

type ConnectedBankProps = BankProps & {
  connectDropTarget: Function
  moveBlock: (newOrder) => void
}

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const blockTarget = {
  hover(props, monitor, component) {

  }
}

const Item = ({item}) => <Block {...item} />

const Bank = ({blocks, title, className, connectDropTarget}:ConnectedBankProps) =>
  connectDropTarget(
    <div className={[styles.container, className].join(' ')}>
      <div className='title'>{title}</div>
      {blocks.length > 0 ?
        <Reorder
           itemKey='id'
           listClass='blocks'
           list={blocks}
           holdTime='100'
           template={Item}
           callback={moveBlock}
           selectedKey='uuid'
        />  : <div></div>
      }
    </div>
  )

const mapDispatchToProps = (dispatch, ownProps:BankProps) => ({

})

export default DropTarget(BLOCK, blockTarget, targetCollect)(
  connect(
    () => ({}),
    mapDispatchToProps
  )(Bank)
)