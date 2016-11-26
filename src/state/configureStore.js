/* eslint
   global-require: "off",
   import/no-extraneous-dependencies: "off",
   import/newline-after-import: "off",
   no-underscore-dangle: "off"
*/
import RootStore from './RootStore'

export default () => {
  window.store = RootStore
  return RootStore
}
