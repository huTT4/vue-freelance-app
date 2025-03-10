<template>
  <h1 class="text-white center" v-if="!isThereTasks">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ isActiveTasks }}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.type" />
      </h2>
      <p>
        <strong>
          <small>
            {{ task.date }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="lookTask(task.id)">Посмотреть</button>
      <button class="btn danger" @click="deleteTask(task.id)">Удалить</button>
    </div>
  </template>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppStatus from '../components/AppStatus'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const tasks = store.state.tasks

    const isThereTasks = computed(() => tasks.length > 0 )
    const isActiveTasks = store.getters.isActiveTasks

    const lookTask = (id) => router.push('/task/' + id)
    const deleteTask = (id) => store.dispatch('deleteTask', id)

    return { tasks, isThereTasks, isActiveTasks, lookTask, deleteTask }
  },
  components: { AppStatus }
}
</script>
