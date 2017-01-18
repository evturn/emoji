import React, { Component } from 'react'
import Picker from 'components/Picker'
import LoadMoreButton from 'components/LoadMoreButton'
import FrequentlyUsed from 'components/FrequentlyUsed'
import css from './style.css'

class App extends Component {
  state = {
    emojiList: [],
    used: {},
    frequentlyUsed: [],
    loading: true,
    showing: [],
    count: 0,
    done: null,
  }

  componentDidMount() {
    fetch('https://api.github.com/emojis')
      .then(x => x.json())
      .then(this.parseResponse)
  }

  parseResponse = data => {
    this.setState({
      loading: false,
      emojiList: Object.keys(data)
        .reduce((acc, x) => [{id: x, src: data[x]}].concat(acc), [])
    }, this.loadMore)
  }

  loadMore = _ => {
    const { count, showing, emojiList } = this.state
    const nextIncrement = count + 200
    const nextCount = nextIncrement > emojiList.length
                    ? emojiList.length
                    : nextIncrement
    this.setState({
      count: nextCount,
      showing: showing.concat(emojiList.slice(count, nextCount)),
      done: emojiList.length === nextCount,
    })
  }

  handleSelection = emoji => {
    const used = this.updateUsed(emoji)
    const frequentlyUsed = this.updateFrequentlyUsed(used)
    this.setState({ used, frequentlyUsed })
  }

  updateUsed = ({ id, ...rest }) => {
    const { used } = this.state
    const trackedEmoji = used[id]
    const clicks = trackedEmoji ? trackedEmoji.clicks + 1 : 1
    return {...used, [id]: {...rest, id, clicks}}
  }

  updateFrequentlyUsed = used => {
    return Object.keys(used)
      .reduce((acc, x) => [used[x]].concat(acc), [])
      .sort((a, b) => b.clicks - a.clicks)
      .filter((_, i) => i < 12)
  }

  render() {
    const { showing, frequentlyUsed, done, loading } = this.state

    return (
      <div className={css.root}>
        <div className={css.wrap}>
          <div className={css.content}>
            <Picker
              onClick={this.handleSelection}
              loading={loading}
              items={showing}>
              <LoadMoreButton onClick={this.loadMore} done={done} />
            </Picker>
            <FrequentlyUsed items={frequentlyUsed} />
          </div>
        </div>
      </div>
    )
  }
}

export default App