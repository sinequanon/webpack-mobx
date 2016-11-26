import { action, observable } from 'mobx'

export const Pitch = observable({
  title: '',
  writer: '',
  logline: '',
})

export const PitchActions = {
  changeValue: action('changeValue', (name, value) => {
    Pitch[name] = value
  }),
}
