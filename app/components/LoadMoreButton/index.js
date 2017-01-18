import React from 'react'
import css from './style.css'

export const LoadMoreButton = ({ done, onClick }) => {
  return !done
    ? <div className={css.root}>
        <button onClick={onClick} className={css.btn}>Load more</button>
      </div>
    : null
}

export default LoadMoreButton
