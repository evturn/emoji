import React, { Component } from 'react'
import css from './style.css'

export class Picker extends Component {
  state = {
    count: 0,
    showing: [],
    isLoading: true,
    items: [],
    done: null
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isLoading && nextProps.items.length) {
      this.setState({isLoading: false, items: nextProps.items}, this.loadMore)
    }
  }

  loadMore = _ => {
    const { count, showing, items } = this.state
    const nextIncrement = count + 100
    const nextCount = nextIncrement > items.length
                    ? items.length
                    : nextIncrement
    this.setState({
      count: nextCount,
      showing: showing.concat(items.slice(count, nextCount)),
      done: items.length === nextCount,
    })
  }

  handleSelection = id => {
    this.props.handleSelection(id)
  }

  render() {
    const { showing, isLoading, done } = this.state
    return (
      <div className={css.root}>
        {isLoading
          ? 'Loading...'
          : showing.map(x =>
              <img
                onClick={_ => this.handleSelection(x.id)}
                src={x.src}
                key={x.id}
                className={css.img} />)}

        {!isLoading && !done
          ? <div className={css.more}>
              <button onClick={this.loadMore} className={css.btn}>Load more</button>
            </div>
          : null}
      </div>
    )
  }
}

export default Picker
