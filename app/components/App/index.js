import React, { Component } from 'react'
import Picker from 'components/Picker'
import css from './style.css'

class App extends Component {
  state = {
    emojiMap: {},
    emojiList: [],
    frequently: {},
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

  handleSelection = id => {
    const { emojiMap, frequently } = this.state
    const frequent = frequently[id]

    this.setState({
      frequently: {
        ...frequently,
        [id]: frequent ? frequent + 1 : 1
      }
    })
  }

  render() {
    const { emojiList, frequently } = this.state
    return (
      <div className={css.root}>
        <Picker
          handleSelection={this.handleSelection}
          items={emojiList} />
      </div>
    )
  }
}

export default App