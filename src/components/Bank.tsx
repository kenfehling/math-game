import * as React from 'react'
import {DropTarget} from 'react-dnd'
import * as styles from './Bank.scss'
import Block from './Block'
import {BLOCK} from '../constants/ItemTypes'
import {connect} from 'react-redux'
import {switchBlock} from '../actions/ProblemActions'
import {IBlock, IState} from '../model'

interface BankProps {
  blocks: IBlock[]
  title: string
  used: boolean
  className: string
}

type ConnectedBankProps = BankProps & {
  connectDropTarget: Function
  switchBlock: (id:number, used:boolean) => void
}

function targetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const blockTarget = {
  drop(props:ConnectedBankProps, monitor) {
    const {switchBlock, used} = props;
    switchBlock(monitor.getItem().id, used);
  },
  hover(props:ConnectedBankProps, monitor, component) {

  }
}

const Bank = ({blocks, title, className, connectDropTarget}:ConnectedBankProps) =>
  connectDropTarget(
    <div className={[styles.container, className].join(' ')}>
      <div className='title'>{title}</div>
      <div className='blocks'>
        {blocks.map((b, i) => <Block key={i} {...b} />)}
      </div>
    </div>
  )

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default connect(
  () => ({}),
  {switchBlock},
  mergeProps
)(DropTarget<BankProps>(BLOCK, blockTarget, targetCollect)(Bank))