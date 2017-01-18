import React from 'react'
import css from './style.css'

export const Frequently = ({ items }) => {
  if (!items.length) {
    return null
  }
  return (
    <div className={css.root}>
      {items.map(x =>
        <div
          key={x.id}
          className={css.item}>
          <img
            src={x.src}
            className={css.img} />
          <div className={css.num}>{x.clicks}</div>
        </div>)}
    </div>
  )
}

export default Frequently
