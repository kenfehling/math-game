import * as React from 'react'
import Bank from './Bank'
import {getUnusedBlocks} from '../selectors'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'
import * as styles from './UnusedBank.scss'

const mapStateToProps = createStructuredSelector({
  blocks: getUnusedBlocks
})

const UnusedBank = ({blocks}) => (
  <Bank title='Unused' used={false} className={styles.container} blocks={blocks} />
)

export default connect(
  mapStateToProps,
)(UnusedBank)