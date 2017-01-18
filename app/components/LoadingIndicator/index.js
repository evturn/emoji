import React from 'react'
import css from './style.css'

export const LoadingIndicator = props => {
  const dots = Array.from({length: 11})
  return (
  <div className={css.root}>
    <div className={css.ring}>
      {dots.map((_, i) => <div key={i} className={css[`dot-${i}`]} />)}
    </div>
  </div>
  )
}

export default LoadingIndicator
