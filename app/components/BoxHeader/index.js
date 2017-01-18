import React from 'react'
import css from './style.css'

export const BoxHeader = ({ text }) => {
  return (
    <div className={css.root}>{text}</div>
  )
}

export default BoxHeader
