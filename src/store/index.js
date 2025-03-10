import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      tasks: []
    }
  },
  getters: {
    isActiveTasks(state) {
      return state.tasks.filter(task => task.type === 'active').length
    },
    task(state) {
      return function(id) {
        return state.tasks.find(task => task.id === id)
      }
    }
  },
  mutations: {
    changeType(state, payload) {
      payload.task.type = payload.type
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    deleteTask(state, payload) {
      const tasks = state.tasks
      const taskIdx = tasks.indexOf(payload.task)
      tasks.splice(taskIdx, 1)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    changeType(context, payload) {
      const task = context.getters.task(payload.id) 
      context.commit('changeType', { ...payload, task: task })
    },
    deleteTask(context, payload) {
      const task = context.getters.task(payload) 
      context.commit('deleteTask', { payload, task: task })
    },
  }
})