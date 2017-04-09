import * as React from 'react'
import * as styles from './ComputedTotal.scss'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {getComputedTotal} from '../selectors'

const ComputedTotal = ({computedTotal}) => (
  <div className={styles.container}>
    = {computedTotal}
  </div>
)

const mapStateToProps = createStructuredSelector({
  computedTotal: getComputedTotal
})

export default connect(
  mapStateToProps,
  {}
)(ComputedTotal)