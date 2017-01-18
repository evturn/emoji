import React from 'react'
import BoxHeader from 'components/BoxHeader'
import css from './style.css'

export const FrequentlyUsed = ({ items }) => {
  return !items.length
    ? null
    : <div className={css.root}>
        <BoxHeader text='Frequently Used' />
        <div className={css.items}>
          {items.map(x =>
            <div key={x.id} className={css.item}>
              <img src={x.src} className={css.img} />
              <div className={css.num}>{x.clicks}</div>
            </div>)}
        </div>
      </div>
}

export default FrequentlyUsed
