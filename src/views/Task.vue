<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.type" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{ task.descr }}</p>
    <div>
      <button class="btn" @click="pending">Взять в работу</button>
      <button class="btn primary" @click="done">Завершить</button>
      <button class="btn danger" @click="cancelled">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ taskId }}</strong> нет.
  </h3>
</template>

<script>
import { useStore } from 'vuex'
import AppStatus from '../components/AppStatus'

export default {
  props: ['taskId'],
  setup(props) {
    const store = useStore()
    const taskId = Number(props.taskId)

    const task = store.getters.task(taskId)

    const pending = () => { store.dispatch('changeType', { type: 'pending', id: taskId }) }
    const done = () => { store.dispatch('changeType', { type: 'done', id: taskId }) }
    const cancelled = () => { store.dispatch('changeType', { type: 'cancelled', id: taskId }) }
    
    return { taskId, task, pending, done, cancelled }
  },
  components: { AppStatus }
}
</script>

<style scoped>

</style>