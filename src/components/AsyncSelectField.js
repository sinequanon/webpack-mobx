import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import axios from 'axios'
import debounce from 'lodash/debounce'
import 'react-select/dist/react-select.css'

const { bool, func, shape, string } = PropTypes

export default class AsyncSelectField extends Component {
  static propTypes = {
    className: string,
    multi: bool,
    name: string.isRequired,
    onInputKeyDown: func,
    options: shape({
      url: func.isRequired,
      callback: func.isRequired,
      afterHandleChange: func.isRequired,
      beforeHandleChange: func.isRequired,
    }),
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      fieldValue: null,
    }
  }

  handleChange = (val) => {
    const options = this.props.options
    options.beforeHandleChange(val)
    this.setState({
      fieldValue: val,
    })

    if (val) {
      axios.get(`http://www.reddit.com/r/${val.label}.json`)
        .then((json) => {
          options.afterHandleChange(json)
        })
    } else {
      options.afterHandleChange(null)
    }
  }

  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 13: // Enter
        this.handleChange({
          label: event.target.value,
          value: event.target.value,
        })
        break
      default:
    }
  }

  loadOptions = debounce((input, cb) => {
    const self = this
    const options = self.props.options
    if (!input) {
      cb(null)
      return
    }
    self.setState({
      isLoading: true,
    })
    axios.get(options.url(input))
      .then((json) => {
        self.setState({
          isLoading: false,
        },
          options.callback(json, cb)
        )
      })
  },
    300,
    { leading: true, trailing: true, maxWait: 500 },
  )

  render() {
    const props = this.props
    return <Select.Async
      name={props.name}
      className={props.className}
      onChange={this.handleChange}
      multi={props.multi || false}
      value={this.state.fieldValue}
      onInputKeyDown={props.onInputKeyDown || this.handleKeyDown}
      isLoading={this.state.isLoading}
      loadOptions={this.loadOptions}
    />
  }
}
