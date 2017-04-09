import * as React from 'react'
import Bank from './Bank'
import {getUsedBlocks} from '../selectors'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import * as styles from './UsedBank.scss'

const mapStateToProps = createStructuredSelector({
  blocks: getUsedBlocks
})

const UsedBank = ({blocks}) => (
  <Bank title='Used' used='true' className={styles.container} blocks={blocks} />
)

export default connect(
  mapStateToProps,
)(UsedBank)