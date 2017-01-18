import React from 'react'
import LoadingIndicator from 'components/LoadingIndicator'
import css from './style.css'

const Picker = ({ loading, items, onClick, children }) => {
  return (
    <div className={css.root}>
      {loading
        ? <LoadingIndicator />
        : <div className={css.items}>
            {items.map(x =>
              <img
                onClick={_ => onClick(x)}
                src={x.src}
                key={x.id}
                className={css.img} />)}
            {children}
          </div>}
    </div>
  )
}

export default Picker
