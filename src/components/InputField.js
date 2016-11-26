import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'

@observer
class InputField extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'text',
  }

  onChange = (event) => {
    this.props.onChange(event.target.name, event.target.value)
  }

  render() {
    const input = this.props
    return <div className='input-group'>
      { input.label && input.id &&
        <label htmlFor={input.id}>{ input.label }</label> }
      <input
        type={input.type}
        id={input.id}
        name={input.name}
        value={input.value}
        onChange={this.onChange}
      />
    </div>
  }
}

export default InputField
