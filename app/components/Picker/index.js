import React from 'react'
import LoadingIndicator from 'components/LoadingIndicator'
import BoxHeader from 'components/BoxHeader'
import css from './style.css'

const Picker = ({ loading, items, onClick, children }) => {
  return (
    <div className={css.root}>
      {loading
        ? <LoadingIndicator />
        : <div className={css.picker}>
            <BoxHeader text='All' />
            <div className={css.items}>
              {items.map(x =>
                <div onClick={_ => onClick(x)} key={x.id} className={css.item}>
                  <img src={x.src} className={css.img} />
                </div>)}
              {children}
            </div>
          </div>}
    </div>
  )
}

export default Picker
