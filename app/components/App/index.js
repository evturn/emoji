import React, { Component } from 'react'
import Picker from 'components/Picker'
import Frequently from 'components/Frequently'
import css from './style.css'

class App extends Component {
  state = {
    emojiMap: {},
    emojiList: [],
    used: {},
  }

  componentDidMount() {
    fetch('https://api.github.com/emojis')
      .then(x => x.json())
      .then(this.parseResponse)
  }

  parseResponse = data => {
    this.setState({
      emojiMap: data,
      emojiList: Object.keys(data)
        .reduce((acc, x) => [{id: x, src: data[x]}].concat(acc), [])
    })
  }

  handleSelection = emoji => {
    const { emojiMap, used } = this.state
    const recorded = used[emoji.id]

    this.setState({
      used: {
        ...used,
        [emoji.id]: {
          ...emoji,
          clicks: recorded ? recorded.clicks + 1 : 1
        }
      }
    })
  }

  render() {
    const { emojiList, used } = this.state
    const frequently = Object.keys(used)
      .reduce((acc, x) => [used[x]].concat(acc), [])
      .sort((a, b) => b.clicks - a.clicks)
      .filter((x, i) => i < 14)

    return (
      <div className={css.root}>
        <div className={css.wrap}>
          <Picker
            handleSelection={this.handleSelection}
            items={emojiList} />
          <Frequently
          items={frequently} />
          </div>
      </div>
    )
  }
}

export default App