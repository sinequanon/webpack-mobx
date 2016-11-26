import { action, observable } from 'mobx'

class ObservableTodoStore {
  @observable todos = []

  @action addTodo(todo) {
    this.todos.push(todo)
  }
}

export default ObservableTodoStore
