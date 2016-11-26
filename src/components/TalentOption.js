import React from 'react'

const onMouseDown = (props, e) => {
  e.preventDefault()
  e.stopPropagation()
  props.onSelect(props.option, e)
}

const onMouseMove = (props, e) => {
  if (props.isFocused) {
    return
  }
  props.onFocus(props.option, e)
}

const onMouseEnter = (props, e) => {
  props.onFocus(props.option, e)
}

export default props =>
  <div
    className={props.className}
    onMouseDown={onMouseDown.bind(this, props)}
    onMouseEnter={onMouseEnter.bind(this, props)}
    onMouseMove={onMouseMove.bind(this, props)}
    title={props.option.title}
  >
    {props.children}
  </div>
